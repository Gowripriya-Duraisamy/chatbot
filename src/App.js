import React from "react";
import { ReactFlowProvider } from "reactflow";

import Flow from "./components/Flow";
import Header from "./components/Header";

import "./App.css";

function App() {
  return (
    <div className="App">
      <ReactFlowProvider>
        <Header />
        <Flow />
      </ReactFlowProvider>
    </div>
  );
}

export default App;
