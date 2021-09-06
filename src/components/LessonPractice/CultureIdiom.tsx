import _ from 'lodash'
import getConfig from 'next/config'
import React, { ReactNode, useEffect, useState } from 'react'
// import Swiper core and required components
import SwiperCore, { A11y, Navigation, Pagination, Scrollbar } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import ParallelDocument from '@/components/ParallelDoc'
import useLazyFetch from '@/hooks/useLazyFetch.hook'
import { PracticeType } from '@/pages/lesson/[id]'

import SwiperBullet from '../swiper/SwiperBullet'

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])

const { publicRuntimeConfig } = getConfig()

export default function CultureIdiom({
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
      console.log(response)
    }
  }, [response])

  return (
    <>
      <section className="relative z-10 text-center pt-12">
        <div className="z-10 place-self-center text-2xl md:text-3xl lg:text-3xl xl:text-3xl">
          {data.length > 1 && (
            <SwiperBullet>
              <div className="swiper-pagination z-30" />
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
              scrollbar={{ draggable: true }}
              // // onSwiper={swiper => console.log(swiper)}
              onSlideChange={() => console.log('slide change')}>
              {data.map((item, index) => (
                <SwiperSlide key={index}>
                  <section className="pt-4 pb-20">
                    <ParallelDocument
                      content={item.content}
                      contentTranslated={item.contentTranslated}
                      title={item.title}
                      titleTranslated={item.titleTranslated}
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
