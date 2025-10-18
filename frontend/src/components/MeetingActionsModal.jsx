import { useState } from "react";
import { rescheduleMeeting, cancelMeeting } from "../api/meetingApi";

function MeetingActionsModal({ meeting, onClose }) {
  const [scheduledDate, setScheduledDate] = useState(
    new Date(meeting.scheduledDate).toISOString().slice(0, 16)
  );
  const [duration, setDuration] = useState(meeting.duration);

  const handleReschedule = async () => {
    try {
      await rescheduleMeeting(meeting.id, { scheduled_date: scheduledDate, duration });
      alert("Meeting rescheduled successfully!");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error rescheduling meeting");
    }
  };

  const handleCancel = async () => {
    if (!window.confirm("Are you sure you want to cancel this meeting?")) return;
    try {
      await cancelMeeting(meeting.id);
      alert("Meeting canceled successfully!");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error canceling meeting");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-lg font-semibold mb-4">Manage Meeting</h2>

        <div className="mb-4">
          <label className="block mb-1">Scheduled Date & Time</label>
          <input
            type="datetime-local"
            value={scheduledDate}
            onChange={(e) => setScheduledDate(e.target.value)}
            className="border px-2 py-1 w-full"
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

        <div className="flex justify-end space-x-2">
          <button
            onClick={handleReschedule}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Reschedule
          </button>
          <button
            onClick={handleCancel}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default MeetingActionsModal;
