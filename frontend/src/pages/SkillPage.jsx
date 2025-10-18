import SkillForm from "../components/SkillForm";
import SkillList from "../components/SkillList";

function SkillsPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Skills</h1>
      <SkillForm />
      <SkillList />
    </div>
  );
}

export default SkillsPage;
