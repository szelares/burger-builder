import React from "react";
import { Route } from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends React.Component {
  state = {
    ingredients: {},
    price: null
  };
  componentDidMount() {
    console.log(this.props.location.search);
    const query = new URLSearchParams(this.props.location.search);

    const ingredients = {};
    let price = null;
    for (let param of query.entries()) {
      if (param[0] === "price") {
        price = param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    this.setState({ ingredients: ingredients, price: price });
  }
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinueHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    return (
      <div>
        <Route
          path="/checkout"
          exact
          render={() => (
            <CheckoutSummary
              checkoutCancelled={this.checkoutCancelledHandler}
              checkoutContinue={this.checkoutContinueHandler}
              ingredients={this.state.ingredients}
            />
          )}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          render={props => (
            <ContactData
              price={this.state.price}
              ingredients={this.state.ingredients}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
