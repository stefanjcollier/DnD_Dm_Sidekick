import React, { Component } from "react";
import Router from "next/router";

export default class _error extends Component {
  // componentDidMount = () => {
  //   Router.push("");
  // };

  render() {
    return <div>
      <h1>Something went wrong</h1>
      <p>Try going back to the main page</p>
    </div>;
  }
}
