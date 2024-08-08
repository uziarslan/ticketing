import React, { useEffect, useState, useRef, useContext } from "react";
import "../assets/css/styles.min.css";
import axiosInstance from "../services/axiosInstance";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import Loader from "./Loader";

const History = ({ user }) => {
  const [tickets, setTickets] = useState([]);
  const [comment, setComment] = useState("");
  const [isViewComment, setIsViewComment] = useState(null);
  const { isLoading } = useContext(AuthContext);
  const commentsEndRef = useRef(null);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        // setIsLoading(true);
        const response = await axiosInstance.get("/get-user-tickets");
        setTickets(response.data);
        // setIsLoading(false);
      } catch (error) {
        console.error(error);
        // setIsLoading(false);
      }
    };
    fetchTicket();
  }, [tickets]);

  useEffect(() => {
    if (isViewComment !== null && commentsEndRef.current) {
      commentsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isViewComment]);

  const keysToSkip = ["requesterName", "requestType"];

  const handleAddComment = async (id) => {
    setComment("");
    if (comment.trim() === "") {
      return;
    }
    try {
      const response = await axiosInstance.post(`/add-comment/${id}`, {
        comment,
        senderId: user._id,
      });
      if (response.status === 200) {
        setTickets((prevTickets) =>
          prevTickets.map((ticket) =>
            ticket._id === id ? response.data : ticket
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!tickets.length || !user) return null;

  return (
    <div className="history">
      <div className="container-group">
        {tickets.map((ticket, index) => (
          <div key={ticket._id} className="ticket-container">
            <div className="ticket-header">
              <div className="ticket-header-left">
                <div className="bullet ticket"></div>
                <h2>Ticket #{ticket._id}</h2>
              </div>
              <div className="ticket-header-right">
                <div className={`bullet ${ticket.status}`}></div>
                <span className={`status ${ticket.status}`}>
                  {ticket.status === "opened" ? "Open" : ticket.status === "processing" ? "In Progress" : ticket.status === "closed" ? "closed" : ""}
                </span>
              </div>
            </div>
            <div className="ticket-content">
              <h3>{ticket.content.requestType}</h3>
              <ul>
                {Object.entries(ticket.content)
                  .filter(([key]) => !keysToSkip.includes(key))
                  .map(
                    ([key, value], index) =>
                      value !== "" && (
                        <li key={index}>
                          <strong className="keyText">{key} </strong>
                          <br />
                          {value !== true ? value.toString() : ""}
                        </li>
                      )
                  )}
              </ul>
              <p>
                <Link onClick={() => setIsViewComment(index)}>
                  View Comment
                </Link>
              </p>
              {isViewComment === index && (
                <div className="comment-section">
                  <h3>Comments</h3>
                  <ul className="comment-list">
                    {ticket.comments.map((commentObj, index) => (
                      <li
                        key={index}
                        className={
                          commentObj.sender === user._id ? "sent" : "received"
                        }
                      >
                        {commentObj.comment}
                      </li>
                    ))}
                    <div ref={commentsEndRef} />
                  </ul>
                  <div className="inputAndButtonWrapper">
                    <input
                      className="commentInput"
                      type="text"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Add a comment"
                    />
                    <button onClick={() => handleAddComment(ticket._id)}>
                      Send
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
