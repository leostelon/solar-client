import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Index } from "./screens/Index";
import { Signin } from "./screens/Singin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Signin />} />
        <Route path="/index" exact element={<Index />} />
      </Routes>
    </Router>
  );
}

export default App;
