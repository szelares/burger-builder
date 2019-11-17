import React from "react";

import Adapter from "enzyme-adapter-react-16";
import { configure, shallow } from "enzyme";

import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";

configure({ adapter: new Adapter() });

describe("NavigationItems component", () => {
  let wrapper;
  beforeEach(() => (wrapper = shallow(<NavigationItems />)));
  it("should render two Navigation Items if not authenticated", () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });
  it("should render three Navigation Items if authenticated", () => {
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });
  it("should render Login Navigation Item if not authenticated", () => {
    expect(
      wrapper.contains(<NavigationItem link="/auth">Sign up</NavigationItem>)
    ).toEqual(true);
  });
  it("should render Logout and Orders Navigation Items if authenticated", () => {
    wrapper.setProps({ isAuthenticated: true });
    expect(
      wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)
    ).toEqual(true);
    expect(
      wrapper.contains(<NavigationItem link="/orders">Orders</NavigationItem>)
    ).toEqual(true);
  });
});
