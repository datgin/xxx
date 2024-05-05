import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const ProductEdit = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/product/show/" + id)
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        "http://127.0.0.1:8000/api/product/update/" + id,
        formData
      );
      window.alert(response.data.message);
      navigate("/");
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        console.error("Error adding product:", error);
      }
    }
  };
  return (
    <div className="card">
      <div className="card-header">
        <h3>Product Update</h3>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Product Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && (
              <small className="text-danger">{errors.name}</small>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Price
            </label>
            <input
              type="text"
              className="form-control"
              id="price"
              placeholder="Product Price"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
            {errors.price && (
              <small className="text-danger">{errors.price}</small>
            )}
          </div>
          <button type="submit" className="btn btn-primary me-2">
            Submit
          </button>
          <a href="/" className="btn btn-danger">
            Cancel
          </a>
        </form>
      </div>
    </div>
  );
};

export default ProductEdit;
