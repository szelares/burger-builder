import React from "react";
import Aux from "../../setup-hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";

class BurgerBuider extends React.Component {
  render() {
    return (
      <Aux>
        <Burger />
        <div>Build Controls</div>
      </Aux>
    );
  }
}

export default BurgerBuider;
