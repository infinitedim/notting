import { BrowserRouter as Router } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
// import { Provider } from "react-redux";
// import { ApiProvider } from "@reduxjs/toolkit/query/react";
import App from "./App";
// import { store } from "./app/store";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./assets/styles/root.css";
import ScrollToTop from "./utils/scrollToTop";
// import { notesApi } from "./features/api/apiSlice";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
    {/* <ApiProvider api={notesApi}> */}
    <Router>
      <App />
      <ScrollToTop />
    </Router>
    {/* </ApiProvider> */}
    {/* </Provider> */}
  </React.StrictMode>,
);
