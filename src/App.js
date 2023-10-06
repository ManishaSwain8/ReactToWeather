import { MantineProvider, createTheme } from "@mantine/core";
import "./App.css";
import axios from "axios";
import "@mantine/core/styles.css";
import Home from "./Components/Home";
function App() {
  return (
    <div className="">
      <MantineProvider>
        <Home />
      </MantineProvider>{" "}
    </div>
  );
}

export default App;
