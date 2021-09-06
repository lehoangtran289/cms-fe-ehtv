import styled from "styled-components";
import tw from "twin.macro";

// interface GradientBorderProps {
//     color?: string !important;
//     size?: number !important;
//     background?: string !important;
//     borderWidth?: number !important;
// }

const ScrollBar = styled.section`
  ${tw``}
  * {
    ::-webkit-scrollbar {
      background-color: transparent !important;
      width: 10px !important;
      border-radius: 10px !important;
      display: inherit !important;
    }

    /* background of the scrollbar except button or resizer */

    ::-webkit-scrollbar-track {
      border-radius: 25px !important;
      background-color: transparent !important;
    }

    ::-webkit-scrollbar-track:hover {
      background-color: rgba(186, 223, 238, 0.1) !important;
      border-radius: 25px !important;
    }

    /* scrollbar itself */

    ::-webkit-scrollbar-thumb {
      background-color: #4682b44a !important;
      border-radius: 25px !important;
      /* border: 5px solid #fff */
    }

    ::-webkit-scrollbar-thumb:hover {
      background-color: rgb(1, 103, 187) !important;
    }

    /* set button(top and bottom of the scrollbar) */

    ::-webkit-scrollbar-button {
      display: none !important;
    }
  }
`;

export default ScrollBar;
