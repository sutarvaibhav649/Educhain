import { useState, useEffect } from "react";
import { createMeeting } from "../api/meetingApi";
import { getAllSkills } from "../api/skillApi"; // optional: to select mentor/learner

function MeetingForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mentorId, setMentorId] = useState("");
  const [learnerId, setLearnerId] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");
  const [duration, setDuration] = useState(60);

  const [users, setUsers] = useState([]); // optional: fetch users from API

  // Optional: fetch users for mentor/learner dropdown
  // useEffect(() => { fetch users here if needed }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const meeting = {
        title,
        description,
        mentor_id: parseInt(mentorId),
        learner_id: parseInt(learnerId),
        scheduled_date: scheduledDate,
        duration,
        status: "SCHEDULED",
        meeting_link: "" // backend generates
      };
      await createMeeting(meeting);
      alert("Meeting scheduled successfully!");
      setTitle("");
      setDescription("");
      setMentorId("");
      setLearnerId("");
      setScheduledDate("");
      setDuration(60);
    } catch (err) {
      console.error(err);
      alert("Error scheduling meeting");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Schedule Meeting</h2>

      <div className="mb-4">
        <label className="block mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border px-2 py-1 w-full"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border px-2 py-1 w-full"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Mentor ID</label>
        <input
          type="number"
          value={mentorId}
          onChange={(e) => setMentorId(e.target.value)}
          className="border px-2 py-1 w-full"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Learner ID</label>
        <input
          type="number"
          value={learnerId}
          onChange={(e) => setLearnerId(e.target.value)}
          className="border px-2 py-1 w-full"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Scheduled Date & Time</label>
        <input
          type="datetime-local"
          value={scheduledDate}
          onChange={(e) => setScheduledDate(e.target.value)}
          className="border px-2 py-1 w-full"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Duration (minutes)</label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="border px-2 py-1 w-full"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Schedule
      </button>
    </form>
  );
}

export default MeetingForm;
