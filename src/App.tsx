import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Team from "./pages/Team";
import Reviews from "./pages/Reviews";
import Schedule from "./pages/Schedule";
import NotFound from "./pages/NotFound";

import HowToJoin from "./pages/volunteer/HowToJoin";
import Clubs from "./pages/volunteer/Clubs";
import Branches from "./pages/volunteer/Branches";
import Publications from "./pages/volunteer/Publications";
import TopVolunteers from "./pages/volunteer/TopVolunteers";

import HowToEnroll from "./pages/parent/HowToEnroll";
import HowClassesWork from "./pages/parent/HowClassesWork";
import Safety from "./pages/parent/Safety";
import FAQ from "./pages/parent/FAQ";

import Subjects from "./pages/student/Subjects";
import Lesson from "./pages/student/Lesson";
import StudentSchedule from "./pages/student/StudentSchedule";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/team" element={<Team />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/schedule" element={<Schedule />} />

        <Route path="/volunteer" element={<HowToJoin />} />
        <Route path="/volunteer/clubs" element={<Clubs />} />
        <Route path="/volunteer/branches" element={<Branches />} />
        <Route path="/volunteer/publications" element={<Publications />} />
        <Route path="/volunteer/top" element={<TopVolunteers />} />

        <Route path="/parents/enroll" element={<HowToEnroll />} />
        <Route path="/parents/how-it-works" element={<HowClassesWork />} />
        <Route path="/parents/safety" element={<Safety />} />
        <Route path="/parents/faq" element={<FAQ />} />

        <Route path="/students/subjects" element={<Subjects />} />
        <Route path="/students/lesson" element={<Lesson />} />
        <Route path="/students/schedule" element={<StudentSchedule />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
