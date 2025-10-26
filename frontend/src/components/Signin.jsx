import React, { useState } from "react";
import Icon from "./AppIcon";

const Signin = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.text();

      if (res.ok) {
        localStorage.setItem("jwt", data); // store JWT token
        alert("Login successful!");
        window.location.href = "/ "; // redirect to main app
      } else {
        alert(data);
      }
    } catch (err) {
      alert("Error connecting to server.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-neutral-50">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center text-neutral-800">
          Sign In
        </h2>
        <form onSubmit={handleSignin} className="flex flex-col gap-4">
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
            <Icon name="LogIn" size={18} color="#fff" /> Sign In
          </button>
        </form>
        <p className="text-center text-sm text-neutral-600 mt-4">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-blue-500 hover:underline font-medium"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signin;
