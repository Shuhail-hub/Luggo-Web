import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LockerControl from "./pages/LockerControl";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LockerControl />} />
      </Routes>
    </Router>
  );
}

export default App;
