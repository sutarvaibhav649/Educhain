import { useState } from "react";
import API from "../api/api"; // adjust path if needed

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [emailForOtp, setEmailForOtp] = useState("");

  // Validate password
  const validatePassword = (password) => {
    const regex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
    return regex.test(password);
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error on change
  };

  // Signup submit
  const handleSignup = async (e) => {
    e.preventDefault();

    // Frontend validation
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First Name required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last Name required";
    if (!formData.email.trim()) newErrors.email = "Email required";
    if (!formData.password.trim()) newErrors.password = "Password required";
    else if (!validatePassword(formData.password))
      newErrors.password =
        "Password must be 8+ chars, include uppercase, number & special char";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await API.post("/auth/register", formData);
      alert(response.data);
      setOtpSent(true);
      setEmailForOtp(formData.email);
    } catch (error) {
      console.error(error);
      if (error.response?.data) {
        // show server error below email if email exists
        setErrors({ email: error.response.data });
      } else {
        alert("Error creating account");
      }
    }
  };

  // OTP verification submit
  const handleOtpVerify = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/auth/verify-otp", null, {
        params: { email: emailForOtp, otp: otp },
      });
      alert(response.data);
      window.location.href = "/login";
    } catch (error) {
      console.error(error);
      alert(error.response?.data || "Invalid OTP");
    }
  };

  return (
    <div className="form-container">
      {/* LEFT FORM */}
      <div className="left-form">
        <h1>Welcome</h1>
        <p>To get updates and stay connected with us</p>
        <a href="/login">
          <button>Sign In</button>
        </a>
      </div>

      {/* RIGHT FORM */}
      <div className="right-form">
        {!otpSent ? (
          <>
            <div className="header">
              <h3>Create an Account</h3>
            </div>
            <p>Or use your email</p>
            <form onSubmit={handleSignup} method="post">
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <span className="error">{errors.email}</span>}

              <div className="name">
                <input
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                {errors.firstName && (
                  <span className="error">{errors.firstName}</span>
                )}

                <input
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
                {errors.lastName && (
                  <span className="error">{errors.lastName}</span>
                )}
              </div>

              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {errors.password && <span className="error">{errors.password}</span>}

              <div className="btn">
                <button type="submit">Sign Up</button>
              </div>
            </form>
          </>
        ) : (
          <>
            <h3>Verify Your Email</h3>
            <p>
              We have sent an OTP to <strong>{emailForOtp}</strong>
            </p>
            <form onSubmit={handleOtpVerify}>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <div className="btn">
                <button type="submit">Verify OTP</button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default SignUp;
