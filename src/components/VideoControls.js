// Libraries
import { useState } from "react";
import { Container, Row, Col, Badge } from "react-bootstrap";
import { Slider } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import screenfull from "screenfull";

// Assets
import {
  Forward10,
  FullScreen,
  Play,
  Pause,
  Replay10,
  VolumeHigh,
  VolumeMute,
  VolumeLow,
  VolumeMid,
  FullScreenExit
} from "../assets/Icons";
import { formatTime } from "../assets/Helper.js";

// Styles
import styles from "../styles/VideoControls.module.scss";
import { GAevent } from "../utils/GA";

// Overriding the default color of Slider with White
const WhiteSlider = withStyles({
  root: {
    color: "white"
  }
})(Slider);

export const VideoControls = ({
  controls,
  setControls,
  videoRef,
  videoWrapperRef,
  title
}) => {
  // Volume Slider Visible on Hover
  const [volumeSlider, setVolumeSlider] = useState(false);

  // Number of seconds video already played
  const currentSeconds = videoRef.current
    ? videoRef.current.getCurrentTime()
    : 0;
  // Total number of seconds in video
  const totalSeconds = videoRef.current ? videoRef.current.getDuration() : 0;

  // In hh:mm:ss format
  const currentTime = formatTime(currentSeconds);
  const totalTime = formatTime(totalSeconds);

  // Funtion to Handle Play/Pause Button
  const handlePlayPause = () => {
    setControls({
      ...controls,
      playing: !controls.playing
    });

    GAevent({
      category: "Player",
      action: `Video ${controls.playing ? "Paused" : "Played"}`
    });
  };

  // Funtion to Handle Forward10 Button
  const handleForward10 = () => {
    videoRef.current.seekTo(videoRef.current.getCurrentTime() + 10);

    GAevent({
      category: "Player",
      action: "Video Forward10"
    });
  };

  // Funtion to Handle Replay10 Button
  const handleReplay10 = () => {
    videoRef.current.seekTo(videoRef.current.getCurrentTime() - 10);

    GAevent({
      category: "Player",
      action: "Video Replay10"
    });
  };

  // Funtion to Mute the Volume
  const handleMuted = () => {
    setControls({
      ...controls,
      muted: !controls.muted
    });

    GAevent({
      category: "Player",
      action: `Video ${controls.muted ? "Unmuted" : "Muted"}`
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
    setControls({
      ...controls,
      isFullScreen: !controls.isFullScreen
    });

    GAevent({
      category: "Player",
      action: `Video Fullscreen ${controls.isFullScreen ? "Exit" : "Enter"}`
    });
  };

  // Function to Handle Video Seekbar Slider Change
  const handleSeekbarChange = (e, newPlayed) => {
    setControls({
      ...controls,
      played: newPlayed / 100
    });
    videoRef.current.seekTo(newPlayed / 100, "fraction");
  };

  // Function to Handle Mouse Down on Video Seekbar Slider
  const handleSeekbarMouseDown = () => {
    setControls({
      ...controls,
      seeking: true
    });
  };

  // Function to Handle Mouse Up on Video Seekbar Slider
  const handleSeekbarMouseUp = (e, newPlayed) => {
    setControls({
      ...controls,
      seeking: false
    });
    videoRef.current.seekTo(newPlayed / 100, "fraction");
  };

  // Function to Handle onClick on controls-overlay
  const handleOverlayOnClick = e => {
    if (e.target.getAttribute("name") === "controls-overlay") {
      setControls(current => ({ ...current, playing: !current.playing }));
    }
  };

  return (
    <Container
      fluid
      className={styles["controls-overlay"]}
      onClick={e => handleOverlayOnClick(e)}
      name="controls-overlay"
    >
      {/* TOP: Title */}
      <Row className={`w-100 ${styles["title"]}`}>
        {!controls.playing && (
          <Col className="fs-3 fw-bold" name="controls-overlay">
            {title}
          </Col>
        )}
      </Row>

      {/* BOTTOM: Controls */}
      <Row className={`w-100 ${styles["controls"]}`}>
        <Col className="">
          <Row className="mx-1">
            <Slider
              min={0}
              max={100}
              color="secondary"
              value={controls.played * 100}
              onChange={handleSeekbarChange}
              onMouseDown={handleSeekbarMouseDown}
              onChangeCommitted={handleSeekbarMouseUp}
              valueLabelDisplay="auto"
              scale={x => parseInt((totalSeconds * x) / 100)}
            />
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
              <span
                className="d-flex align-items-center"
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
                  <span
                    style={{ width: "100px", marginRight: "1rem" }}
                    className="d-flex"
                  >
                    <WhiteSlider
                      min={0}
                      max={100}
                      value={controls.muted ? 0 : controls.volume * 100}
                      onChange={handleVolumeChange}
                      onChangeCommitted={handleVolumeCommited}
                    />
                  </span>
                )}
              </span>
              <span>{`${currentTime} / ${totalTime}`}</span>
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
                {controls.isFullScreen ? <FullScreenExit /> : <FullScreen />}
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
