import React from "react";
import Aux from "../../../setup-hoc/Auxiliary";

const orderSummary = props => {
  const ingredientSum = Object.keys(props.ingredients).map(igKey => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
        {props.ingredients[igKey]}
      </li>
    );
  });
  return (
    <Aux>
      <h3>Your order</h3>
      <p>A delicious burger withthe following ingredients:</p>
      <ul>{ingredientSum}</ul>
      <p>Continue to checkout?</p>
    </Aux>
  );
};

export default orderSummary;
