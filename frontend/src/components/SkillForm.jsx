import { useState } from "react";
import { addSkill } from "../api/skillApi";

function SkillForm() {
  const [name, setName] = useState("");
  const [type, setType] = useState("TEACH"); // default value
  const userId = 1; // Replace with logged-in user ID

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const skill = { name, type, userId };
      await addSkill(skill);
      alert("Skill added successfully!");
      setName(""); // reset form
      setType("TEACH");
      // Optionally refresh SkillList by triggering parent state
    } catch (err) {
      console.error(err);
      alert("Error adding skill");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Add Skill</h2>

      <div className="mb-4">
        <label className="block mb-1">Skill Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-2 py-1 w-full"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border px-2 py-1 w-full"
        >
          <option value="TEACH">TEACH</option>
          <option value="LEARN">LEARN</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Skill
      </button>
    </form>
  );
}

export default SkillForm;
