import { BrowserRouter as Router, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { VideoPlayer } from "./components/VideoPlayer";

export default function App() {
  const url =
    "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_5mb.mp4";
  return (
    <Router>
      {/* <Header /> */}
      <Route path="/" exact>
        <VideoPlayer url={url} />
      </Route>
    </Router>
  );
}
