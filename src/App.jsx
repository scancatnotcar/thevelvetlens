import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import About from "./About";
import ClickPictures from "./ClickPictures";
import UploadPictures from "./UploadPictures";  // Import UploadPictures
import Next from "./Next"; // Import Next component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/aboutus" element={<About />} />
        <Route path="/clickpictures" element={<ClickPictures />} />
        <Route path="/uploadpictures" element={<UploadPictures />} />  {/* New route */}
        <Route path="/next" element={<Next />} /> {/* Route for Next */}
      </Routes>
    </Router>
  );
}

export default App;
