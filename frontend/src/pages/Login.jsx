const Login = () => {
  return (
    <>
      <div className="login-container">
        {/* LEFT SECTION (FORM SIDE) */}
        <div className="login-left">
          <h2>Login Into Your Account</h2>

          <div className="login-header">
            <p className="social-text">sign in using</p>
            <div className="social-logos">
              <div className="icon">
                <img src="./src/assets/google-new.png" alt="Google" />
              </div>
              <div className="icon">
                <img src="./src/assets/linkedIn-new.png" alt="LinkedIn" />
              </div>
              <div className="icon">
                <img src="./src/assets/insta-new.png" alt="Instagram" />
              </div>
            </div>
          </div>

          <form className="login-form">
            <p>Or use your email</p>
            <input
              type="email"
              placeholder="Email"
              name="email"
              id="email"
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              id="password"
              required
            />
            <div className="btn">
              <button type="submit">Sign In</button>
            </div>
          </form>
        </div>

        {/* RIGHT SECTION (WELCOME SIDE) */}
        <div className="login-right">
          <h1>Welcome Back!</h1>
          <p>Don’t have an account? Join us to grow your network.</p>
         
            <a href="signup">
                <button>Sign Up</button>
            </a>
          
        </div>
      </div>
    </>
  );
};

export default Login;
