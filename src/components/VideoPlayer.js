import Reactplayer from "react-player";
import styles from "../styles/VideoPlayer.module.scss";

export const VideoPlayer = ({ url }) => {
  return (
    <div className={styles["VideoPlayerWrapper"]}>
      <Reactplayer url={url} />
      <div className={styles["controls"]}></div>
    </div>
  );
};
