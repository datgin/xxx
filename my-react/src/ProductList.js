import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const delPro = (id) => {
    if (window.confirm("Bạn muốn xóa sản phẩm này?")) {
      axios
        .delete(`http://127.0.0.1:8000/api/product/delete/${id}`)
        .then((response) => {
          setProducts(products.filter((product) => product.id !== id));
         alert(response.data.message)
        })
        .catch((error) => {
          console.error("Error deleting product:", error);
        });
    } else {
      alert("Xóa thất bại");
    }
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);
  return (
    <div className="card ">
      <div className="card-header d-flex justify-content-between">
        <h3>Product List</h3>
        <a href="/add" className="btn btn-success">
          Add Product
        </a>
      </div>
      <div className="card-body">
        <table className="table table-hover table-striped text-center">
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>
                  <a
                    href={"edit/" + product.id}
                    className="btn btn-primary btn-sm me-2"
                  >
                    Edit
                  </a>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => delPro(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ProductList;
