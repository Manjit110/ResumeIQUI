// src/App.jsx
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Achievements from "./pages/Achievements";
import ScotiabankPlan from "./pages/plans/ScotiabankPlan";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/plan/scotiabank-software-engineer" element={<ScotiabankPlan />} />
      </Routes>
    </HashRouter>
  );
}
