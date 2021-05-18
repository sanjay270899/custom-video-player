import { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css"; // Importing Bootstrap styles
import "react-multi-carousel/lib/styles.css"; // Importing react-multi-carousel styles

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);
