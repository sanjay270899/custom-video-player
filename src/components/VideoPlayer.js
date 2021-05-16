import Reactplayer from "react-player";
import styles from "../styles/VideoPlayer.module.scss";
import { Container, Row, Col } from "react-bootstrap";
import {
  Forward10,
  FullScreen,
  Play,
  Replay10,
  VolumeHigh
} from "../assets/Icons";
import { Slider } from "@material-ui/core";

export const VideoPlayer = ({ url }) => {
  return (
    <main className={styles["VideoPlayerWrapper"]}>
      <Reactplayer url={url} width="100%" height="100%" />
      <Container fluid className={styles["controls"]}>
        {/* TOP: Title */}
        <Row className="w-100">
          <Col className="fs-3 fw-bold">Title</Col>
        </Row>

        {/* BOTTOM: Controls */}
        <Row className="w-100">
          <Col className="">
            <Row className="mx-1">
              <Slider />
            </Row>
            <Row className="d-flex">
              <Col className="">
                <Play />
                <Replay10 />
                <Forward10 />
                <VolumeHigh />
              </Col>
              <Col className="col-2 d-flex flex-row-reverse">
                <FullScreen />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </main>
  );
};
