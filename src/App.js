// Libraries
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useState } from "react";

// Components
import { Header } from "./components/Header";
import { Home } from "./pages/Home";

export default function App() {
  // State for Video Queue
  const [videoQueue, setVideoQueue] = useState([]);
  return (
    <Router>
      <Header videoQueue={videoQueue} setVideoQueue={setVideoQueue} />
      <Route path="/" exact>
        <Home videoQueue={videoQueue} />
      </Route>
    </Router>
  );
}
