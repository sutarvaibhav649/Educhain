import { useEffect, useState } from "react";
import { getUserMeetings, updateMeetingStatus } from "../api/meetingApi";
import MeetingActionsModal from "./MeetingActionsModal";

function MeetingList({ userId }) {
  const [meetings, setMeetings] = useState([]);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchMeetings = async () => {
    try {
      const res = await getUserMeetings(userId);
      setMeetings(res.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching meetings");
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  const handleStatusChange = async (meetingId, status) => {
    try {
      await updateMeetingStatus(meetingId, status);
      fetchMeetings();
    } catch (err) {
      console.error(err);
      alert("Error updating status");
    }
  };

  const openModal = (meeting) => {
    setSelectedMeeting(meeting);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMeeting(null);
    setModalOpen(false);
    fetchMeetings();
  };

  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Meetings</h2>

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">Title</th>
            <th className="border px-2 py-1">Mentor</th>
            <th className="border px-2 py-1">Learner</th>
            <th className="border px-2 py-1">Date</th>
            <th className="border px-2 py-1">Duration</th>
            <th className="border px-2 py-1">Status</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {meetings.map((m) => (
            <tr key={m.id}>
              <td className="border px-2 py-1">{m.title}</td>
              <td className="border px-2 py-1">{m.mentor?.name}</td>
              <td className="border px-2 py-1">{m.learner?.name}</td>
              <td className="border px-2 py-1">{new Date(m.scheduledDate).toLocaleString()}</td>
              <td className="border px-2 py-1">{m.duration} min</td>
              <td className="border px-2 py-1">{m.status}</td>
              <td className="border px-2 py-1">
                <button
                  onClick={() => openModal(m)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 mr-2"
                >
                  Actions
                </button>
                {m.status !== "CANCELED" && (
                  <button
                    onClick={() => handleStatusChange(m.id, "COMPLETED")}
                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                  >
                    Complete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpen && selectedMeeting && (
        <MeetingActionsModal meeting={selectedMeeting} onClose={closeModal} />
      )}
    </div>
  );
}

export default MeetingList;
