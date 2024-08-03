import { assets } from "../../admin_assets/assets";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      <img className="logo" src={assets.logo} alt="" />
      <img className="profile" src={assets.profile_image} alt="" />
    </div>
  );
}

export default Navbar;
