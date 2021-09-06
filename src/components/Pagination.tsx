import styled from "styled-components";
import tw from "twin.macro";

const Pagination = styled.div`
  & > ul {
    ${tw`flex pl-0 rounded list-none flex-wrap items-center justify-center`}
  }
  & > ul > li {
    ${tw`cursor-pointer`}
  }
  & > ul > li > button {
    ${tw`first:ml-0 font-semibold flex mx-2 p-2 rounded items-center justify-center leading-tight relative border border-solid bg-white tracking-widest cursor-pointer`}
  }
`;

export default Pagination;
