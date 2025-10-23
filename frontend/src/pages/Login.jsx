import { useState } from "react";
import API from "../api/api"; 

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

  
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await API.post("/auth/login", formData);
      localStorage.setItem("token", response.data);
      alert("Login successful!");
      window.location.href = "/";
    } catch (error) {
      console.error(error);
      if (error.response?.status === 403) {
        setErrors({ email: error.response.data }); 
      } else if (error.response?.status === 401) {
        setErrors({ password: error.response.data }); 
      } else {
        alert("Something went wrong during login");
      }
    }
  };

  return (
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

        <form className="login-form" onSubmit={handleSubmit} method="post">
          <p>Or use your email</p>

          <input
            type="email"
            placeholder="Email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <span className="error">{errors.email}</span>}

          <input
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <span className="error">{errors.password}</span>}

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
  );
};

export default Login;
