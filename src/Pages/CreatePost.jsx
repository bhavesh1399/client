// src/Login.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "reactstrap";
import { addpost } from "../redux/Post/action";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const CreatePost = ({ isOpen, toggleModal }) => {
  const navigate = useNavigate();
  const [description, setdescription] = useState();
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [token, setToken] = useState("");
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);
  const navigateToPost = () => {
    navigate("/postList");
  };

  const handleRegister = () => {
    dispatch(addpost(title, description, image, token, navigateToPost));
    setImage("");
    setdescription("");
    setTitle("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    dispatch(addpost(formData, navigateToPost));
  };

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  return (
    <Modal isOpen={isOpen} toggle={toggleModal}>
      <form onSubmit={handleSubmit}>
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
              placeholder="Enter post Name"
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              placeholder="Enter description"
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={description}
              onChange={(e) => setdescription(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              required
              className="image"
              type="file"
              name="image"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <div className="mb-3">
            <button className="btn btn-primary mt-3 " type="submit">
              Add post
            </button>
          </div>
          <div className="mb-3">
            <Button color="secondary" onClick={toggleModal}>
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default CreatePost;
