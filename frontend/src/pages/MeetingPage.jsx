import MeetingForm from "../components/MeetingForm";
import MeetingList from "../components/MeetingList";

function MeetingsPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Meetings</h1>
      <MeetingForm />
      <MeetingList />
    </div>
  );
}

export default MeetingsPage;
