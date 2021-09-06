import _ from 'lodash'
import getConfig from 'next/config'
import { useRouter } from 'next/router'
import React, { ReactNode, useEffect, useState } from 'react'
import { Media, Player } from 'react-media-player'
// import Swiper core and required components
import SwiperCore, { A11y, Navigation, Pagination, Scrollbar } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import CustomPlayPause from '@/components/CustomPlayPause'
import ParallelDocument from '@/components/ParallelDoc'
import useLazyFetch from '@/hooks/useLazyFetch.hook'
import { PracticeType } from '@/pages/lesson/[id]'

import SwiperBullet from '../swiper/SwiperBullet'

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])

const { publicRuntimeConfig } = getConfig()

export default function CultureSong({
  ...props
}: {
  practice: PracticeType
  language: string
}): ReactNode {
  const practice = props.practice
  const [doFetch, response] = useLazyFetch(
    `${publicRuntimeConfig.api.host}/lesson/practice-detail`
  )
  const [data, setData] = useState([])
  const [triggerStop, setTriggerStop] = useState(0)

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
    <>
      <section></section>
      <section className="relative z-10 text-center">
        <div className="z-10 place-self-center text-2xl md:text-3xl lg:text-3xl xl:text-3xl">
          {data.length > 1 && (
            <SwiperBullet>
              <div className="swiper-pagination z-30"></div>
            </SwiperBullet>
          )}
        </div>
      </section>

      <div className="z-10 container mx-auto px-4 pb-40">
        <section className="relative z-10 mt-4 gap-4 bg-no-repeat bg-cover bg-white bg-opacity-75 p-4 rounded-lg text-blue-700">
          <section className="z-10">
            <Swiper
              spaceBetween={50}
              slidesPerView={1}
              pagination={{
                el: '.swiper-pagination',
                clickable: true,
                renderBullet: function (index, className) {
                  return (
                    '<div class="' + className + '">' + (index + 1) + '</div>'
                  )
                }
              }}
              onSlideChange={() => setTriggerStop(prev => prev + 1)}
              scrollbar={{ draggable: true }}>
              {data.map((item, index) => (
                <SwiperSlide key={index}>
                  <section className="pt-4 pb-20">
                    <section className="text-center">
                      <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-bold mt-0 whitespace-pre-wrap">
                        {item.title}
                      </h1>
                      <h1 className="text-1xl md:text-2xl lg:text-3xl xl:text-3xl font-bold mt-0 whitespace-pre-wrap text-gray-700">
                        {item.titleTranslated}
                      </h1>
                      <Media>
                        <div className="media pt-4">
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
                      <div className="flex flex-row mt-1 font-light">
                        <div className="pr-4 w-1/2">
                          <span className="uppercase">Tác giả</span>
                          <p className="text-2xl font-semibold pt-2">
                            {item.composer}
                          </p>
                        </div>
                        <div className="pr-4 w-1/2">
                          <span className="uppercase">Người thể hiện</span>
                          <p className="text-2xl font-semibold pt-2">
                            {item.performer}
                          </p>
                        </div>
                      </div>
                    </section>
                    <ParallelDocument
                      content={item.content}
                      contentTranslated={item.contentTranslated}
                    />
                  </section>
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
        </section>
      </div>
    </>
  )
}

// const CultureSongSection = styled.section`
//     ${tw`overflow-auto flex flex-col p- h-168 sm:flex-col md:flex-row lg:flex-row mt-4 text-4xl`}
// `
