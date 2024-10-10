import React, { useRef, useState } from "react";
import classes from "./AddProductModal.module.css";

function AddProductModal({ addNewProduct, closeModal }) {
  const name = useRef("");
  const description = useRef("");
  const quantity = useRef("");
  const [category, setCategory] = useState("");

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleButton = () => {
    const newName = name.current.value;
    const newDescription = description.current.value;
    const newQuantity = quantity.current.value;
    const newCategories = category;
    if (
      (newName.trim() == "" && newDescription.trim() == "") ||
      newQuantity == "" ||
      newCategories == ""
    ) {
      window.alert("Falta completar datos!!");
    } else {
      console.log(newName, newDescription, newQuantity, newCategories);
      addNewProduct(newName, newDescription, newCategories, JSON.parse(newQuantity));
      closeModal();
    }
  };

  return (
    <div className={classes.modal}>
      <div className={classes.modalContent}>
        <p className="title is-4">Nuevo producto</p>
        <div className={classes.modalContainer}>
          <div className={classes.field}>
            <label className="label">Nombre</label>
            <div className="control">
              <input
                ref={name}
                className="input"
                type="text"
                placeholder="Text input"
              />
            </div>
          </div>
          <div className={classes.field}>
            <label className="label">Descripción</label>
            <div className="control">
              <input
                ref={description}
                className="input"
                type="text"
                placeholder="Text input"
              />
            </div>
          </div>
          <div className={classes.field}>
            <label className="label">Cantidad</label>
            <div className="control">
              <input
                ref={quantity}
                className="input"
                type="number"
                placeholder="Text input"
              />
            </div>
          </div>
          <div className={classes.field}>
            <label className="label">Categoria</label>
            <div className="select is-fullwidth">
              <select name="category" onChange={handleCategoryChange}>
                <option value="Fruits">Fruits</option>
                <option value="Grains">Grains</option>
                <option value="Dairy">Dairy</option>
              </select>
            </div>
          </div>
        </div>
        <div className={classes.buttonContainer}>
          <button className="button is-danger" id="cancel" onClick={closeModal}>
            Cancelar
          </button>
          <button
            className="button is-primary"
            id="accept"
            onClick={handleButton}
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddProductModal;
