import styled from "styled-components";
import tw from "twin.macro";

const SituationSentence = styled.div`
  ${tw`
    mt-4 z-20 bg-white bg-opacity-50 rounded-lg p-4 cursor-pointer
    transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg
  `}
`;

export default SituationSentence;
