import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../api/api"; // adjust path

const ProfilePage = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    skills: [],
    courses: [],
    connections: 0,
    profileImage: "",
  });

  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  useEffect(() => {
    // Fetch user profile from backend
    const token = localStorage.getItem("token");
    if (token) {
      API.get("/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          setUser(res.data);
          setFormData(res.data);
        })
        .catch((err) => console.error(err));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await API.put("/auth/profile", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
      setEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Error updating profile");
    }
  };

  return (
    <>
      <Navbar />
      <div className="profile-container">
        {/* Profile Info */}
        <div className="profile-card">
          <div className="profile-image">
            {user.profileImage ? (
              <img src={user.profileImage} alt="Profile" />
            ) : (
              <div className="profile-placeholder">
                {user.email.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="profile-info">
            {!editing ? (
              <>
                <h2>
                  {user.firstName} {user.lastName}
                </h2>
                <p>Email: {user.email}</p>
                <p>Connections: {user.connections}</p>
                <div className="btns">
                  <button onClick={() => setEditing(true)}>Edit Profile</button>
                </div>
              </>
            ) : (
              <>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  disabled
                />
                <div className="btns">
                  <button onClick={handleSave}>Save</button>
                  <button onClick={() => setEditing(false)}>Cancel</button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Skills Section */}
        <div className="section">
          <h3>Skills</h3>
          <div className="skills">
            {user.skills.length > 0 ? (
              user.skills.map((skill, idx) => <span key={idx}>{skill}</span>)
            ) : (
              <p>No skills added yet</p>
            )}
          </div>
        </div>

        {/* Courses Section */}
        <div className="section">
          <h3>Courses</h3>
          <div className="courses">
            {user.courses.length > 0 ? (
              user.courses.map((course, idx) => <span key={idx}>{course}</span>)
            ) : (
              <p>No courses added yet</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
