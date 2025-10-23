import { useState, useEffect } from "react";
import { addSkill } from "../api/skillApi";
import * as jwtDecode from "jwt-decode"; // Vite-compatible

const SkillForm = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("TEACH");
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState("");

  // Extract userId from JWT on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode.default(token); // Vite requires .default
        setUserId(decoded?.userId || decoded?.id);
      } catch (err) {
        console.error("Invalid token", err);
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!userId) {
      setError("You must be logged in to add a skill.");
      return;
    }

    if (!name.trim()) {
      setError("Skill name cannot be empty.");
      return;
    }

    try {
      const skill = { name, type, userId };
      await addSkill(skill);
      alert("Skill added successfully!");
      setName("");
      setType("TEACH");
    } catch (err) {
      console.error(err);
      setError("Error adding skill. Try again.");
    }
  };

  return (
    <div className="form-container skill-form-container">
      <div className="left-form">
        <h1>Add Your Skill</h1>
        <p>Share your expertise or skills you want to learn</p>
      </div>

      <div className="right-form">
        <form onSubmit={handleSubmit}>
          <div className="header">
            <h3>Skill Form</h3>
          </div>

          <input
            type="text"
            placeholder="Skill Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {error && <p className="error">{error}</p>}

          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="TEACH">TEACH</option>
            <option value="LEARN">LEARN</option>
          </select>

          <div className="btn">
            <button type="submit">Add Skill</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SkillForm;
