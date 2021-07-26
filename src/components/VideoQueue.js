import Carousel from "react-multi-carousel";
import { Card, Container } from "react-bootstrap";
import { GAevent } from "../utils/GA";

export const VideoQueue = ({ videoQueue, setSelectedVideo, selectedVideo }) => {
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
      {videoQueue.length > 0 && (
        <Container
          className="my-4 p-3 rounded-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
        >
          <h3 className="py-2 px-1 text-dark">Video Queue</h3>
          <Carousel className="py-1 bg-dar" responsive={responsive}>
            {videoQueue.map((video, at) => (
              <Card
                key={at}
                className="bg-dark text-white m-1 rounded-3"
                onClick={() => {
                  setSelectedVideo(at);
                  GAevent({
                    category: "Click",
                    action: "Video Selected from Queue",
                    label: `At: ${at}`
                  });
                }}
                style={{
                  cursor: "pointer",
                  border:
                    selectedVideo == at ? "5px solid tomato" : "5px solid white"
                }}
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
