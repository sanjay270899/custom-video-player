import { useState } from "react";
import { FormControl, Navbar, Button, Form, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import pexels from "../api/pexels";

export const Header = ({ videoQueue, setVideoQueue }) => {
  const [videoLinkInput, setVideoLinkInput] = useState("");
  const [alert, setAlert] = useState(false);

  const handleOnSearch = () => {
    if (videoLinkInput === "") {
      setAlert(true);
      return;
    }
    setAlert(false);
    fetchAndAddVideo(videoLinkInput);
    setVideoLinkInput("");
  };

  const fetchAndAddVideo = async str => {
    try {
      const response = await pexels.get("/videos/search", {
        params: {
          query: str,
          per_page: 3,
          page: 1
        }
      });

      const videos = response.data.videos.map(obj => ({
        ...obj,
        text: str
      }));

      setVideoQueue([...videoQueue, ...videos]);
    } catch (err) {
      console.log(err);
    }
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
      {alert && (
        <Alert
          variant="warning"
          onClick={() => setAlert(false)}
          className="m-0 px-2 py-1"
        >
          Empty Input!
        </Alert>
      )}
      <Form className="d-flex">
        <FormControl
          type="text"
          placeholder="Search Key Word"
          value={videoLinkInput}
          onChange={e => setVideoLinkInput(e.target.value)}
        />
        <Button
          variant="outline-info"
          className="mx-3 font-weight-bold"
          onClick={() => handleOnSearch()}
        >
          ADD
        </Button>
      </Form>
    </Navbar>
  );
};
