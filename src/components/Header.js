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
import pexels from "../api/pexels";

export const Header = ({ videoQueue, setVideoQueue }) => {
  const [videoLinkInput, setVideoLinkInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({
    state: false,
    message: "",
    status: "success"
  });

  const handleOnSearch = e => {
    e.preventDefault();
    if (videoLinkInput === "") {
      setAlert({
        status: "warning",
        state: true,
        message: "Empty Input!"
      });
      return;
    }
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
      const response = await pexels.get("/videos/search", {
        params: {
          query: str,
          per_page: 3,
          page: 1
        }
      });

      if (response.data.videos.length === 0) {
        setAlert({
          status: "warning",
          state: true,
          message: "No Video Found!"
        });
        setIsLoading(false);
        return;
      }

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
        <FormControl
          type="text"
          placeholder="Search Key Word"
          value={videoLinkInput}
          onChange={e => setVideoLinkInput(e.target.value)}
        />
        <Button
          type="submit"
          variant="outline-info"
          className="mx-3 font-weight-bold d-flex align-items-center"
          disabled={isLoading}
        >
          {isLoading && (
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
