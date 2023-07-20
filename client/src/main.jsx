import React from "react";
import ReactDOM from "react-dom/client";
import AppWrapper from "./AppWrapper";
import "./index.css";

import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    {/* <HashRouter> */}
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
    {/* </HashRouter> */}
  </React.StrictMode>
);
