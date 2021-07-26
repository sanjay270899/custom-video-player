// Libraries
import { useState } from "react";
import {
  FormControl,
  Navbar,
  Button,
  Form,
  Alert,
  Spinner
} from "react-bootstrap";
import { Link } from "react-router-dom";

// PEXELS API
import pexels from "../api/pexels";
import { GAevent } from "../utils/GA";

export const Header = ({ videoQueue, setVideoQueue }) => {
  // State for Video Search Input
  const [videoLinkInput, setVideoLinkInput] = useState("");
  // State for isLoading while search
  const [isLoading, setIsLoading] = useState(false);
  // State for Alert
  const [alert, setAlert] = useState({
    state: false,
    message: "",
    status: "success"
  });

  // Function to handle onSearch
  const handleOnSearch = e => {
    e.preventDefault();

    // If input is empty, then show alert
    if (videoLinkInput === "") {
      setAlert({
        status: "warning",
        state: true,
        message: "Empty Input!"
      });
      return;
    }

    GAevent({
      category: "Click",
      action: "Searched for a video",
      label: `Search Text: ${videoLinkInput}`
    });

    setAlert({
      status: "success",
      state: false,
      message: ""
    });
    fetchAndAddVideo(videoLinkInput);
    setVideoLinkInput("");
  };

  const fetchAndAddVideo = async str => {
    setIsLoading(true);
    try {
      // PEXELS API
      const response = await pexels.get("/videos/search", {
        params: {
          query: str,
          per_page: 3,
          page: 1
        }
      });

      GAevent({
        category: "API",
        action: "GET: PEXELS",
        label: "Path: /videos/search"
      });

      // If no video found, then show alert
      if (response.data.videos.length === 0) {
        setAlert({
          status: "warning",
          state: true,
          message: "No Video Found!"
        });
        setIsLoading(false);
        return;
      }

      // Adding 'text' property to all objects of array
      const videos = response.data.videos.map(obj => ({
        ...obj,
        text: str
      }));

      setVideoQueue([...videoQueue, ...videos]);

      setAlert({
        status: "success",
        state: true,
        message: `${videos.length} Video(s) added in queue!`
      });
    } catch (err) {
      // Error handling while hitting API endpoint
      console.log(err);
      setAlert({
        status: "warning",
        state: true,
        message: err.message
      });
    }
    setIsLoading(false);
  };

  return (
    <Navbar
      bg="dark"
      variant="dark"
      className="shadow-lg bg-dark d-flex justify-content-between p-3"
    >
      <Link to="/" className="navbar-brand px-4 text-white">
        S2R2 Video Player
      </Link>
      {/* ALERT */}
      {alert.state && (
        <Alert
          variant={alert.status}
          onClick={() => setAlert({ ...alert, state: false })}
          className="m-0 px-2 py-1"
        >
          {alert.message}
        </Alert>
      )}
      <Form className="d-flex" onSubmit={e => handleOnSearch(e)}>
        {/* SEARCH INPUT */}
        <FormControl
          type="text"
          placeholder="Search Key Word"
          value={videoLinkInput}
          onChange={e => setVideoLinkInput(e.target.value)}
        />
        {/* SEARCH BUTTON */}
        <Button
          type="submit"
          variant="outline-info"
          className="mx-3 font-weight-bold d-flex align-items-center"
          disabled={isLoading}
        >
          {isLoading && (
            /* LOADER */
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          )}
          ADD
        </Button>
      </Form>
    </Navbar>
  );
};
