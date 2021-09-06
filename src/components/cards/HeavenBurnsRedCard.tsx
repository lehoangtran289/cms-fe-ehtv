import { ReactNode } from "react";

import HeavenBurnsRedCardInner from "./HeavenBurnsRedCardInner";

function HeavenBurnsRedCard(props: {
  elements: {
    contentTranslate: ReactNode
    subTitle: ReactNode
    subText: ReactNode
    mainTitle: ReactNode
    mainText: ReactNode
    content: ReactNode
  }[]
  image: string
  key: number
}): JSX.Element {
  if (props.image) {
    return (
      <HeavenBurnsRedCardInner>
        <img
          className="bg-no-repeat bg-cover bg-center absolute transform translate-y-32 rotate-0 animate-up-down w-20 md:w-20 lg:w-20 left-0 -top-8 z-20"
          src="/images/icons/bee.svg"
        />
        <div id="messages" className="z-40">
          <div className="messagesBox active">
            <div className="messagesBoxInr">
              <div
                className="messagesBoxContents overflow-x-hidden overflow-y-auto sm:h-80 md:h-132 lg:h-144 xl:h-168 sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl">
                <div className="flex flex-1 flex-col lg:flex-row xl:flex-row">
                  <div className="w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 p-4">
                    <dl>
                      {props.elements.map((item, index) => (
                        <>
                          <dt className="messagesWorksText">
                            {item.contentTranslate}
                          </dt>

                          <dt className="messagesTitle">{item.subTitle}</dt>
                          <dt className="messagesText">{item.subText}</dt>
                          <dt className="messagesWorksTitle">
                            {item.mainTitle}
                          </dt>
                          <dt className="messagesWorksText">{item.mainText}</dt>
                          <dt className="messagesWorksText">{item.content}</dt>
                        </>
                      ))}
                    </dl>
                  </div>
                  <div className="p-4 sm:w-full md:w-full lg:w-1/2 xl:w-1/2">
                    <img src={props.image} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </HeavenBurnsRedCardInner>
    );
  } else {
    <HeavenBurnsRedCardInner>
      <div id="messages" className="z-40">
        <div className="messagesBox active">
          <div className="messagesBoxInr">
            <div
              className="messagesBoxContents overflow-x-hidden overflow-y-auto sm:h-80 md:h-132 lg:h-144 xl:h-168 sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl">
              <div className="flex flex-1">
                <div className="w-full">
                  <dl>
                    {props.elements.map((item, index) => (
                      <>
                        <dt className="messagesWorksText">
                          {item.contentTranslate}
                        </dt>

                        <dt className="messagesTitle">{item.subTitle}</dt>
                        <dt className="messagesText">{item.subText}</dt>
                        <dt className="messagesWorksTitle">{item.mainTitle}</dt>
                        <dt className="messagesWorksText">{item.mainText}</dt>
                        <dt className="messagesWorksText">{item.content}</dt>
                      </>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HeavenBurnsRedCardInner>;
  }
}

export default HeavenBurnsRedCard;
