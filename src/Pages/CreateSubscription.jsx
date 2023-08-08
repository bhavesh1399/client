// src/Login.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../redux/User/action";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "reactstrap";
import { addSubscription } from "../redux/Post/action";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateSubscription = ({ isOpen, toggleModal }) => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(
    new Date().setDate(new Date().getDate() + 1)
  );

  const [title, setTitle] = useState("");
  const [token, setToken] = useState("");
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);
  const navigateToPost = () => {
    navigate("/subscriptionList");
  };

  const handleRegister = () => {
    dispatch(addSubscription(title, startDate, endDate, token, navigateToPost));
    setEndDate("");
    setStartDate("");
    setTitle("");
  };
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  return (
    <Modal isOpen={isOpen} toggle={toggleModal}>
      <div
        className="container mt-5"
        style={{
          width: "350px",
        }}
      >
        <h2 className="mb-5"> Create New Post </h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-3">
          <input
            placeholder="Enter Subscription Name"
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Start Date:</label>
          <DatePicker
            className="form-control"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholder="Select Start Date"
          />
        </div>
        <div className="mb-3">
          <label>End Date:</label>

          <DatePicker
            className="form-control"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            placeholder="Select End Date"
          />
        </div>

        <div className="mb-3">
          <button className="btn btn-primary mt-3 " onClick={handleRegister}>
            Add Subscription
          </button>
        </div>
        <div className="mb-3">
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CreateSubscription;
