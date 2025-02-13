import "./App.css";
import { useEffect, useState } from "react";
import config from "./Helpers/config";

function App() {
  const [message, setMessage] = useState("");
  const UpdateStateCheck = () => {
    fetch(config.SERVER_URL).then((data) => {
      data.json().then((json) => {
        setMessage(json.data);
      });
    });
  };
  useEffect(() => {
    UpdateStateCheck();
  }, []);
  return (
    <div className="App">
      <p>{message}</p>
    </div>
  );
}

export default App;
