import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Index } from "./screens/Index";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Index />} />
      </Routes>
    </Router>
  );
}

export default App;
