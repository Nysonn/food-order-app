import AppLogo from '../assets/logo.jpg';
import { FaShoppingCart } from "react-icons/fa";

export default function Header() {
    return(
        <header id="main-header">
        <div id="title">
            <img
            src={AppLogo}
            alt="Food Order Logo"
            />
            <h1>Food Order App</h1> 
        </div>
        <button><FaShoppingCart /></button>
    </header>
  );
}