import { useState } from "react";
import { DragObjectWithType, useDrag } from "react-dnd";
import styled from "styled-components";
import tw from "twin.macro";

interface Animation {
  name?: string
  delay?: number
  duration?: number
}

export interface PaperButtonDragObject extends DragObjectWithType {
  value: string
}

export interface PaperButtonCollectedProps {
  isDragging: boolean
}

export const PaperButtonDragItemTypePrefix = "PaperButton_";

function PaperButton({ content, translated, audio, index }) {
  const [{ isDragging }, dragRef] = useDrag<PaperButtonDragObject,
    void,
    { isDragging: boolean }>({
    item: { type: `${PaperButtonDragItemTypePrefix}${index}`, value: content },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  });

  const [animation, setAnimation] = useState({
    delay: index,
    name: "wood-bounce-in",
    duration: 0.3
  });

  const bounce = e => {
    // reset opacity
    e.currentTarget.style.opacity = 1;

    // set animation
    setAnimation({ delay: 0, name: "bounce", duration: 0.3 });

    // remove animation
    setTimeout(function() {
      setAnimation({ delay: null, name: "", duration: null });
    }, 300);
  };

  return (
    <PaperButtonWrapper
      name={animation.name}
      duration={animation.duration}
      delay={animation.delay}
      data-title={translated}
      onClick={bounce}
      ref={dragRef}>
      <div>
        <span className="select-none">{content}</span>
      </div>
    </PaperButtonWrapper>
  );
}

const PaperButtonWrapper = styled.span<Animation>`
  ${tw`relative inline-block h-12 z-1 opacity-0`}

  animation-name: ${props => props.name};
  animation-duration: ${props => `${props.duration}s`};
  animation-delay: ${props => `${props.delay * props.duration}s`};
  animation-fill-mode: forwards;
  margin-bottom: 0.5rem;
  cursor: pointer;

  &:hover::before {
    content: attr(data-title);
    position: absolute;
    z-index: 2;
    top: -26px;
    left: 8px;
    display: inline-block;
    padding: 3px 6px;
    border-radius: 5px;
    background: rgba(47, 153, 202, 0.829);
    color: #fff;
    font-size: 20px;
    font-family: 'Patrick Hand', cursive;
    white-space: nowrap;
  }

  &:hover::after {
    content: '';
    position: absolute;
    top: 10px;
    left: 8px;
    display: inline-block;
    color: #fff;
    border: 8px solid transparent;
    border-bottom: 8px solid #000;
  }

  & > div {
    /* background-image: url('/images/icons/paper.svg'); */
    color: #fff;
    font-size: 2rem;
    background-color: #b39960;
    background-image: linear-gradient(to right, #b39960 60%, #9d7d32);
    margin-top: 0.4rem;
    height: 2.45rem;
    border-color: #6e3923;
    ${tw`inline-block bg-contain mx-8 px-4 border-b border-opacity-25 flex justify-center items-center`}

    &::before {
      content: ' ';
      background-image: url('/images/icons/wood-card-01.svg');
      ${tw`bg-no-repeat bg-center bg-contain absolute top-0 left-0 w-10 h-full`}
    }

    &::after {
      content: ' ';
      background-image: url('/images/icons/wood-card-03.svg');
      ${tw`bg-no-repeat bg-center bg-contain absolute top-0 right-0 w-10 h-full`}
    }
  }
`;

export default PaperButton;
