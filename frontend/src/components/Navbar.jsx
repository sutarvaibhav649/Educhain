import { useState, useEffect, useRef } from "react";

const decodeJWT = (token) => {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch (e) {
    return null;
  }
};

const Navbar = () => {
  const [userEmail, setUserEmail] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = decodeJWT(token);
      if (decoded && decoded.sub) {
        setUserEmail(decoded.sub);
      }
    }

    // Close dropdown if clicked outside
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // redirect to login
  };

  const getInitial = () => {
    return userEmail ? userEmail.charAt(0).toUpperCase() : "";
  };

  return (
    <nav className="navbar">
      <div className="left">
        <ul>
          <li>
            <a href="#">
              Edu<span>Chain</span>
            </a>
          </li>
        </ul>
      </div>

      <div className="middle">
        <ul className="flex">
          <li><a href="#">Home</a></li>
          <li><a href="#">Features</a></li>
          <li><a href="#">How it works</a></li>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Contact Us</a></li>
        </ul>
      </div>

      <div className="right" ref={dropdownRef}>
        {userEmail ? (
          <div className="profile-wrapper">
            <div
              className="profile-circle"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {getInitial()}
            </div>
            {showDropdown && (
              <div className="dropdown-menu">
                <ul>
                  <li>
                    <a href="profile">Profile</a>
                  </li>
                  <li>
                    <a href="dashboard">Dashboard</a>
                  </li>
                  <li onClick={handleLogout}>Logout</li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <button>
            <a href="signup">Sign In</a>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
