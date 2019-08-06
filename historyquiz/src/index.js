import React from "react";
import ReactDOM from "react-dom";

import "./App.css";
import HistoryQuiz from "./components/historyquiz.js";

function App() {
  return (
    <div className="App">
      <HistoryQuiz />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);