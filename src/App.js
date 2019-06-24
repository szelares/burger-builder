import React from "react";
import Layout from "./components/Layout/Layout";
import BurgerBuider from "./containers/BurgerBuilder/BurgerBuilder";

class App extends React.Component {
  render() {
    return (
      <div>
        <Layout>
          <BurgerBuider />
        </Layout>
      </div>
    );
  }
}

export default App;
