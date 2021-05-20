import { useState, useRef } from "react";
import Reactplayer from "react-player";
import styles from "../styles/VideoPlayer.module.scss";
import { VideoControls } from "./VideoControls";

export const VideoPlayer = ({ url, title }) => {
  const videoRef = useRef(null);
  const videoWrapperRef = useRef(null);

  const [controlsVisibility, setControlsVisibility] = useState(false);

  const [videoControls, setVideoControls] = useState({
    playing: false,
    muted: false,
    volume: 0.5,
    speed: 1,
    played: 0,
    seeking: false,
    isFullScreen: false
  });

  const handleOnHover = () => {
    if (!controlsVisibility) {
      setControlsVisibility(true);
      setTimeout(() => setControlsVisibility(false), 3000);
    }
  };

  // Function to handle OnProgress of Video
  const handleOnProgress = state => {
    if (!videoControls.seeking) {
      setVideoControls({ ...videoControls, played: state.played });
    }
  };

  // Function to handle onClick on video player wrapper
  const handleOnClick = () => {
    if (!controlsVisibility)
      setVideoControls(current => ({
        ...current,
        playing: !current.playing
      }));
  };

  return (
    <section
      className={`${styles["VideoPlayerWrapper"]} bg-dark`}
      onMouseMove={() => handleOnHover()}
      ref={videoWrapperRef}
      onClick={() => handleOnClick()}
    >
      <Reactplayer
        ref={videoRef}
        url={url}
        width="100%"
        height="100%"
        playing={videoControls.playing}
        muted={videoControls.muted}
        volume={videoControls.volume}
        playbackRate={videoControls.speed}
        onProgress={state => handleOnProgress(state)}
        onEnded={() => setVideoControls({ ...videoControls, playing: false })}
      />
      {controlsVisibility && (
        <VideoControls
          controls={videoControls}
          setControls={setVideoControls}
          videoRef={videoRef}
          videoWrapperRef={videoWrapperRef}
          title={title}
        />
      )}
    </section>
  );
};
