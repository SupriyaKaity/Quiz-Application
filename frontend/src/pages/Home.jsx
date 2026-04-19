import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Home = () => {
  const [examStarted, setExamStarted] = useState(false);

  useEffect(() => {
    if (examStarted) {
      window.dispatchEvent(new Event("examStart"));
    } else {
      window.dispatchEvent(new Event("examEnd"));
    }
  }, [examStarted]);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Navbar />
      <div style={{ flex: 1, overflow: "hidden" }}>
        <Sidebar
          onExamStart={() => setExamStarted(true)}
          onExamEnd={() => setExamStarted(false)}
        />
      </div>
    </div>
  );
};

export default Home;
