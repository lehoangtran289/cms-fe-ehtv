import _ from 'lodash'
import getConfig from 'next/config'
import { useRouter } from 'next/router'
import React, { ReactNode, useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import useLazyFetch from '@/hooks/useLazyFetch.hook'
import { PracticeType } from '@/pages/lesson/[id]'

import ConversationReoderElement from '../ConversationReoderElement'
import SwiperBullet from '../swiper/SwiperBullet'

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
    if (response) {
      setData(response)
    }
  }, [response])

  return (
    <div className="pt-8">
      {/* <ConversationReoderElement conversation={data}></ConversationReoderElement> */}

      <section className="relative z-10 text-center">
        <div className="z-10 place-self-center text-2xl md:text-3xl lg:text-3xl xl:text-3xl">
          {data.length > 1 && (
            <SwiperBullet>
              <div className="swiper-pagination z-30"></div>
            </SwiperBullet>
          )}
        </div>
      </section>

      <section className="relative z-10">
        <section className="z-10">
          <Swiper
            navigation={false}
            className={'swiper-no-swiping'}
            spaceBetween={50}
            slidesPerView={1}
            preventClicks={false}
            preventClicksPropagation={false}
            pagination={{
              el: '.swiper-pagination',
              clickable: true,
              renderBullet: function (index, className) {
                return (
                  '<div class="' + className + '">' + (index + 1) + '</div>'
                )
              }
            }}
            scrollbar={{ draggable: true }}>
            {data.map((item, index) => (
              <SwiperSlide key={index}>
                <section className="pt-4 pb-20 z40">
                  <ConversationReoderElement
                    conversation={item}></ConversationReoderElement>
                </section>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      </section>
    </div>
  )
}
