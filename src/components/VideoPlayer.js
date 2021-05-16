import { useState, useRef } from "react";
import Reactplayer from "react-player";
import styles from "../styles/VideoPlayer.module.scss";
import { VideoControls } from "./VideoControls";

export const VideoPlayer = ({ url }) => {
  const videoRef = useRef(null);
  const videoWrapperRef = useRef(null);

  const [videoControls, setVideoControls] = useState({
    playing: false,
    muted: false,
    volume: 0.5,
    speed: 1
  });

  return (
    <main className={`${styles["VideoPlayerWrapper"]} bg-dark`}>
      <Reactplayer
        ref={videoRef}
        url={url}
        width="100%"
        height="100%"
        playing={videoControls.playing}
        muted={videoControls.muted}
        volume={videoControls.volume}
        playbackRate={videoControls.speed}
      />
      <VideoControls
        controls={videoControls}
        setControls={setVideoControls}
        videoRef={videoRef}
        videoWrapperRef={videoWrapperRef}
      />
    </main>
  );
};
