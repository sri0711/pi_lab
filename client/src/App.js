import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const UpdateStateCheck = () => {
    fetch(process.env.REACT_APP_API_URL).then((data) => {
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
