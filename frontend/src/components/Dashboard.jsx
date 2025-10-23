import { useState, useEffect } from "react";
import * as jwtDecode from "jwt-decode"; // ✅ Vite-compatible
import { addSkill, getAllSkills, deleteSkill } from "../api/skillApi";
import "../css/Dashboard.css";

const Dashboard = () => {
  const [userId, setUserId] = useState(null);
  const [skills, setSkills] = useState([]);
  const [name, setName] = useState("");
  const [type, setType] = useState("TEACH");
  const [search, setSearch] = useState("");

  // Get logged-in user ID from JWT
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

  // Fetch skills for logged-in user
  const fetchSkills = async (id = userId) => {
    if (!id) return;
    try {
      const res = await getAllSkills();
      setSkills(res.data.filter(skill => skill.userId === id));
    } catch (err) {
      console.error(err);
      alert("Error fetching skills");
    }
  };

  useEffect(() => {
    if (userId) fetchSkills();
  }, [userId]);

  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (!userId) return alert("User not logged in");
    try {
      await addSkill({ name, type, userId });
      alert("Skill added successfully!");
      setName("");
      setType("TEACH");
      fetchSkills();
    } catch (err) {
      console.error(err);
      alert("Error adding skill");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this skill?")) return;
    try {
      await deleteSkill(id);
      setSkills(skills.filter(s => s.id !== id));
    } catch (err) {
      console.error(err);
      alert("Error deleting skill");
    }
  };

  const filteredSkills = skills.filter(
    s => s.name.toLowerCase().includes(search.toLowerCase()) ||
         s.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <h2>My Skills Dashboard</h2>
      <div className="dashboard-cards">
        <form className="skill-form card" onSubmit={handleAddSkill}>
          <h3>Add Skill</h3>
          <input
            type="text"
            placeholder="Skill Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <select value={type} onChange={e => setType(e.target.value)}>
            <option value="TEACH">TEACH</option>
            <option value="LEARN">LEARN</option>
          </select>
          <button type="submit" className="btn-primary">Add Skill</button>
        </form>

        <div className="skill-list card">
          <input
            type="text"
            placeholder="Search by name or type"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="search-input"
          />
          <table className="skills-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSkills.map(skill => (
                <tr key={skill.id}>
                  <td>{skill.name}</td>
                  <td>{skill.type}</td>
                  <td>
                    <button onClick={() => handleDelete(skill.id)} className="btn-danger">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filteredSkills.length === 0 && (
                <tr>
                  <td colSpan="3" className="no-skills">
                    No skills found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
