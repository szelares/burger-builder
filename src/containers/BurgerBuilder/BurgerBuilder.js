import React from "react";
import Aux from "../../setup-hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";

class BurgerBuider extends React.Component {
  state = {
    ingredients: {
      salad: 1,
      cheese: 2,
      bacon: 1,
      meat: 1
    }
  };
  render() {
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <div>Build Controls</div>
      </Aux>
    );
  }
}

export default BurgerBuider;
