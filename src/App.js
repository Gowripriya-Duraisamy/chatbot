import React from "react";
import { ReactFlowProvider } from "reactflow"; // Import ReactFlowProvider from reactflow for context setup

import Flow from "./components/Flow"; // Import Flow component for rendering flow chart
import Header from "./components/Header"; // Import Header component for rendering header

import "./App.css"; // Import CSS file for styling

function App() {
  return (
    <div className="App"> {/* Main container for the entire application */}
      <ReactFlowProvider> {/* Wrap components in ReactFlowProvider to provide context for React Flow */}
        <Header /> {/* Render Header component for displaying application header */}
        <Flow /> {/* Render Flow component for displaying the main flow chart */}
      </ReactFlowProvider>
    </div>
  );
}

export default App; // Export App component as the default export
