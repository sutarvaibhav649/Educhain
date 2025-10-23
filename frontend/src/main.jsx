import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import "./css/Navbar.css";
import "./css/HomePage.css";
import "./css/Footer.css";
import "./css/SignUp.css";
import "./css/Login.css";
import "./css/ProfilePage.css";
import "./css/skillsForm.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>
);
