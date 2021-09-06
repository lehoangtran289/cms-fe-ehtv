import _ from 'lodash'
import getConfig from 'next/config'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import swal from 'sweetalert'

import LessonLayout from '@/components/LessonLayout'
import LessonPractice from '@/components/LessonPractice'
import LessonNextButton from '@/components/LessonPractice/LessonNextButton'
import LessonPrevButton from '@/components/LessonPractice/LessonPrevButton'
import useLazyFetch from '@/hooks/useLazyFetch.hook'
import { languages } from '@/utils/config'
import { PAGE_LANGUAGE } from '@/utils/LocalStorageKey'

const { publicRuntimeConfig } = getConfig()

export type PracticeType = {
  id: string
  lessonId: string
  practiceName: string
  practiceNameTranslated: string
  practiceOrder: number
  practiceHelp: string
  practiceHelpTranslated: string
  practiceType: string
  language: string
  hasRecorder: boolean
}

export default function Practice(): JSX.Element {
  const router = useRouter()
  const [doFetch, response] = useLazyFetch(
    `${publicRuntimeConfig.api.host}/lesson/practice-all`
  )
  const [lessonId, setLessonId] = useState(null)
  const [language, setLanguage] = useState(null)
  const [currentPracticeIndex, setCurrentPracticeIndex] = useState(0)
  const [practices, setPractices] = useState<PracticeType[]>([])

  useEffect(() => {
    // console.log('queryId ' + router.query['id'])
    if (router.query['id']) {
      setLessonId(parseInt(router.query['id'] as string))
    }
  }, [router.query['id']])

  useEffect(() => {
    setLanguage(
      localStorage.getItem(PAGE_LANGUAGE)
        ? localStorage.getItem(PAGE_LANGUAGE)
        : languages[0].languageCode
    )
  }, [])

  useEffect(() => {
    if (lessonId && language) {
      doFetch({
        params: {
          lesson_id: lessonId,
          language: language
        }
      })
    }
    console.log('call lesson/practice-all with ' + lessonId + ' ' + language)
  }, [lessonId, language])

  useEffect(() => {
    if (response && response?.length > 0) {
      setPractices(response)
      // console.log('change response ' + response[0].practiceName)
    }
  }, [response])

  const handlePrev = () => {
    if (currentPracticeIndex <= 0) {
      setCurrentPracticeIndex(0)
      router.push('/lesson')
    } else {
      setCurrentPracticeIndex(currentPracticeIndex - 1)
    }
  }

  const handleNext = () => {
    if (currentPracticeIndex >= practices.length - 1) {
      setCurrentPracticeIndex(0)
      router.push('/lesson')
    } else {
      setCurrentPracticeIndex(currentPracticeIndex + 1)
    }
  }

  const handleChangeLanguage = languageCode => {
    setLanguage(languageCode)
    localStorage.setItem(PAGE_LANGUAGE, languageCode)
    console.log('change language to ' + languageCode)
  }

  const handleHelpClick = () => {
    swal(
      `${practices[currentPracticeIndex].practiceHelp}`,
      `${practices[currentPracticeIndex].practiceHelpTranslated}`,
      'info'
    )
  }

  if (_.isEmpty(practices)) return <>Loading...</>
  return (
    <LessonLayout
      page={practices[currentPracticeIndex].practiceName}
      hasRecorder={practices[currentPracticeIndex].hasRecorder}
      onLanguageChange={handleChangeLanguage}>
      <div className="text-center">
        <LessonTitle>
          <button
            className="block relative z-20 pr-4 align-middle"
            onClick={handleHelpClick}>
            <img
              src="/images/icons/unicorn_question.svg"
              className="h-16 w-16 animate-ping-slow"></img>
            <span className="text-orange-600 text-2xl">GUIDE</span>
          </button>
          <div className="relative z-50">
            {practices[currentPracticeIndex].practiceOrder == 1 &&
              practices[currentPracticeIndex].practiceName}

            {practices[currentPracticeIndex].practiceOrder != 1 &&
              practices[currentPracticeIndex].practiceOrder -
                1 +
                `. ` +
                practices[currentPracticeIndex].practiceName}
          </div>
        </LessonTitle>
      </div>

      <LessonPrevButton
        name={
          practices[currentPracticeIndex - 1]
            ? practices[currentPracticeIndex - 1].practiceName
            : 'Các bài học'
        }
        handleOnClick={handlePrev}
      />
      <LessonPractice
        type={practices[currentPracticeIndex].practiceType}
        practice={practices[currentPracticeIndex]}
        language={language}
      />

      <LessonNextButton
        name={
          currentPracticeIndex >= practices.length - 1
            ? 'Các bài học'
            : practices[currentPracticeIndex + 1].practiceName
        }
        handleOnClick={handleNext}
      />
    </LessonLayout>
  )
}

const LessonTitle = styled.div.attrs({
  className: 'text-2xl lg:text-3xl text-indigo-700'
})``
