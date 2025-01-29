import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WelcomePage from "./components/WelcomePage";
import InputForm from "./components/InputForm";
import GeneratedPlan from "./components/GeneratedPlan";

function App() {
  return (
    <Router basename="/yoga-coach-ui">
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/input" element={<InputForm />} />
        <Route path="/plan" element={<GeneratedPlan />} />
      </Routes>
    </Router>
  );
}

export default App;
