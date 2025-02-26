import React, { useState } from "react";
import Terminal, { ColorMode, TerminalOutput } from "react-terminal-ui";
import config from "../Helpers/config";

function IntegratedTerminal() {
  const [terminalLineData, setTerminalLineData] = useState([
    <TerminalOutput>Welcome to the React Terminal UI Demo!</TerminalOutput>,
  ]);
  const UpdateStateCheck = (input) => {
    if (input === "clear") {
      setTerminalLineData([]);
      return;
    }
    let fetchUrl = config.SERVER_URL + "?command=" + input;
    console.log("config.SERVER_URL", fetchUrl);
    fetch(fetchUrl).then((data) => {
      data.text().then((json) => {
        setTerminalLineData([
          ...terminalLineData,
          <TerminalOutput>{json}</TerminalOutput>,
        ]);
      });
    });
  };
  return (
    <Terminal
      name="Pi Lab Terminal"
      colorMode={ColorMode.Dark}
      onInput={(terminalInput) => UpdateStateCheck(terminalInput)}
      TopButtonsPanel={() => null}
      height="100%"
    >
      {terminalLineData}
    </Terminal>
  );
}

export default IntegratedTerminal;
