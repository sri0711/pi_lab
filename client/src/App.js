import "./App.css";
import { useEffect, useRef } from "react";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "xterm-addon-fit";
import config from "./Helpers/config";
import io from "socket.io-client";
import IntegratedTerminal from "./Components/integratedTerminal";
import "../node_modules/@xterm/xterm/css/xterm.css";

// Initialize xterm.js terminal
const terminal = new Terminal();
const socket = io(config.SERVER_URL);

function App() {
  const terminalRef = useRef(null);
  // const fitAddon = useRef(new FitAddon());
  useEffect(() => {
    if (!terminalRef.current) return;

    // terminal.loadAddon(fitAddon.current);
    terminal.open(terminalRef.current);
    // fitAddon.current.fit();
    terminal.write("Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ");

    // Resize the terminal when the window is resized
    // window.addEventListener("resize", () => {
    //   fitAddon.current.fit();
    // });
  }, [terminalRef]);

  useEffect(() => {
    socket.on("terminal_process", (data) => {
      terminal.write(data);
    });

    terminal.onData((data) => {
      console.log(data);
      socket.emit("terminal", data);
    });
  }, []);
  return (
    <div className="App">
      <div ref={terminalRef} style={{ height: "100vh", width: "100vw" }} />
      <IntegratedTerminal />
    </div>
  );
}

export default App;
