import React, { useState } from "react";
import Icon from "./AppIcon";

const Signup = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Step 1: Register user (send OTP)
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.text();
      if (res.ok) {
        alert("OTP sent to your email. Please verify.");
        setOtpSent(true);
      } else {
        alert(data);
      }
    } catch (err) {
      alert("Error connecting to server.");
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const params = new URLSearchParams({
        email: form.email,
        otp: otp,
      }).toString();

      const res = await fetch(
        `http://localhost:8080/api/auth/verify-otp?${params}`,
        { method: "POST" }
      );
      const data = await res.text();
      if (res.ok) {
        alert("Email verified successfully! You can now log in.");
        window.location.href = "/signin";
      } else {
        alert(data);
      }
    } catch (err) {
      alert("Error verifying OTP.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-neutral-50">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-96">
        {!otpSent ? (
          <>
            <h2 className="text-2xl font-semibold mb-6 text-center text-neutral-800">
              Create Account
            </h2>
            <form onSubmit={handleSignup} className="flex flex-col gap-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                  className="border rounded-lg px-4 py-2 w-1/2 focus:outline-none"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                  className="border rounded-lg px-4 py-2 w-1/2 focus:outline-none"
                />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
                className="border rounded-lg px-4 py-2 focus:outline-none"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                className="border rounded-lg px-4 py-2 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg flex justify-center items-center gap-2 transition-all"
              >
                <Icon name="UserPlus" size={18} color="#fff" /> Sign Up
              </button>
            </form>
            <p className="text-center text-sm text-neutral-600 mt-4">
              Already have an account?{" "}
              <a
                href="/signin"
                className="text-blue-500 hover:underline font-medium"
              >
                Sign In
              </a>
            </p>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold text-center mb-4 text-neutral-800">
              Verify OTP
            </h2>
            <p className="text-sm text-neutral-600 mb-4 text-center">
              An OTP has been sent to <b>{form.email}</b>.
            </p>
            <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="border rounded-lg px-4 py-2 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg flex justify-center items-center gap-2"
              >
                <Icon name="MailCheck" size={18} color="#fff" /> Verify Email
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Signup;
