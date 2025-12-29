import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button className="btn btn-primary">Press here</button>
    </div>
  );
}

export default App;
