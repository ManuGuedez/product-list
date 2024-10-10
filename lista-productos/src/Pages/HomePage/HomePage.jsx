import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./HomePage.module.css";
import ProductCard from "../../Components/ProductCard/ProductCard";
import AddProductModal from "../../Components/AddProductModal/AddProductModal";

function HomePage({ products, deleteProduct, addNewProduct, updateProduct }) {
  const [currentCategory, setCurrentCategory] = useState("none");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentCategory != "none") {
      navigate(`/aisle/${currentCategory}`);
    }
  }, [currentCategory]);

  const handleCategoryChange = (event) => {
    setCurrentCategory(event.target.value);
  };

  return (
    <div className={classes.homePageContainer}>
      <header>
        <div>
          <h1 className="title is-1" id={classes.title}>
            Products List
          </h1>
        </div>
        <div className={classes.buttonContainer}>
          <div>
            <div className="select is-fullwidth">
              <select name="category" onChange={handleCategoryChange}>
                <option value="none">None</option>
                <option value="Fruits">Fruits</option>
                <option value="Grains">Grains</option>
                <option value="Dairy">Dairy</option>
              </select>
            </div>
          </div>
          <button
            className="button"
            id={classes.addProductButton}
            onClick={() => {
              setShowModal(true);
            }}
          >
            add product
          </button>
        </div>
      </header>
      <div className={classes.cardsContainer}>
        {products.map((product) => {
          return (
            <ProductCard
              key={product.id}
              product={product}
              deleteProduct={deleteProduct}
              updateProduct={updateProduct}
            />
          );
        })}
      </div>
      {showModal && (
        <AddProductModal
          addNewProduct={addNewProduct}
          closeModal={() => {
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}

export default HomePage;
