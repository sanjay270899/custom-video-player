import { useState } from "react";
import { Container, Row, Col, Badge } from "react-bootstrap";
import styles from "../styles/VideoControls.module.scss";
import {
  Forward10,
  FullScreen,
  Play,
  Pause,
  Replay10,
  VolumeHigh,
  VolumeMute,
  VolumeLow,
  VolumeMid
} from "../assets/Icons";
import { Slider } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import screenfull from "screenfull";

// Overriding the default color of Slider to White
const WhiteSlider = withStyles({
  root: {
    color: "white"
  }
})(Slider);

export const VideoControls = ({
  controls,
  setControls,
  videoRef,
  videoWrapperRef
}) => {
  // Volume Slider Visible on Hover
  const [volumeSlider, setVolumeSlider] = useState(false);

  // Funtion to Handle Play/Pause Button
  const handlePlayPause = () => {
    setControls({
      ...controls,
      playing: !controls.playing
    });
  };

  // Funtion to Handle Forward10 Button
  const handleForward10 = () => {
    videoRef.current.seekTo(videoRef.current.getCurrentTime() + 10);
  };

  // Funtion to Handle Replay10 Button
  const handleReplay10 = () => {
    videoRef.current.seekTo(videoRef.current.getCurrentTime() - 10);
  };

  // Funtion to Mute the Volume
  const handleMuted = () => {
    setControls({
      ...controls,
      muted: !controls.muted
    });
  };

  // Function to Handle Change in Volume
  const handleVolumeChange = (e, newVolume) => {
    setControls({
      ...controls,
      volume: newVolume / 100,
      muted: newVolume == 0 ? true : false
    });
  };

  // Function to Handle Commit in Volume
  const handleVolumeCommited = (e, newVolume) => {
    setControls({
      ...controls,
      volume: newVolume / 100,
      muted: newVolume == 0 ? true : false
    });
  };

  // Function to Handle Speed of Video
  const handleSpeed = () => {
    let newSpeed = controls.speed == 2 ? 0 : controls.speed;
    setControls({
      ...controls,
      speed: newSpeed + 0.25
    });
  };

  // Function to Handle FullScreen Button
  const handleFullScreen = () => {
    screenfull.toggle(videoWrapperRef.current);
  };

  return (
    <Container fluid className={styles["controls"]}>
      {/* TOP: Title */}
      <Row className="w-100">
        <Col className="fs-3 fw-bold">Title</Col>
      </Row>

      {/* BOTTOM: Controls */}
      <Row className="w-100">
        <Col className="">
          <Row className="mx-1">
            <Slider min={0} max={100} color="secondary" />
          </Row>
          <Row className="">
            <Col className="d-flex align-items-center">
              {/* CONTROL: Play/Pause */}
              <Icon onClick={() => handlePlayPause()}>
                {controls.playing ? <Pause /> : <Play />}
              </Icon>
              {/* CONTROL: Replay10 */}
              <Icon onClick={() => handleReplay10()}>
                <Replay10 />
              </Icon>
              {/* CONTROL: Forward10 */}
              <Icon onClick={() => handleForward10()}>
                <Forward10 />
              </Icon>
              {/* CONTROL: Volume */}
              <div
                className="d-flex"
                style={{ width: "150px" }}
                onMouseEnter={() => setVolumeSlider(true)}
                onMouseLeave={() => setVolumeSlider(false)}
              >
                <Icon onClick={() => handleMuted()}>
                  {controls.muted ? (
                    <VolumeMute />
                  ) : controls.volume < 0.33 ? (
                    <VolumeLow />
                  ) : controls.volume < 0.66 ? (
                    <VolumeMid />
                  ) : (
                    <VolumeHigh />
                  )}
                </Icon>
                {volumeSlider && (
                  <WhiteSlider
                    min={0}
                    max={100}
                    value={controls.muted ? 0 : controls.volume * 100}
                    onChange={handleVolumeChange}
                    onChangeCommitted={handleVolumeCommited}
                  />
                )}
              </div>
            </Col>
            <Col className="d-flex justify-content-end align-items-center fs-4">
              {/* CONTROL: Speed */}
              <Badge
                onClick={() => handleSpeed()}
                className={styles["speed-control"]}
              >
                {`${controls.speed}x`}
              </Badge>
              {/* CONTROL: FullScreen */}
              <Icon onClick={() => handleFullScreen()}>
                <FullScreen />
              </Icon>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

const Icon = ({ children, onClick }) => {
  return <span onClick={onClick}>{children}</span>;
};
