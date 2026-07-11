import PageHeader from "../../components/PageHeader";
import Stub from "../../components/Stub";

export default function Lesson() {
  return (
    <div>
      <PageHeader eyebrow="Ученикам" title="Как проходит урок" />
      <Stub note="Здесь появится описание того, как устроен урок: формат, длительность и что нужно для участия." />
    </div>
  );
}
