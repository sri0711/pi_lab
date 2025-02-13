import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const UpdateStateCheck = () => {
    fetch("http://server:3001").then((data) => {
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
