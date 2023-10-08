import { MantineProvider, createTheme } from "@mantine/core";
import "./App.css";
import axios from "axios";
import "@mantine/core/styles.css";
import Home from "./Components/Home";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <div className="">
      <MantineProvider>
        <Toaster />
        <Home />
      </MantineProvider>{" "}
    </div>
  );
}

export default App;
