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
import * as actionTypes from "../../store/actions";

class BurgerBuider extends React.Component {
  state = {
    purchasing: false,
    loading: false,
    error: false
  };
  componentDidMount() {
    console.log("[BurgerBuilder]", this.props);
    // axios
    //   .get("https://react-burger-app-c3f08.firebaseio.com/ingredients.json")
    //   .then(res => {
    //     this.setState({ ingredients: res.data, error: false });
    //   })
    //   .catch(err => {
    //     this.setState({ error: true });
    //   });
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
  };

  render() {
    const disabledInfo = {
      ...this.props.ingrs
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;

    let burger = this.state.error ? (
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
      if (this.state.loading) {
        orderSummary = <Spinner />;
      }
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
    ingrs: state.ingredients,
    tprc: state.totalPrice
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onAddIngredient: ingName =>
      dispatch({
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingName
      }),
    onRemoveIngredient: ingName =>
      dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuider, axios));
