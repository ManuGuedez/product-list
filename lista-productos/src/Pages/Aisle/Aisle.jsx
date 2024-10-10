import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import classes from "./Aisle.module.css";
import ProductCard from "../../Components/ProductCard/ProductCard";

function Aisle({ products, deleteProduct, updateProduct }) {
  let { category } = useParams();
  const navigate = useNavigate();
  const selectedProducts = products.filter(
    (currentProductt) => currentProductt.category === category
  );

  return (
    <div className={classes.aislePage}>
      <div className={classes.aisleContent}>
        <header>
          <h1 className="title is-1" id={classes.title}>
            {category}
          </h1>
          <div className={classes.buttonContainer}>
            <button onClick={() => navigate("/home")}>
              {"<"} go home
            </button>
          </div>
        </header>
        <div className={classes.cardsContainer}>
          {selectedProducts.map((product) => {
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
      </div>
    </div>
  );
}

export default Aisle;
