import styled from "styled-components";
import tw from "twin.macro";

interface HoverTypeAnswerProps {
  content
  handleClick
}

function HoverTypeAnswer(props: HoverTypeAnswerProps) {
  return (
    <HoverTypeAnswerWrapper>
      <button className="link_wrapper" onClick={props.handleClick}>
        <a>{props.content}</a>
        <div className="icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 268.832 268.832">
            <path
              d="M265.17 125.577l-80-80c-4.88-4.88-12.796-4.88-17.677 0-4.882 4.882-4.882 12.796 0 17.678l58.66 58.66H12.5c-6.903 0-12.5 5.598-12.5 12.5 0 6.903 5.597 12.5 12.5 12.5h213.654l-58.66 58.662c-4.88 4.882-4.88 12.796 0 17.678 2.44 2.44 5.64 3.66 8.84 3.66s6.398-1.22 8.84-3.66l79.997-80c4.883-4.882 4.883-12.796 0-17.678z" />
          </svg>
        </div>
      </button>
    </HoverTypeAnswerWrapper>
  );
}

const HoverTypeAnswerWrapper = styled.div`
  ${tw`cursor-pointer`}
  .wrapper {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .link_wrapper {
    position: relative;
    width: 200px;
  }

  a {
    display: block;
    width: 250px;
    height: 50px;
    line-height: 50px;
    font-weight: bold;
    text-decoration: none;
    background: #333;
    text-align: center;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 1px;
    border: 3px solid #333;
    transition: all 0.35s;
  }

  .icon {
    width: 50px;
    height: 50px;
    border: 3px solid transparent;
    position: absolute;
    transform: rotate(45deg);
    right: 0;
    top: 0;
    z-index: -1;
    transition: all 0.35s;
  }

  .icon svg {
    width: 30px;
    position: absolute;
    top: calc(50% - 15px);
    left: calc(50% - 15px);
    transform: rotate(-45deg);
    fill: #2ecc71;
    transition: all 0.35s;
  }

  a:hover {
    width: 200px;
    border: 3px solid #2ecc71;
    background: transparent;
    color: #2ecc71;
  }

  a:hover + .icon {
    border: 3px solid #2ecc71;
    right: -25%;
  }
`;

export default HoverTypeAnswer;
