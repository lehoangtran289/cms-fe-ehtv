import styled from "styled-components";
import tw from "twin.macro";

const TextBox = styled.section.attrs({
  className:
    "container mx-auto relative z-1 flex justify-center items-center bg-transparent bg-no-repeat bg-contain bg-center h-96 md:h-120 lg:h-156"
})`
  &::before {
    content: '';
    background-image: url('/images/box.svg');
    ${tw`-z-1 absolute inset-0 bg-no-repeat bg-contain bg-center`}
  }

  & > div {
    ${tw`w-56 md:w-80 lg:w-108 h-56 md:h-80 lg:h-96 overflow-y-auto overscroll-contain text-justify tracking-wider leading-normal text-sm md:text-lg`}
  }

  & > div > p {
    ${tw`mb-2`}
  }
`;

export default TextBox;
