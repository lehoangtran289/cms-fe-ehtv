import styled from "styled-components";
import tw from "twin.macro";

const HeavenBurnsRedCardInner = styled.div`
  ${tw`z-10 relative`}
  div,
span,
h3,
p,
img,
dl,
dt {
    margin: 0;
    /* padding: 0; */
    border: 0;
    outline: 0;
    vertical-align: baseline;
    background: transparent;
  }
  img {
    vertical-align: top;
    font-size: 0;
    line-height: 0;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-user-drag: none;
    -moz-user-drag: none;
    -ms-user-drag: none;
    /* width: 100%; */
    height: auto;
  }
  * {
    box-sizing: border-box;
  }
  .pc {
    display: block;
  }
  @media print, screen and (max-width: 1279px) {
    .pc {
      display: none;
    }
  }
  @media print, screen and (max-width: 1023px) {
    .pc {
      display: none;
    }
  }
  #messages {
    padding: 0 0 0;
  }
  #messages .messagesBox {
    width: 100%;
    margin: 0 auto;
    border: 4px solid rgba(255, 255, 255, 0.7);
    padding: 6px;
    box-sizing: border-box;
  }
  #messages .messagesBox .messagesBoxInr {
    width: 100%;
    border: 1px solid rgba(255, 255, 255, 0.5);
    padding: 8px;
  }
  #messages .messagesBox .messagesBoxInr .messagesBoxContents {
    width: 100%;
    position: relative;
    background: rgba(255, 255, 255, 0.84);
    border: 1px solid #cc0e70;
    padding: 30px 80px;
    box-sizing: border-box;
  }
  #messages .messagesBox .messagesBoxInr .messagesBoxContents h3 {
    margin-bottom: 20px;
  }
  #messages .messagesBox .messagesBoxInr .messagesBoxContents .messagesTitle {
    margin-bottom: 10px;
  }
  #messages .messagesBox .messagesBoxInr .messagesBoxContents .messagesText {
    font-weight: 400;
    line-height: 1.57;
    text-align: justify;
    text-justify: inter-ideograph;
    -ms-text-justify: inter-ideograph;
    padding-bottom: 20px;
  }
  #messages
    .messagesBox
    .messagesBoxInr
    .messagesBoxContents
    .messagesText
    span {
    display: block;
    padding-top: 5px;
    text-align: right;
  }
  #messages
    .messagesBox
    .messagesBoxInr
    .messagesBoxContents
    .messagesText
    span.sign01
    img {
    width: 203px;
  }
  #messages
    .messagesBox
    .messagesBoxInr
    .messagesBoxContents
    .messagesText
    span.sign02
    img {
    width: 203px;
    margin-top: -60px;
  }
  #messages
    .messagesBox
    .messagesBoxInr
    .messagesBoxContents
    .messagesText
    span.sign03
    img {
    width: 227px;
    margin-top: 12px;
  }
  #messages
    .messagesBox
    .messagesBoxInr
    .messagesBoxContents
    .messagesWorksTitle {
    padding: 0 0 0 22px;
    font-weight: 900;
    min-height: 28px;
    background: url('/images/backgrounds/heaven_burns_red_img_02.png') left
      bottom / 100% auto no-repeat;
    margin-bottom: 10px;
  }
  #messages
    .messagesBox
    .messagesBoxInr
    .messagesBoxContents
    .messagesWorksText {
    font-weight: 400;
  }
  @media print, screen and (max-width: 1279px) {
    #messages {
      padding: 5.86396vw 0 0;
    }
    #messages .messagesBox {
      width: 78.18608vw;
      margin: 0 auto 8.60047vw;
      border: 0.31274vw solid rgba(255, 255, 255, 0.7);
      padding: 0.46912vw;
    }
    #messages .messagesBox .messagesBoxInr {
      border: 0.07819vw solid rgba(255, 255, 255, 0.5);
      padding: 0.62549vw;
    }
    #messages .messagesBox .messagesBoxInr .messagesBoxContents {
      border: 0.07819vw solid #cc0e70;
      padding: 2.34558vw 11.41517vw;
    }
    #messages .messagesBox .messagesBoxInr .messagesBoxContents h3 {
      margin-bottom: 1.56372vw;
    }
    #messages .messagesBox .messagesBoxInr .messagesBoxContents .messagesTitle {
      margin-bottom: 0.78186vw;
    }
    #messages .messagesBox .messagesBoxInr .messagesBoxContents .messagesText {
      padding-bottom: 1.56372vw;
    }
    #messages
      .messagesBox
      .messagesBoxInr
      .messagesBoxContents
      .messagesText
      span {
      padding-top: 0.39093vw;
    }
    #messages
      .messagesBox
      .messagesBoxInr
      .messagesBoxContents
      .messagesText
      span.sign01
      img {
      width: 15.87177vw;
    }
    #messages
      .messagesBox
      .messagesBoxInr
      .messagesBoxContents
      .messagesText
      span.sign02
      img {
      width: 15.87177vw;
      margin-top: -3.51837vw;
    }
    #messages
      .messagesBox
      .messagesBoxInr
      .messagesBoxContents
      .messagesText
      span.sign03
      img {
      width: 17.74824vw;
    }
    #messages
      .messagesBox
      .messagesBoxInr
      .messagesBoxContents
      .messagesWorksTitle {
      padding: 0 0 0 1.72009vw;
      min-height: 2.18921vw;
      margin-bottom: 0.78186vw;
    }
    #messages
      .messagesBox
      .messagesBoxInr
      .messagesBoxContents
      .messagesWorksText {
    }
  }
  @media print, screen and (max-width: 1023px) {
    #messages {
      padding: 12.26667vw 0 0;
    }
    #messages .messagesBox {
      /* width: 99.33333vw; */
      margin: 0 auto 10.93333vw;
      border: 0.53333vw solid rgba(255, 255, 255, 0.7);
      padding: 0.8vw;
    }
    #messages .messagesBox .messagesBoxInr {
      border: 0.13333vw solid rgba(255, 255, 255, 0.5);
      padding: 1.06667vw;
    }
    #messages .messagesBox .messagesBoxInr .messagesBoxContents {
      border: 0.13333vw solid #cc0e70;
      padding: 4.4vw 3.66667vw;
    }
    #messages .messagesBox .messagesBoxInr .messagesBoxContents:before {
      width: 94.8vw;
      height: 2vw;
      background: url('https://heaven-burns-red.com/images/sp_messages_img03.png')
        center top / 94.8vw 2vw no-repeat;
      top: -4.66667vw;
      left: -4vw;
    }
    #messages .messagesBox .messagesBoxInr .messagesBoxContents:after {
      width: 94.8vw;
      height: 2vw;
      background: url('https://heaven-burns-red.com/images/sp_messages_img04.png')
        center bottom / 94.8vw 2vw no-repeat;
      bottom: -4.66667vw;
      left: -4vw;
    }
    #messages
      .messagesBox
      .messagesBoxInr
      .messagesBoxContents
      .messagesBoxContentsImg {
      margin-top: -3.73333vw;
      left: -0.4vw;
      width: 94.8vw;
      height: 7.46667vw;
      background: url('https://heaven-burns-red.com/images/sp_messages_img05.png')
        center center / 94.8vw 7.46667vw no-repeat;
    }
    #messages .messagesBox .messagesBoxInr .messagesBoxContents h3 {
      margin-bottom: 3.6vw;
    }
    #messages .messagesBox .messagesBoxInr .messagesBoxContents .messagesTitle {
      margin-bottom: 2.13333vw;
    }
    #messages .messagesBox .messagesBoxInr .messagesBoxContents .messagesText {
      line-height: 1.82;
      padding: 0 3.73333vw 3.73333vw;
    }
    #messages
      .messagesBox
      .messagesBoxInr
      .messagesBoxContents
      .messagesText
      span {
      padding-top: 2.66667vw;
    }
    #messages
      .messagesBox
      .messagesBoxInr
      .messagesBoxContents
      .messagesText
      span.sign01
      img {
      width: 43.33333vw;
    }
    #messages
      .messagesBox
      .messagesBoxInr
      .messagesBoxContents
      .messagesText
      span.sign02
      img {
      width: 43.33333vw;
      margin-top: -7vw;
    }
    #messages
      .messagesBox
      .messagesBoxInr
      .messagesBoxContents
      .messagesText
      span.sign03
      img {
      width: 43.33333vw;
    }
    #messages
      .messagesBox
      .messagesBoxInr
      .messagesBoxContents
      .messagesWorksTitle {
      padding: 1.32vw 0 0 3.73333vw;
      min-height: 7.33333vw;
      background: url('https://heaven-burns-red.com/images/sp_messages_img02.png')
        left bottom / 100% auto no-repeat;
      margin-bottom: 1.06667vw;
    }
    #messages
      .messagesBox
      .messagesBoxInr
      .messagesBoxContents
      .messagesWorksText {
      padding: 0 2.73333vw;
      box-sizing: border-box;
    }
  }
  @media print, screen and (min-width: 768px) and (max-width: 1023px) {
    #messages .messagesBox .messagesBoxInr .messagesBoxContents .messagesText {
      line-height: 1.82;
      padding: 0 3.73333vw 3.73333vw;
    }
    #messages
      .messagesBox
      .messagesBoxInr
      .messagesBoxContents
      .messagesWorksTitle {
      padding: 1.32vw 0 0 3.73333vw;
      min-height: 7.33333vw;
      background: url('https://heaven-burns-red.com/images/sp_messages_img02.png')
        left bottom / 100% auto no-repeat;
      margin-bottom: 1.06667vw;
    }
    #messages
      .messagesBox
      .messagesBoxInr
      .messagesBoxContents
      .messagesWorksTitle {
      padding: 1.32vw 0 0 3.73333vw;
      min-height: 7.33333vw;
      background: url('https://heaven-burns-red.com/images/sp_messages_img02.png')
        left bottom / 100% auto no-repeat;
      margin-bottom: 1.06667vw;
    }
    #messages
      .messagesBox
      .messagesBoxInr
      .messagesBoxContents
      .messagesWorksText {
      padding: 0 2.73333vw;
      box-sizing: border-box;
    }
  }
  .messagesBox {
    opacity: 0;
  }
  .messagesBox.active {
    animation: slideBottom 1.5s ease 0.2s forwards;
  }
  /*! CSS Used keyframes */
  @keyframes slideBottom {
    0% {
      transform: translateY(10%);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;
export default HeavenBurnsRedCardInner;
