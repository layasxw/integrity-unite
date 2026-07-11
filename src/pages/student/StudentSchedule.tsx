import PageHeader from "../../components/PageHeader";
import Stub from "../../components/Stub";

export default function StudentSchedule() {
  return (
    <div>
      <PageHeader eyebrow="Ученикам" title="Расписание уроков" />
      <Stub note="Здесь появится расписание уроков для учеников текущего потока." />
    </div>
  );
}
