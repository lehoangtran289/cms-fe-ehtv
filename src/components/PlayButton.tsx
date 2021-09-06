import styled from "styled-components";
import tw from "twin.macro";

const PlayButton = styled.div`
  ${tw`animate-spin-5 bg-no-repeat bg-cover h-16 xl:h-24 w-16 xl:w-24 flex items-center justify-center cursor-pointer opacity-75`}
  background-image: url('/images/icons/flower-1.svg');
  &:hover {
    opacity: 1;
    color: #007aff;
  }
`;

export default PlayButton;
