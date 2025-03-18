import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.scss";
// import "./config/i18n.js";
import { Provider } from "react-redux";
import store from "./redux/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        {/* <LanguageProvider> */}
        <App />
        {/* </LanguageProvider> */}
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
