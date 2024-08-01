import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import "./css/custom.min.css";
import "./index.css";
import "./css/footer.css";
import reportWebVitals from "./reportWebVitals";

const myElement = document.getElementById("root");

const rootElment = ReactDOM.createRoot(myElement);

rootElment.render(<App />);

reportWebVitals();
