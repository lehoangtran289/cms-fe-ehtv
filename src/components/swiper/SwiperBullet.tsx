import styled from "styled-components";
import tw from "twin.macro";

const SwiperBullet = styled.div`
  ${tw``}
  .swiper-pagination-bullet {
    ${tw`cursor-pointer text-xl pt-2 xl:pt-4 bg-no-repeat text-center content-center bg-transparent bg-contain bg-center content-center transition ease-in-out duration-700 transform hover:scale-150 focus:outline-none h-12 xl:h-16 w-12 xl:w-16`}
    background-image: url('/images/icons/flower.svg');
  }
  .swiper-pagination {
    ${tw`py-4`}
    position: relative;
  }
`;
export default SwiperBullet;
