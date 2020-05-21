import Layout from "../components/Layout";
import fetch from "isomorphic-unfetch";
import { useState } from "react";
import Router from "next/router";

const Borrowers = () => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const API_URL = "http://localhost:1337";

    const data = {
      name,
      contact_number: contact,
      address,
    };

    fetch(`${API_URL}/borrowers`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    Router.push("/borrowers");
  };
  return (
    <Layout>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label for="borrowerName">Full Name</label>
            <input
              id="borrowerName"
              class="form-control"
              type="text"
              placeholder="Borrower Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            ></input>
          </div>
          <div className="form-group">
            <label for="contactNumber">Contact Number</label>
            <input
              id="contactNumber"
              class="form-control"
              type="text"
              placeholder="Contact Number"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            ></input>
          </div>

          <div className="form-group">
            <label for="address">Address</label>
            <input
              id="address"
              className="form-control"
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            ></input>
          </div>

          <input
            type="submit"
            className="btn btn-primary"
          ></input>
        </form>
      </div>
    </Layout>
  );
};

export default Borrowers;
