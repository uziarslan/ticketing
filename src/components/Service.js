import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Banner from "./Banner";
import axiosInstance from "../services/axiosInstance";
import "bootstrap/dist/css/bootstrap.min.css";
import "datatables.net";
import "datatables.net-bs5";

import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import "datatables.net-buttons-bs5/css/buttons.bootstrap5.min.css";
import "font-awesome/css/font-awesome.min.css";
// import 'datatables.net/js/jquery.dataTables.min.js';
import "datatables.net-bs5/js/dataTables.bootstrap5.min.js";
import "datatables.net-buttons/js/dataTables.buttons.min.js";
import "datatables.net-buttons/js/buttons.html5.min.js";
import "datatables.net-buttons/js/buttons.colVis.min.js";
import { Link, useNavigate } from "react-router-dom";

const Service = () => {
  const [currentTable, setCurrentTable] = useState("");
  const [coatDb, setCoatDb] = useState([]);
  const [borrowDb, setBorrowDb] = useState([]);
  const [netId, setNetId] = useState("");
  const [coatNumber, setCoatNumber] = useState("");
  const rentUser = localStorage.getItem("rentUser");
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const numberOfResults = 25;

  const indexOfLastItem = currentPage * numberOfResults;
  const indexOfFirstItem = indexOfLastItem - numberOfResults;
  const currentCoatDb = coatDb.slice(indexOfFirstItem, indexOfLastItem);
  const currentBorrowDb = borrowDb.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    if (!rentUser) return navigate("/login-coat");
  }, [navigate, rentUser]);

  const fetch_coat = async () => {
    try {
      const { status, data } = await axiosInstance.get("/fetch/coat/data");
      if (status === 200) {
        setCoatDb(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetch_borrow = async () => {
    try {
      const { status, data } = await axiosInstance.get("/fetch/borrow/data");
      if (status === 200) {
        setBorrowDb(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetch_coat();
    fetch_borrow();
  }, []);

  const handleNextPage = (database) => {
    if (database === "coat") {
      if (currentPage < Math.ceil(coatDb.length / numberOfResults)) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    } else {
      if (currentPage < Math.ceil(borrowDb.length / numberOfResults)) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!netId || !coatNumber) {
      return;
    }

    const formData = {
      email: netId,
      coatNumber,
    };

    try {
      const { status } = axiosInstance.post("/submit/rent-a-coat", formData);
      if (status === 200) {
        fetch_borrow();
        fetch_coat();
      }
    } catch (error) {
      console.error(error);
    }

    setNetId("");
    setCoatNumber("");
  };

  const handleTableSwitch = (tableName) => {
    if (tableName === "coat") {
      setCurrentTable("coat");
    } else {
      setCurrentTable("borrow");
    }
    setCurrentPage(1);
  };

  return (
    <>
      <Navbar />
      <section className="contact_section layout_padding">
        <div className="container">
          <div className="heading_container">
            <h2>Rent a coat</h2>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <form
                onSubmit={handleSubmit}
                style={{ marginTop: "45px", paddingRight: "35px" }}
              >
                <div>
                  <input
                    required
                    value={netId}
                    onChange={(e) => setNetId(e.target.value)}
                    type="email"
                    id="emailInput"
                    placeholder="NetID"
                  />
                </div>
                <div>
                  <input
                    required
                    value={coatNumber}
                    onChange={(e) => setCoatNumber(e.target.value)}
                    type="number"
                    id="coatNumberInput"
                    placeholder="Coat Number"
                  />
                </div>
                <div className="d-flex">
                  <button type="submit">SUBMIT</button>
                </div>
              </form>
            </div>
            <div className="col-md-6">
              <div className="map_container">
                <button
                  style={{
                    backgroundColor: "lavender",
                    color: "black",
                  }}
                  onClick={() => handleTableSwitch("coat")}
                >
                  View Coat DB
                </button>
                <br />
                <button
                  style={{
                    backgroundColor: "lavender",
                    color: "black",
                  }}
                  onClick={() => handleTableSwitch("borrow")}
                >
                  Borrower's List
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {currentTable === "coat" && (
        <div style={{ padding: "5%" }} id="coatTable">
          <h3>Coat Database</h3>
          <table
            id="example"
            className="table table-striped"
            style={{ width: "100%" }}
          >
            <thead>
              <tr>
                <th>Coat Number</th>
                <th>Size</th>
                <th>Total Users</th>
              </tr>
            </thead>
            <tbody>
              {currentCoatDb.map((data, index) => (
                <tr key={index}>
                  <td>{data.coat_no}</td>
                  <td>{data.size}</td>
                  <td>{data.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div
            className="dataTables_info"
            id="example_info"
            role="status"
            aria-live="polite"
          >
            Showing {indexOfFirstItem} to {indexOfLastItem} of {coatDb.length}{" "}
            entries
          </div>
          <div
            className="dataTables_paginate paging_simple_numbers"
            id="example_paginate"
          >
            <ul className="pagination">
              <li
                className="paginate_button page-item previous"
                id="example_previous"
              >
                <Link
                  aria-controls="example"
                  role="link"
                  data-dt-idx="previous"
                  tabIndex="0"
                  className="page-link"
                  onClick={handlePreviousPage}
                >
                  Previous
                </Link>
              </li>
              <li className="paginate_button page-item next" id="example_next">
                <Link
                  aria-controls="example"
                  role="link"
                  data-dt-idx="next"
                  tabIndex="0"
                  className="page-link"
                  onClick={() => handleNextPage("coat")}
                >
                  Next
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}

      {currentTable === "borrow" && (
        <div style={{ padding: "5%" }} id="borrowTable">
          <h3>Borrower's list</h3>
          <table
            id="dataTable"
            className="table table-striped"
            style={{ width: "100%" }}
          >
            <thead>
              <tr>
                <th>Email</th>
                <th>Coat Number</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {currentBorrowDb.map((data, index) => (
                <tr key={index}>
                  <td>{data.email}</td>
                  <td>{data.coat_no}</td>
                  <td>{data.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div
            className="dataTables_info"
            id="example_info"
            role="status"
            aria-live="polite"
          >
            Showing {indexOfFirstItem} to {indexOfLastItem} of {borrowDb.length}{" "}
            entries
          </div>
          <div
            className="dataTables_paginate paging_simple_numbers"
            id="example_paginate"
          >
            <ul className="pagination">
              <li
                className="paginate_button page-item previous"
                id="example_previous"
              >
                <Link
                  aria-controls="example"
                  role="link"
                  data-dt-idx="previous"
                  tabIndex="0"
                  className="page-link"
                  onClick={handlePreviousPage}
                >
                  Previous
                </Link>
              </li>
              <li className="paginate_button page-item next" id="example_next">
                <Link
                  aria-controls="example"
                  role="link"
                  data-dt-idx="next"
                  tabIndex="0"
                  className="page-link"
                  onClick={() => handleNextPage("borrow")}
                >
                  Next
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
      <Banner />
      <Footer />
    </>
  );
};

export default Service;
