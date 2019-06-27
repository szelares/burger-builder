import React from "react";
import Aux from "../../setup-hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";

class BurgerBuider extends React.Component {
  state = {
    ingredients: {
      salad: 0,
      cheese: 1,
      bacon: 0,
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
