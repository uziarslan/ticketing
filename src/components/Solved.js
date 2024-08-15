import React, { useEffect, useState, useContext } from "react";
import "../assets/css/styles.min.css";
import axiosInstanceAdmin from "../services/axiosInstanceAdmin";
import { AuthContext } from "../Context/AuthContext";
import Loader from "./Loader";

const Solved = () => {
  const [tickets, setTickets] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const { isLoading } = useContext(AuthContext);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        // setIsLoading(true);
        const response = await axiosInstanceAdmin.get("/get-all-tickets");
        setTickets(response.data.tickets);
        // setIsLoading(false);
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

  const handleChangeStatus = async (ticketId, status) => {
    try {
      const response = await axiosInstanceAdmin.post(`/change/${ticketId}`, {
        status,
      });
      if (response.status === 200) {
        closeModal();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const keysToSkip = ["requesterName", "requestType"];

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
                <td>{ticket._id}</td>
                <td>{ticket.content.requestType || ticket.content.subject}</td>
                <td>
                  <button onClick={() => handleModalClick(ticket)}>Show</button>
                </td>
                <td>{ticket.startDate.split("T")[0]}</td>
                <td>{ticket.content.requesterName}</td>
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
        <div className="modal2" onClick={closeModal}>
          <div className="modal-content2" onClick={(e) => e.stopPropagation()}>
            <div className="modalHeader">
              <h2 className="modalHeaderText">Ticket Details</h2>
              <span className="close" onClick={closeModal}>
                &times;
              </span>
            </div>
            <h2>{modalContent.content.requestType}</h2>
            <ul>
              {Object.entries(modalContent.content)
                .filter(([key]) => !keysToSkip.includes(key))
                .map(
                  ([key, value], index) =>
                    value !== "" && (
                      <li key={index}>
                        <strong>{key} </strong>
                        <br />
                        {value !== true ? value.toString() : ""}
                      </li>
                    )
                )}
            </ul>
            <div className="buttonWrapper">
              <button
                onClick={() =>
                  handleChangeStatus(
                    modalContent._id,
                    modalContent.status === "processing"
                      ? "closed"
                      : "processing"
                  )
                }
                className="modalButton process"
              >
                Process Ticket
              </button>
              <button
                onClick={() => handleChangeStatus(modalContent._id, "opened")}
                className="modalButton opened"
              >
                Open Ticket
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Solved;
