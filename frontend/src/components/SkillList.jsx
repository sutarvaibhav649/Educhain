import { useEffect, useState } from "react";
import { getAllSkills, deleteSkill } from "../api/skillApi";

function SkillList() {
  const [skills, setSkills] = useState([]);
  const [search, setSearch] = useState("");

  const fetchSkills = async () => {
    try {
      const response = await getAllSkills();
      setSkills(response.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching skills");
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this skill?")) return;
    try {
      await deleteSkill(id);
      setSkills(skills.filter((s) => s.id !== id));
    } catch (err) {
      console.error(err);
      alert("Error deleting skill");
    }
  };

  const filteredSkills = skills.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Skill List</h2>

      <input
        type="text"
        placeholder="Search by name or type"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border px-2 py-1 w-full mb-4"
      />

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">Name</th>
            <th className="border px-2 py-1">Type</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredSkills.map((skill) => (
            <tr key={skill.id}>
              <td className="border px-2 py-1">{skill.name}</td>
              <td className="border px-2 py-1">{skill.type}</td>
              <td className="border px-2 py-1">
                <button
                  onClick={() => handleDelete(skill.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
                {/* You can add Edit button here in future */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SkillList;
