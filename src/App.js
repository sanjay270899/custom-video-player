import { BrowserRouter as Router, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { useState } from "react";
import { Home } from "./pages/Home";

export default function App() {
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
