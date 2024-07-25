import React, { useEffect, useState } from "react";
import "../assets/css/styles.min.css";
import axios from "axios";

const END_POINT = process.env.REACT_APP_END_POINT;

const Solved = () => {
  const [tickets, setTickets] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await axios.get(`${END_POINT}/get-all-tickets`);
        setTickets(response.data.tickets);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTicket();
  }, [tickets]);

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
