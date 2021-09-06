import ReactHtmlParser from 'html-react-parser'
import _ from 'lodash'
import getConfig from 'next/config'
import React, { ReactNode, useEffect, useState } from 'react'
import Select from 'react-select'
import styled from 'styled-components'
import swal from 'sweetalert'
import { Swiper, SwiperSlide } from 'swiper/react'

import useLazyFetch from '@/hooks/useLazyFetch.hook'
import { PracticeType } from '@/pages/lesson/[id]'

import SwiperBullet from '../swiper/SwiperBullet'
import SwiperWrapper from '../swiper/SwiperWrapper'

const { publicRuntimeConfig } = getConfig()

const bravo = '/audio/correct.mp3'
const failed = '/audio/wrong.mp3'

function FormatListContent(
  content: string,
  search: string,
  replaceWith: string
) {
  return content.split(search).join(replaceWith)
}

function FillConv(props): JSX.Element {
  console.log()
  const quest = []
  props.questions.forEach(element => {
    const line = FormatListContent(element.content, '*', '_')
    quest.push(line)
  })

  const opti = []
  let count = 0
  props.answers.forEach(element => {
    const obj = { value: element, label: element, position: count }
    opti.push(obj)
    count += 1
  })

  function playSound(url) {
    const audio = new Audio(url)
    audio.play()
  }

  const check = []

  function showResult() {
    if (check.length > props.answers.length - 1) {
      playSound(bravo)
      swal('YEAH, ĐÚNG RỒI!', 'BẠN THẬT TÀI NĂNG', 'success')
    } else {
      playSound(failed)
      swal('ÔI SAI RỒI!', 'KIỂM TRA LẠI ĐÁP ÁN NÀO !', 'error')
    }
  }

  function formatQuestion(content: string, order: number): string {
    let res = ''
    for (let i = 0; i < content.length; i++) {
      if (content.charAt(i) === '*') {
        res += '<b>(' + order++ + ')</b>'
      } else {
        res += content.charAt(i)
      }
    }
    return res
  }

  function SelectHandleRoot(answer, event) {
    if (event.value == answer) {
      check.push(true)
    }
  }

  let answerCounting = 1
  return (
    <div className="py-2 leading-tight text-xl text-justify">
      <div>
        <section className="mt-4 flex flex-col-reverse lg:flex-row p-4">
          <section className="z-40 m-2 w-full lg:w-3/4">
            <div
              className="text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl
                bg-white bg-opacity-75 p-4 mt-4 rounded-lg border-gray-700 border-dashed border-4
                ">
              <div className="inline-block text-yellow-800 text-2xl">
                <img
                  src="/images/icons/unicorn_require.svg"
                  className="h-16 w-16 animate-vibrate-1 inline-block"
                />
                Bé ơi !!! Chọn đáp án đúng đi !!!
              </div>
              <br></br>
              {React.Children.toArray(
                props.answerSupport.content.map((contents, contentIndex) => (
                  <div>
                    {contents.content.replaceAll('*', ' _____________ ')}
                  </div>
                ))
              )}
            </div>
            {React.Children.toArray(
              props.answerSupport.content.map((contents, contentIndex) => (
                <div
                  className="text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl
                bg-white bg-opacity-75 p-4 mt-4 rounded-lg
                ">
                  {ReactHtmlParser(
                    formatQuestion(contents.content, answerCounting)
                  )}
                  {React.Children.toArray(
                    contents.answer
                      ? contents.answer.map((answer, answerIndex) => (
                          <div className="">
                            <Select
                              defaultValue={{
                                label: answerCounting++ + '...',
                                value: 0
                              }}
                              options={opti}
                              onChange={e => SelectHandleRoot(answer, e)}
                            />
                            <br />
                          </div>
                        ))
                      : ''
                  )}
                </div>
              ))
            )}
          </section>

          <section className="z-1 w-full lg:w-1/4 p-4">
            <button className="learn-more" onClick={showResult}>
              Nộp Bài Nào
            </button>
          </section>
        </section>
      </div>
    </div>
  )
}

export default function FillConversation({
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
  const [answer, setAnswers] = useState([])

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
      data.forEach(element => {
        const tmp = []
        for (const key in element.listContent) {
          tmp.push(
            FormatListContent(element.listContent[key].content, '*', '__')
          )
        }
      })
    }
    if (response && response.answer) {
      setAnswers(response.answer)
    }
  }, [response])

  return (
    <div className="container relative p-1 sm:p-1 md:p-4 mx-auto z-40 mb-40 bottom-14 top-0">
      <section className="z-40 ">
        <SwiperBullet>
          <div className="swiper-pagination z-30" />
        </SwiperBullet>
        <SwiperWrapper>
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
            scrollbar={{ draggable: true }}
            // // onSwiper={swiper => console.log(swiper)}
            // onSlideChange={() => console.log('slide change')}
          >
            {data.map((item, iIndex) => (
              <SwiperSlide key={iIndex} className="swiper-no-swiping">
                <div className="z-40 bg-gray-600 bg-opacity-25 rounded-lg">
                  <section className="z-40 flex flex-1 flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row">
                    <div
                      className="w-full sm:w-full md:w-full lg:w-3/3 xl:w-3/3 tracking-wider
                        p-2 flex flex-col lg:flex-row
                      ">
                      <section className="mt-4 lg:w-full">
                        <section className="z-50">
                          <FillConv
                            questions={item.listContent}
                            answerSupport={answer[iIndex]}
                            answers={item.listAnswer}
                            page={iIndex}
                          />
                        </section>
                        {/* <section className="z-1 hidden lg:block lg:w-1/4">
                          <Bird>
                            <div className="globe">
                              <div className="bird">
                                <div className="body">
                                  <div className="eye left"></div>
                                  <div className="eye right"></div>
                                  <div className="beak">
                                    <div></div>
                                  </div>
                                  <div className="feet"></div>
                                  <div className="wire"></div>
                                </div>
                                <div className="hills"></div>
                                <div className="cloud"></div>
                                <div className="cloud small"></div>
                              </div>
                            </div>
                          </Bird>
                        </section> */}
                      </section>
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
