import React from "react";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import Home from "./Components/Home";

function App() {
  return (
    <div className="app">
      <MantineProvider>
        <Home />
      </MantineProvider>
    </div>
  );
}

export default App;
