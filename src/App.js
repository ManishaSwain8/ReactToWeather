import { MantineProvider } from "@mantine/core";
import "./App.css";
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
