// @flow

import * as React from "react";
import MainHeader from "./main-header";

const Layout = (props) => {
  return (
    <>
      <MainHeader />
      <main>{props.children}</main>
    </>
  );
};

export default Layout;
