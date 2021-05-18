import { BrowserRouter as Router, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { VideoPlayer } from "./components/VideoPlayer";
import { useState } from "react";
import Carousel from "react-multi-carousel";
import { Card, Container } from "react-bootstrap";
import "react-multi-carousel/lib/styles.css";
import pexels from "./api/pexels";

export default function App() {
  const [videoQueue, setVideoQueue] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(-1);

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
    <Router>
      <Header fetchAndAddVideo={fetchAndAddVideo} />
      <Route path="/" exact>
        <main className="d-flex-col m-5">
          <VideoPlayer
            url={
              selectedVideo === -1
                ? ""
                : `${videoQueue[selectedVideo].video_files[0].link}`
            }
            title={
              selectedVideo === -1
                ? "No Video Slected"
                : `${selectedVideo + 1}. ${videoQueue[selectedVideo].text}-${
                    videoQueue[selectedVideo].id
                  }`
            }
          />
          <List queue={videoQueue} setSelectedVideo={setSelectedVideo} />
        </main>
      </Route>
    </Router>
  );
}

const List = ({ queue, setSelectedVideo }) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1200 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 1200, min: 800 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 800, min: 500 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 500, min: 0 },
      items: 1
    }
  };
  return (
    <>
      {queue.length > 0 && (
        <Container
          className="my-4 p-3 rounded-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
        >
          <h3 className="py-2 px-1 text-dark">Video Queue</h3>
          <Carousel className="py-1 bg-dar" responsive={responsive}>
            {queue.map((video, at) => (
              <Card
                key={at}
                className="bg-dark text-white m-1 border border-secondary border-3 rounded-3"
                onClick={() => setSelectedVideo(at)}
                style={{ cursor: "pointer" }}
              >
                <Card.Img
                  src={video.image}
                  alt="Thumbnail"
                  style={{ opacity: "0.5" }}
                />
                <Card.ImgOverlay className="">
                  <Card.Title>{`${at + 1}. ${video.text}-${
                    video.id
                  }`}</Card.Title>
                  <Card.Text>{video.user.name}</Card.Text>
                </Card.ImgOverlay>
              </Card>
            ))}
          </Carousel>
        </Container>
      )}
    </>
  );
};
