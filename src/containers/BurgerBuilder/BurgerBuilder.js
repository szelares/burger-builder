import React from "react";
import Aux from "../../setup-hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import withErrorHandler from "../../setup-hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";

const INGREDIENT_PRICES = {
  salad: 1,
  cheese: 1.5,
  bacon: 1.8,
  meat: 2.2
};

class BurgerBuider extends React.Component {
  state = {
    ingredients: null,
    purchasable: false,
    purchasing: false,
    totalPrice: 4,
    loading: false,
    error: false
  };
  componentDidMount() {
    axios
      .get("https://react-burger-app-c3f08.firebaseio.com/ingredients.json")
      .then(res => {
        this.setState({ ingredients: res.data, error: false });
      })
      .catch(err => {
        this.setState({ error: true });
      });
  }
  updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  };
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinueHandler = () => {
    this.setState({
      loading: true
    });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.price,
      customer: {
        name: "Piotr Szeląg",
        address: {
          street: "TestStreet 1",
          zipCode: "12345",
          city: "Warsaw"
        },
        email: "test@test.com"
      },
      deliveryMethod: "ASAP"
    };
    axios
      .post("/orders.json", order)
      .then(res => {
        this.setState({
          loading: false,
          purchasing: false
        });
      })
      .catch(err => {
        this.setState({
          loading: false,
          purchasing: false
        });
      });
  };

  addItemHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedItems = { ...this.state.ingredients };
    updatedItems[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedItems
    });
    this.updatePurchaseState(updatedItems);
  };
  removeItemHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedItems = { ...this.state.ingredients };
    updatedItems[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedItems
    });
    this.updatePurchaseState(updatedItems);
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
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

    if (this.state.ingredients) {
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          price={this.state.totalPrice}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            addItem={this.addItemHandler}
            removeItem={this.removeItemHandler}
            disabled={disabledInfo}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
            price={this.state.totalPrice}
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

export default withErrorHandler(BurgerBuider, axios);
