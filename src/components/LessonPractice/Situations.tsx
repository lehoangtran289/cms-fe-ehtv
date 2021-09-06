import _ from 'lodash'
import getConfig from 'next/config'
import React, { ReactNode, useEffect, useState } from 'react'
import { Media, Player } from 'react-media-player'
import { Swiper, SwiperSlide } from 'swiper/react'

import CustomPlayPause from '@/components/CustomPlayPause'
import useLazyFetch from '@/hooks/useLazyFetch.hook'
import { PracticeType } from '@/pages/lesson/[id]'

import SwiperBullet from '../swiper/SwiperBullet'
import SwiperWrapper from '../swiper/SwiperWrapper'

const { publicRuntimeConfig } = getConfig()

export default function Situations({
  ...props
}: {
  practice: PracticeType
  language: string
}): ReactNode {
  const practice = props.practice

  const [doFetch, response] = useLazyFetch(
    `${publicRuntimeConfig.api.host}/lesson/practice-detail`
  )
  const [triggerStop, setTriggerStop] = useState(0)

  const [data, setData] = useState([
    {
      lessonId: 0,
      audio: '',
      dialog: [],
      image: '',
      dialogTranslate: []
    }
  ])

  useEffect(() => {
    if (!_.isEmpty(practice.id) && !_.isEmpty(props.language)) {
      doFetch({
        params: {
          lesson_practice_id: practice.id,
          language: props.language
        }
      })
      console.log('looking for practice ' + practice.practiceType)
    }
  }, [practice, props.language])

  useEffect(() => {
    if (response && response.data) {
      setData(response.data)
    }
  }, [response])

  return (
    <div className="container relative p-1 sm:p-1 md:p-4 mx-auto z-10 mb-40 bottom-14 top-0">
      <section className="z-40 ">
        <SwiperBullet>
          <div className="swiper-pagination z-30"></div>
        </SwiperBullet>
        <SwiperWrapper>
          <Swiper
            navigation={false}
            spaceBetween={50}
            slidesPerView={1}
            pagination={{
              el: '.swiper-pagination',
              clickable: true,
              renderBullet: function (index, className) {
                return data[index].lessonId && data[index].lessonId > 10
                  ? '<div class="' + className + '">' + (index + 1) + '</div>'
                  : index % 2 == 0
                  ? '<div class="' +
                    className +
                    '">' +
                    (index / 2 + 1) +
                    'a</div>'
                  : '<div class="' +
                    className +
                    '">' +
                    (Math.floor(index / 2) + 1) +
                    'b</div>'
              }
            }}
            scrollbar={{ draggable: true }}
            // // onSwiper={swiper => console.log(swiper)}
            onSlideChange={() => setTriggerStop(prev => prev + 1)}>
            {data.map((item, iIndex) => (
              <SwiperSlide key={iIndex}>
                <div className="z-40 bg-gray-600 bg-opacity-25 rounded-lg">
                  <div className="w-full pt-2">
                    <Media>
                      <div className="media">
                        <div className="media-player">
                          <Player
                            src={`${publicRuntimeConfig.api.resourceHost}${item.audio}`}
                          />
                        </div>
                        <div className="media-controls flex justify-center">
                          <CustomPlayPause triggerStop={triggerStop} />
                        </div>
                      </div>
                    </Media>
                  </div>
                  <section className="z-40 flex flex-1 flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row              ">
                    <div
                      className="w-full sm:w-full md:w-full lg:w-2/3 xl:w-2/3 tracking-wider
                        p-2
                      ">
                      {item.dialog.map((element, eIndex) => (
                        <div
                          key={eIndex}
                          className="text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl
                      bg-white bg-opacity-75 p-4 mt-4 rounded-lg
                    cursor-pointer transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                          <div className="font-semibold pt-2 text-blue-700">
                            - {element}
                          </div>
                          <div className="font-light italic pb-2 text-gray-800">
                            - {item.dialogTranslate[eIndex]}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="w-full sm:w-full md:w-full lg:w-1/3 xl:w-1/3 p-8">
                      <img
                        className="border-solid border-2 border-purple-700"
                        src={`${publicRuntimeConfig.api.resourceHost}${item.image}`}></img>
                    </div>
                  </section>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </SwiperWrapper>
      </section>
    </div>
  )
}
