// Libraries
import { Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactGA from "react-ga";

// Components
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { Footer } from "./components/Footer";

const usePageView = () => {
  const location = useLocation();

  useEffect(() => {
    // console.log("Initialized REACT GA");
    ReactGA.initialize(process.env.REACT_APP_GA_ID);
  }, []);

  useEffect(() => {
    // console.log("Location changes detected.");
    // console.log(location);
    ReactGA.pageview(location.pathname);
  }, [location]);
};

export default function App() {
  // State for Video Queue
  const [videoQueue, setVideoQueue] = useState([]);

  usePageView();
  return (
    <>
      <div className="min-vh-100">
        <Header videoQueue={videoQueue} setVideoQueue={setVideoQueue} />
        <Route path="/" exact>
          <Home videoQueue={videoQueue} />
        </Route>
        <Route path="/about" exact>
          <h1 className="p-5 text-center">About</h1>
          <p className="text-center">Under construction...</p>
        </Route>
        <Route path="/contact" exact>
          <h1 className="p-5 text-center">Contact</h1>
          <p className="text-center">Under construction...</p>
        </Route>
      </div>
      <Footer />
    </>
  );
}
