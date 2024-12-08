import "./styles.css";
// import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <nav>
        <input type="checkbox" id="check" />
        <label for="check" className={`checkbtn`}>
          <i className="fa-solid fa-bars"></i>
        </label>
        <div className="arr">
          <div className="logo-container">
            <img className="altLogo" src={""} alt="" />
            <h3 className="logo">
              Coin<span>In</span>
            </h3>
          </div>

          <ul className="links">
            <li>{/* <NavLink to="/">Home</NavLink> */}</li>
            <li>{/* <NavLink to="/market">Market</NavLink> */}</li>
            <li>{/* <NavLink to="/portfolio">Portfolio</NavLink> */}</li>
            {/* <li>
            <NavLink to="/trade">Trade</NavLink>
          </li> */}
          </ul>

          <ul className="page-features">
            {/* <i className="fa-solid fa-user"></i> */}

            {token ? (
              <li
                onClick={toggleDropdown}
                className={` nav-user dropdown ${isOpen ? "open" : ""}`}
              >
                <i className="fa-solid fa-circle-user"></i>
                <ul className="dropdown-menu">
                  {/* <li>
                  <p>Sub-Item</p>
                </li>
                <li>
                  <p>Sub-Item</p>
                </li> */}
                  <li>
                    <p onClick={handleLogout}>Logout</p>
                  </li>
                </ul>
              </li>
            ) : (
              <>
                <li className="login">
                  <NavLink to="/login">Log in</NavLink>
                </li>
                <li className="signup">
                  <NavLink to="/signup">Sign Up</NavLink>
                </li>
              </>
            )}

            {/* <li>
          <i class="fa-brands fa-twitter"></i>
        </li> */}
          </ul>
        </div>
      </nav>
    </>
  );
}
