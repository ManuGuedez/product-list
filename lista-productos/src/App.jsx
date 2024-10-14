import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage.jsx";
import Aisle from "./Pages/Aisle/Aisle.jsx";
import "./App.css";

function App() {
  const url = "http://localhost:3000/products";
  const [products, setProducts] = useState([]);

  async function fetchDataAW() {
    try {
      const response = await fetch(url, { method: "GET" });
      const data = await response.json(); // extract JSON from response
      return data;
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  }

  async function postProduct(product) {
    try {
      await fetch(url, {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      const newProduct = await response.json();
      return newProduct;
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  }

  async function deleteProductAW(product) {
    try {
      await fetch(url + `/${product.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error deleting product: ", error);
    }
  }

  async function updateProductAW(product) {
    try {
      const response = await fetch(url + `/${product.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      const updatedProduct = response.json();
      return updatedProduct;
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  }

  useEffect(() => {
    let productsPromise = fetchDataAW();

    productsPromise.then((data) => {
      setProducts([...data]);
    });
  }, []);

  const addProduct = async (name, description, category, quantity) => {
    const newProduct = {
      name: name,
      description: description,
      category: category,
      cantidad: quantity,
      comprado: false,
    };
    const newProductWithId = await postProduct(newProduct);
    setProducts([...products, newProductWithId]);
  };

  const deleteProduct = (product) => {
    deleteProductAW(product);
    setProducts([
      ...products.filter((currentSport) => currentSport.id !== product.id),
    ]);
  };

  const updateProduct = async (product) => {
    const updatedProduct = await updateProductAW(product);
    setProducts([...products.map((curretnProduct) => {
      return curretnProduct.id === updatedProduct.id ? updatedProduct : curretnProduct;
    })]);


  }

  return (
    <Routes>
      <Route path="/*" element={<Navigate replace to="/home" />} />
      <Route
        path="/home"
        element={
          <HomePage
            products={products}
            deleteProduct={deleteProduct}
            addNewProduct={addProduct}
            updateProduct={updateProduct}
          />
        }
      />
      <Route
        path="/aisle/:category"
        element={
          <Aisle
            products={products}
            deleteProduct={deleteProduct}
            updateProduct={updateProduct}
          />
        }
      />
    </Routes>
  );
}

export default App;
