import React from "react";
import classes from "./Order.module.css";

const order = props => {
  const ingredients = [];
  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName]
    });
  }
  const ingredientsList = ingredients.map(ingr => {
    return (
      <span
        key={ingr.name}
        style={{
          display: "inline-block",
          margin: "0 8px",
          padding: "6px 8px",
          textTransform: "capitalize",
          border: "1px solid #ccc"
        }}
      >
        {ingr.name} ({ingr.amount})
      </span>
    );
  });
  return (
    <div className={classes.Order}>
      <p>Ingrediens: {ingredientsList}</p>
      <p>
        Price: <strong>USD {Number(props.price).toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default order;
