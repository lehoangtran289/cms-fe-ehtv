import getConfig from "next/config";
import { useState } from "react";
import { DragObjectWithType, useDrag } from "react-dnd";
import styled from "styled-components";
import tw from "twin.macro";

const { publicRuntimeConfig } = getConfig();

interface Animation {
  name?: string
  delay?: number
  duration?: number
  times?: number
}

export interface WoodCardDragObject extends DragObjectWithType {
  value: string
}

export interface WoodCardCollectedProps {
  isDragging: boolean
}

export const WoodCardDragItemTypePrefix = "WOODCARD_";

interface WoodCardProps {
  content
  translated
  audio
  index
  playAudio?
}

function WoodCard(props: WoodCardProps) {
  const [{ isDragging }, dragRef] = useDrag<WoodCardDragObject,
    void,
    { isDragging: boolean }>({
    item: {
      type: `${WoodCardDragItemTypePrefix}${props.index}`,
      value: props.content
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  });

  const [animation, setAnimation] = useState({
    delay: props.index,
    name: "",
    duration: 0.2,
    times: 1
  });

  const bounce = e => {
    props.playAudio &&
    props.playAudio(
      new Audio(`${publicRuntimeConfig.api.resourceHost}${props.audio}`)
    );
    // reset opacity
    e.currentTarget.style.opacity = 1;

    // set animation
    setAnimation({ delay: 0.2, name: "bounce", duration: 0.5, times: 5 });

    // remove animation
    setTimeout(function() {
      setAnimation({ delay: null, name: "", duration: null, times: null });
    }, 3000);
  };

  return (
    <WoodCardWrapper
      name={animation.name}
      duration={animation.duration}
      delay={animation.delay}
      times={animation.times}
      data-title={props.translated}
      onClick={bounce}
      ref={dragRef}>
      <div>
        <span className="select-none whitespace-pre-wrap">{props.content}</span>
      </div>
    </WoodCardWrapper>
  );
}

const WoodCardWrapper = styled.span<Animation>`
  ${tw`relative inline-block h-12 z-1 opacity-100`}
  z-index: 10;
  margin-left: 30px;
  margin-top: 2rem;
  animation-name: ${props => props.name};
  animation-duration: ${props => `${props.duration}s`};
  animation-delay: ${props => `${props.delay * props.duration}s`};
  animation-iteration-count: ${props => props.times || 1};
  animation-fill-mode: forwards;
  margin-bottom: 0.5rem;
  cursor: pointer;

  &:hover::before {
    content: attr(data-title);
    position: absolute;
    z-index: 2;
    bottom: 100%;
    left: 8px;
    display: inline-block;
    padding: 3px 6px;
    border-radius: 5px;
    background: rgba(47, 153, 202, 0.829);
    color: #fff;
    font-size: 20px;
    font-family: 'Patrick Hand', cursive;
    white-space: pre-wrap;
  }

  &:hover::after {
    content: '';
    position: absolute;
    bottom: 85%;
    left: 8px;
    display: inline-block;
    color: #fff;
    border: 8px solid transparent;
    border-bottom: 8px solid #000;
  }

  & > div {
    /* background-image: url('/images/icons/wood-card-02.svg'); */
    color: #fff;
    background-color: #b39960;
    background-image: linear-gradient(to right, #b39960, #9a7d31);
    border-color: #6e3923;
    margin-top: 0.4rem;
    min-height: 55px;
    ${tw`inline-block bg-contain mx-8 px-6 border-b border-opacity-25 flex justify-center items-center sm:text-lg md:text-xl lg:text-xl xl:text-xl`}

    &::before {
      content: ' ';
      background-image: url('/images/icons/wood-card-01.svg');
      ${tw`bg-no-repeat bg-top bg-cover absolute top-0 left-0 w-10 h-16`}
    }

    &::after {
      content: ' ';
      background-image: url('/images/icons/wood-card-03.svg');
      ${tw`bg-no-repeat bg-top bg-cover absolute top-0 right-0 w-10 h-16`}
    }
  }
`;

export default WoodCard;
