import _ from 'lodash'
import getConfig from 'next/config'
import React, { ReactNode, useEffect, useState } from 'react'
import Zoom from 'react-reveal/Zoom'

import WoodCard from '@/components/WoodCard'
import useLazyFetch from '@/hooks/useLazyFetch.hook'
import { PracticeType } from '@/pages/lesson/[id]'

const { publicRuntimeConfig } = getConfig()

export default function Memories({
  ...props
}: {
  practice: PracticeType
  language: string
}): ReactNode {
  const practice = props.practice

  const [doFetch, response] = useLazyFetch(
    `${publicRuntimeConfig.api.host}/lesson/practice-detail`
  )
  const [woodCards, setWoodCards] = useState([])
  const [audio, setAudio] = useState(null)

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
      setWoodCards(response.data)
    }
  }, [response])

  const playAudio = newAudio => {
    if (audio) {
      audio.pause()
      audio.currentTime = 0
    }
    setAudio(newAudio)
  }

  useEffect(() => {
    audio && audio.play()
  }, [audio])

  return (
    <div className=" pt-16 sm:pt-4 md:pt-24 lg:pt-24 pb-20">
      <Zoom className="relative z-40">
        <div className="container mb-40 relative  z-20 text-center w-full sm:w-full md:w-3/4 lg:w-2/3 pb-80">
          {woodCards.map((item, index) => (
            <WoodCard
              index={index}
              key={item.id}
              content={item.content}
              translated={item.contentTranslate}
              audio={item.audio}
              playAudio={playAudio}
            />
          ))}
        </div>
      </Zoom>
    </div>
  )
}
