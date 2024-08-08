import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Banner from "./Banner";
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net';
import 'datatables.net-bs5';

import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import 'datatables.net-buttons-bs5/css/buttons.bootstrap5.min.css';
import 'font-awesome/css/font-awesome.min.css';
// import 'datatables.net/js/jquery.dataTables.min.js';
import 'datatables.net-bs5/js/dataTables.bootstrap5.min.js';
import 'datatables.net-buttons/js/dataTables.buttons.min.js';
import 'datatables.net-buttons/js/buttons.html5.min.js';
import 'datatables.net-buttons/js/buttons.colVis.min.js';

const Service = () => {
    const [showCoatTable, setShowCoatTable] = useState(false);
    const [showBorrowTable, setShowBorrowTable] = useState(false);

    const [netId, setNetId] = useState("");
    const [coatNumber, setCoatNumber] = useState("");

    const handleLoadCoatDB = () => {
        if (!$.fn.DataTable.isDataTable('#coatTable')) {
            $('#coatTable').DataTable({
                ajax: 'https://www.nikhilpujari.in/Xspace/wassermanphp/fetch_coat.php',
                columns: [
                    { data: 'coat_no' },
                    { data: 'size' },
                    { data: 'total' },
                ],
                dom: 'Bfrtip',
                buttons: [
                    {
                        extend: 'csvHtml5',
                        text: 'Export CSV',
                        className: 'btn btn-info',
                    },
                ],
            });
        }
        setShowCoatTable(true);
        setShowBorrowTable(false);
    };

    const handleLoadBorrowers = () => {
        if (!$.fn.DataTable.isDataTable('#borrowTable')) {
            $('#borrowTable').DataTable({
                ajax: 'https://www.nikhilpujari.in/Xspace/wassermanphp/php/borrower-list.php',
                type: 'GET',
                columns: [
                    { data: 'email' },
                    { data: 'coat_no' },
                    { data: 'date' },
                ],
                dom: 'Bfrtip',
                buttons: [
                    {
                        extend: 'csvHtml5',
                        text: 'Export CSV',
                        className: 'btn btn-info',
                    },
                ],
            });
        }
        setShowBorrowTable(true);
        setShowCoatTable(false);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!netId || !coatNumber) {
            return
        }

        const formData = {
            netId,
            coatNumber
        }

        console.log(formData);

        setNetId("");
        setCoatNumber("");
    }

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
                            <form onClick={handleSubmit} style={{ marginTop: "45px", paddingRight: "35px" }}>
                                <div>
                                    <input required value={netId} onChange={(e) => setNetId(e.target.value)} type="email" id="emailInput" placeholder="NetID" />
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
                                    onClick={handleLoadCoatDB}
                                >
                                    View Coat DB
                                </button>
                                <br />
                                <button
                                    style={{
                                        backgroundColor: "lavender",
                                        color: "black",
                                    }}
                                    onClick={handleLoadBorrowers}
                                >
                                    Borrower's List
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {showCoatTable && (
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
                        <tbody></tbody>
                    </table>
                </div>
            )}

            {showBorrowTable && (
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
                        <tbody></tbody>
                    </table>
                </div>
            )}
            <Banner />
            <Footer />
        </>
    );
};

export default Service;
