import React from "react";
import classes from "./DrawerToggler.module.css";

const drawerToggler = props => (
  <div onClick={props.clicked} className={classes.DrawerToggler}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default drawerToggler;
