import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import { withMediaProps } from 'react-media-player'
import styled from 'styled-components'

import PlayButton from './PlayButton'

const CustomPlayPause = ({ media, style, className, triggerStop }) => {
  const _handlePlayPause = () => {
    media.playPause()
  }
  useEffect(() => {
    media.stop()
  }, [triggerStop])
  return (
    <button
      type="button"
      className={className}
      style={style}
      onClick={_handlePlayPause}>
      <PlayButtonWrapper>
        {media.isPlaying ? (
          <div className="relative">
            <FontAwesomeIcon
              // className="h-6 block m-auto bg-flower-1"
              className="z-40 absolute"
              icon={faPause}
              size="sm"
            />
            <PlayButton></PlayButton>
          </div>
        ) : (
          <div className="relative">
            <FontAwesomeIcon
              className="z-40 absolute"
              icon={faPlay}
              size="lg"
            />
            <PlayButton></PlayButton>
          </div>
        )}
      </PlayButtonWrapper>
    </button>
  )
}

const PlayButtonWrapper = styled.div`
  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

export default withMediaProps(CustomPlayPause)
