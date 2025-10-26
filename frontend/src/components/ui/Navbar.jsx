import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import { User, LogOut, LogIn, UserPlus, Share2, Settings } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Check for JWT token on mount
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    navigate("/signin");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-md shadow-md border-b border-border">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Share2 className="text-primary" size={24} />
          <h1 className="text-xl font-bold text-foreground">
            Edu<span className="text-primary">Chain</span>
          </h1>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-8 text-foreground">
          <li><a href="/" className="hover:text-primary transition">Home</a></li>
          <li><a href="/browse-skills" className="hover:text-primary transition">Skills</a></li>
          <li><a href="/meeting-management" className="hover:text-primary transition">Exchange</a></li>
          <li><a href="#community" className="hover:text-primary transition">Community</a></li>
          <li><a href="#achievements" className="hover:text-primary transition">Achievements</a></li>
          <li><a href="#settings" className="hover:text-primary transition">Settings</a></li>
        </ul>

        {/* Right Side */}
        <div className="hidden md:flex items-center space-x-4 relative">
          {isLoggedIn ? (
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              >
                <User />
              </Button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-md shadow-lg z-50">
                  <Link
                    to="/user-profile"
                    className="block px-4 py-2 text-sm hover:bg-accent hover:text-foreground"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-sm hover:bg-accent hover:text-foreground"
                  >
                    Settings
                  </Link>
                  <button
                    className="w-full text-left px-4 py-2 text-sm hover:bg-accent hover:text-foreground flex items-center"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2" /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Button asChild variant="outline" className="flex items-center space-x-2">
                <Link to="/signin">
                  <LogIn size={16} />
                  <span>Sign In</span>
                </Link>
              </Button>

              <Button asChild className="flex items-center space-x-2">
                <Link to="/signup">
                  <UserPlus size={16} />
                  <span>Sign Up</span>
                </Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-background border-t border-border px-6 py-4 space-y-3">
          <a href="#hero" className="block">Home</a>
          <a href="#skills" className="block">Skills</a>
          <a href="#exchange" className="block">Exchange</a>
          <a href="#community" className="block">Community</a>
          <a href="#achievements" className="block">Achievements</a>
          <a href="#settings" className="block">Settings</a>

          {!isLoggedIn ? (
            <>
              <Button asChild className="w-full mt-2">
                <Link to="/signup"><UserPlus size={16} className="mr-2" />Sign Up</Link>
              </Button>
              <Button asChild variant="outline" className="w-full mt-2">
                <Link to="/signin"><LogIn size={16} className="mr-2" />Sign In</Link>
              </Button>
            </>
          ) : (
            <div className="space-y-2">
              <Link to="/user-profile" className="block px-4 py-2 text-sm hover:bg-accent rounded">Profile</Link>
              <Link to="/settings" className="block px-4 py-2 text-sm hover:bg-accent rounded">Settings</Link>
              <button
                className="w-full text-left px-4 py-2 text-sm hover:bg-accent rounded flex items-center"
                onClick={handleLogout}
              >
                <LogOut className="mr-2" /> Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
