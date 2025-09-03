import React from "react";
import { useRef, useState } from "react";
import "../index.css";

import Dashboard from "./Dashboard";

export default function Form() {
  const quantity = useRef(null);
  const item = useRef(null);

  let items;
  let pass = false;

  if (localStorage.items) {
    items = JSON.parse(localStorage.getItem("items"));
  } else {
    items = [];
  }

  const [allItems, setAllItems] = useState(items);


  function handleSubmit(e) {
    e.preventDefault();

    const getQuantityValue = quantity.current.value;
    const currentItemValue = item.current.value;

    items.forEach((item) => {
      if (item.item === currentItemValue) {
        item.quantity = Number(item.quantity) + Number(getQuantityValue);
       
        localStorage.setItem("items", JSON.stringify(items));

        setAllItems(JSON.parse(localStorage.getItem("items")));
        pass = true;
      }
    });

    if (!pass) {
      const newItem = { quantity: getQuantityValue, item: currentItemValue, isChecked: false };

      items.push(newItem);
      localStorage.setItem("items", JSON.stringify(items));

      setAllItems(JSON.parse(localStorage.getItem("items")));
    }

    quantity.current.value = "";
    item.current.value = "";
  }

  return (
    <React.Fragment>
      <div className="input-form">
        <form onSubmit={handleSubmit} aria-labelledby="form-title">
          <p id="form-title" className="form-title">
            What Do You Need For Your 😊 Trip?
          </p>

          <label htmlFor="quantity">Number</label>
          <input
            ref={quantity}
            type="number"
            id="quantity"
            name="quantity"
            placeholder="1"
          />

          <input
            ref={item}
            type="text"
            id="item"
            name="item"
            placeholder="item..."
          />

          <button type="submit">Add</button>
        </form>
      </div>

      <Dashboard allItems={allItems} setAllItems={setAllItems} />
    </React.Fragment>
  );
}
