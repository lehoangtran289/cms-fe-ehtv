import styled from "styled-components";
import tw from "twin.macro";

const FlowerButton = styled.button.attrs({
  className:
    "bg-no-repeat bg-contain bg-center flex flex-1 content-center justify-center w-full h-full transition ease-in-out duration-700 transform hover:scale-150 focus:outline-none"
})`
  & {
    background-image: url('/images/icons/flower.svg');
    span {
      ${tw`self-center uppercase text-xs md:text-xl xl:text-2xl font-bold text-center`}
      color: #dd7349;
    }
    img {
      ${tw`self-center w-4 md:w-10`}
    }
  }
`;

export default FlowerButton;
