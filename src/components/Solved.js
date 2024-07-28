import React, { useEffect, useState, useContext } from "react";
import "../assets/css/styles.min.css";
import axiosInstanceAdmin from "../services/axiosInstanceAdmin";
import { AuthContext } from "../Context/AuthContext";
import Loader from "./Loader";

const Solved = () => {
  const [tickets, setTickets] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const { isLoading, setIsLoading } = useContext(AuthContext);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstanceAdmin.get("/get-all-tickets");
        setTickets(response.data.tickets);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTicket();
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleModalClick = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const keysToSkip = [
    "Please indicate your name (or the requester’s name, if different than your name).",
    "requestType",
  ];

  if (isLoading) {
    return <Loader />;
  }

  if (!tickets.length) return null;

  return (
    <>
      <div className="ticket-detail">
        <table>
          <thead>
            <tr>
              <th>Ticket #</th>
              <th>Category</th>
              <th>Ticket Description</th>
              <th>Creation Date</th>
              <th>Raised By</th>
              <th>Closing Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, index) => (
              <tr key={index}>
                <td>{ticket._id.slice(-5)}</td>
                <td>{ticket.content.requestType}</td>
                <td>
                  <button onClick={() => handleModalClick(ticket.content)}>
                    Show
                  </button>
                </td>
                <td>{ticket.startDate.split("T")[0]}</td>
                <td>
                  {
                    ticket.content[
                      "Please indicate your name (or the requester’s name, if different than your name)."
                    ]
                  }
                </td>
                <td>{ticket.closeDate.split("T")[0]}</td>
                <td className={`status ${ticket.status}`}>
                  {ticket.status.toUpperCase()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>{modalContent.requestType}</h2>
            <ul>
              {Object.entries(modalContent)
                .filter(([key]) => !keysToSkip.includes(key))
                .map(([key, value], index) => (
                  <li key={index}>
                    <strong>{key} </strong>{" "}
                    {value !== true ? value.toString() : ""}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Solved;
