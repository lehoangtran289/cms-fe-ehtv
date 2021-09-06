import classNames from "classnames";
import { useCallback, useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import ReactPlayer from "react-player";
import Fade from "react-reveal/Fade";
import styled from "styled-components";

const RecordReplayButton = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const {
    startRecording: record,
    stopRecording,
    mediaBlobUrl
  } = useReactMediaRecorder({ audio: true });

  const startRecording = () => {
    if (isPlaying) return;

    if (isRecording) {
      stopRecording();
      setIsRecording(false);
      return;
    }
    record();
    setIsRecording(true);
    // setTimeout(() => {
    //   stopRecording()
    //   setIsRecording(false)
    // }, 3000)
  };

  const playRecord = () => {
    if (isRecording || isPlaying) return;
    setIsPlaying(true);
  };

  const getSrcReplay = useCallback(() => {
    if (isPlaying) return "/images/icons/replay-blu.png";
    else if (isRecording) return "/images/icons/replay-red.png";
    return "/images/icons/replay.png";
  }, [isPlaying, isRecording]);

  const getSrcRecord = useCallback(() => {
    if (isPlaying) return "/images/icons/record-red.png";
    else if (isRecording) return "/images/icons/pause.png";
    return "/images/icons/record.png";
  }, [isPlaying, isRecording]);

  return (
    <Fade right>
      <section className="fixed inset-x-0 bottom-0 z-40 lg:z-10">
        <RecordReplayButtonWrapper>
          <button
            onClick={playRecord}
            className={classNames(
              "w-1/3 md:w-1/5 absolute ml-4 -bottom-4 sm:-bottom-8 md:-bottom-8 lg:-bottom-8 xl:-bottom-12 right-1 sm:right-2 md:right-4 lg:right-4 xl:right-8 cursor-pointer z-20 h-40 sm:h-72 md:h-72 lg:h-72 xl:h-96",
              { red: isRecording, blue: isPlaying }
            )}>
            <img src={getSrcReplay()} />
          </button>
          <button
            onClick={startRecording}
            className={classNames(
              "w-1/3 md:w-1/5 absolute -bottom-4 sm:-bottom-8 md:-bottom-8 lg:-bottom-8 xl:-bottom-10 right-6 sm:right-10 md:right-12 lg:right-12 xl:right-20 cursor-pointer z-10 h-48 sm:h-84 md:h-84 lg:h-84 xl:h-108",
              { red: isPlaying, blue: isRecording }
            )}>
            <img src={getSrcRecord()} />
          </button>
          <ReactPlayer
            url={mediaBlobUrl}
            autoPlay
            playing={isPlaying}
            onEnded={() => setIsPlaying(false)}
          />
        </RecordReplayButtonWrapper>
      </section>
    </Fade>
  );
};

const RecordReplayButtonWrapper = styled.div`
  & > img {
    &:hover {
      -webkit-filter: drop-shadow(0px 0px 10px blue) !important;
      filter: drop-shadow(0px 0px 10px blue) !important;
    }
    &.red {
      -webkit-filter: drop-shadow(0px 0px 10px red) !important;
      filter: drop-shadow(0px 0px 10px red) !important;
    }
    &.blue {
      -webkit-filter: drop-shadow(0px 0px 10px blue) !important;
      filter: drop-shadow(0px 0px 10px blue) !important;
    }
  }
`;

export default RecordReplayButton;
