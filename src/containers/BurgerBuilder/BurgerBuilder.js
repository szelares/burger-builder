import React from "react";
import { connect } from "react-redux";
import Aux from "../../setup-hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import withErrorHandler from "../../setup-hoc/withErrorHandler/withErrorHandler";

import axios from "../../axios-orders";

import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";

class BurgerBuider extends React.Component {
  state = {
    purchasing: false
  };
  componentDidMount() {
    console.log("[BurgerBuilder]", this.props);
    this.props.onInitIngredients();
  }
  updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinueHandler = () => {
    this.props.history.push("/checkout");
    this.props.onInitPurchase();
  };

  render() {
    const disabledInfo = {
      ...this.props.ingrs
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;

    let burger = this.props.error ? (
      <p>Ingredients can't be loaded :(</p>
    ) : (
      <Spinner />
    );

    if (this.props.ingrs) {
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingrs}
          price={this.props.tprc}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingrs} />
          <BuildControls
            addItem={this.props.onAddIngredient}
            removeItem={this.props.onRemoveIngredient}
            disabled={disabledInfo}
            purchasable={this.updatePurchaseState(this.props.ingrs)}
            ordered={this.purchaseHandler}
            price={this.props.tprc}
          />
        </Aux>
      );
    }
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingrs: state.burgerBuilder.ingredients,
    tprc: state.burgerBuilder.totalPrice,
    err: state.burgerBuilder.error
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onAddIngredient: ingName => dispatch(actions.addIngredient(ingName)),
    onRemoveIngredient: ingName => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuider, axios));
