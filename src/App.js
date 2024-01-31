import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Index } from "./screens/Index";
import { Create } from "./screens/Create";
import { Signin } from "./screens/Singin";
import { Payments } from "./screens/Payments";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Signin />} />
        <Route path="/index" exact element={<Index />} />
        <Route path="/create" exact element={<Create />} />
        <Route path="/payments" exact element={<Payments />} />
      </Routes>
    </Router>
  );
}

export default App;
