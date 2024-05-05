import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductList from "./ProductList";
import ProductAdd from "./ProductAdd";
import ProductEdit from "./ProductEdit";


function App() {
  return (
    <div className="container">
      <Routes>
        <Route exact path="/" element={<ProductList />} />
        <Route path="/add" element={<ProductAdd />} />
        <Route path="/edit/:id" element={<ProductEdit />} />
      </Routes>
    </div>
  );
}

export default App;
