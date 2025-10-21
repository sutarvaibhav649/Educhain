const Navbar = () => {
  return (
    <nav>
      <div className="left">
        <ul>
          <li><a href="#">Edu<span>Chain</span></a></li>
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
      <div className="right">
            <button>
                 <a href="signup">Sign in</a>
            </button>
      </div>
    </nav>
  );
};

export default Navbar;
