import { faPlay, faSync } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import produce from 'immer'
import _ from 'lodash'
import getConfig from 'next/config'
import React, { ReactNode, useEffect, useState } from 'react'
import Progress from 'react-progressbar'
import Zoom from 'react-reveal/Zoom'
import styled from 'styled-components'
import tw from 'twin.macro'

import useLazyFetch from '@/hooks/useLazyFetch.hook'
import { PracticeType } from '@/pages/lesson/[id]'

let timeInterval
const { publicRuntimeConfig } = getConfig()
const LONG_LESSON_DURATION = 0.25
const SHORT_LESSON_DURATION = 0.25
const CHOICE_STATUS = {
  UNSELECTED: 0,
  FAILED: -1,
  SUCCESS: 1
}

const bravo = '/audio/correct.mp3'
const failed = '/audio/wrong.mp3'

export default function Recognized({
  ...props
}: {
  practice: PracticeType
  language: string
}): ReactNode {
  const practice = props.practice

  const [doFetch, response] = useLazyFetch(
    `${publicRuntimeConfig.api.host}/lesson/practice-detail`
  )
  const [quesNum, setQuesNum] = useState(0)

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

  return response && response.data ? (
    <Zoom>
      <div className="relative container m-auto z-1 px-4 pt-32">
        <RecognizedWrapper>
          <ListQuestion
            questions={response.data}
            active={quesNum}
            setQuesNum={setQuesNum}
          />
          <Question
            question={response.data[quesNum]}
            answer={response.answer[quesNum]}
          />
        </RecognizedWrapper>
      </div>
    </Zoom>
  ) : (
    ''
  )
}

const ListQuestion = ({ questions, active, setQuesNum }) => {
  return (
    <div className="flex justify-center">
      {questions.map((item, idx) => (
        <button
          key={idx}
          className={`quest-card bg-flower cursor-pointer text-xl pt-2 xl:pt-4 bg-no-repeat text-center bg-transparent bg-contain bg-center content-center transition ease-in-out duration-700 transform hover:scale-150 focus:outline-none h-12 xl:h-16 w-12 xl:w-16 ${
            idx === active ? 'active' : ''
          }`}
          onClick={() => setQuesNum(idx)}>
          {idx + 1}
        </button>
      ))}
    </div>
  )
}

let audio = null
const Question = ({ question, answer }) => {
  const [hasStarted, setHasStarted] = useState(false)
  const [completed, setCompleted] = useState(100)
  const [isPlaying, setIsPlaying] = useState(false)
  const [quesNum, setQuesNum] = useState(0)
  const [rightAns, setRightAns] = useState(0)
  const [choices, setChoices] = useState([])
  const [backgroundAudio] = useState(new Audio('/audio/tick.wav'))

  const start = () => {
    if (hasStarted) {
      init()
      setChoices(prev =>
        prev.map(item =>
          item.status === CHOICE_STATUS.UNSELECTED
            ? item
            : { ...item, status: CHOICE_STATUS.UNSELECTED }
        )
      )
    } else {
      setHasStarted(true)
    }

    setIsPlaying(true)
    const isLongLesson = choices.filter(
      item => item.content.split(' ').length > 4
    ).length
    const duration = isLongLesson ? LONG_LESSON_DURATION : SHORT_LESSON_DURATION

    setTimeout(() => {
      timeInterval = setInterval(() => {
        setCompleted(prev => prev - duration)
      }, 100)
    }, 500)
  }

  function playSound(url) {
    const audio = new Audio(url)
    audio.play()
  }

  const submit = id => {
    if (!isPlaying || completed === 0 || completed === 100) return
    const audioUrl = question.shuffleAudio[quesNum - 1]
    const ans = answer.mappingResult.find(item => item.pId === id)
    if (ans.audio === audioUrl) {
      playSound(bravo)
      setRightAns(prev => prev + 1)
      setChoices(prev =>
        prev.map(item =>
          item.id === id ? { ...item, status: CHOICE_STATUS.SUCCESS } : item
        )
      )
    } else {
      playSound(failed)
      setChoices(prev =>
        prev.map(item =>
          item.id === id ? { ...item, status: CHOICE_STATUS.FAILED } : item
        )
      )
    }
  }

  const init = () => {
    backgroundAudio.pause()
    setCompleted(100)
    setRightAns(0)
    setQuesNum(0)
    timeInterval && clearInterval(timeInterval)
  }

  useEffect(() => {
    if (question) {
      const _temp = []
      const { text } = question
      const _len = text.length

      for (let i = 0; i < _len; i++) {
        _temp.push({
          id: text[i].pId,
          content: text[i].content,
          status: CHOICE_STATUS.UNSELECTED
        })
      }

      setChoices(_temp)
      setHasStarted(false)
      setIsPlaying(false)
      init()
    }

    return () => {
      timeInterval && clearInterval(timeInterval)
    }
  }, [question])

  useEffect(() => {
    if (completed <= 0) {
      backgroundAudio.pause()
      clearInterval(timeInterval)
      setCompleted(0)
      setIsPlaying(false)
      setChoices(prev =>
        prev.map(item =>
          item.status !== CHOICE_STATUS.SUCCESS
            ? { ...item, status: CHOICE_STATUS.SUCCESS }
            : item
        )
      )
      return
    }

    if (isPlaying) {
      if (completed >= 66) {
        setQuesNum(1)
      } else if (completed >= 33) {
        setQuesNum(2)
      } else {
        setQuesNum(3)
      }
    }
  }, [completed])

  useEffect(() => {
    if (quesNum === 0) {
      if (audio) {
        audio.pause()
        audio = null
        backgroundAudio.pause()
      }
      return
    }
    let timeout
    audio = new Audio(
      publicRuntimeConfig.api.resourceHost + question.shuffleAudio[quesNum - 1]
    )
    backgroundAudio.pause()
    audio.play()

    audio.onended = () => {
      backgroundAudio.play()
      backgroundAudio.onended = () => {
        timeout = setTimeout(() => {
          backgroundAudio.currentTime = 0
          backgroundAudio.play()
        }, 300)
      }
    }
    // const timeLeftAudio = new Audio(
    //   'https://emhoctiengviet.vn/practice_resource/lesson03/p00/B03-S01-00-N.mp3'
    // )
    // timeLeftAudio.play()

    const nextState = produce(choices, draftState => {
      for (let i = 0; i < draftState.length; i++) {
        if (draftState[i].status !== CHOICE_STATUS.SUCCESS) {
          if (quesNum !== 1) {
            const audioUrl = question.shuffleAudio[quesNum - 2]
            const rightAns = answer.mappingResult.find(
              item => item.audio === audioUrl
            )
            if (draftState[i].id === rightAns.pId)
              draftState[i].status = CHOICE_STATUS.SUCCESS
          } else {
            draftState[i].status = CHOICE_STATUS.UNSELECTED
          }
        }
      }
    })

    setChoices(nextState)
    return () => {
      clearTimeout(timeout)
    }
  }, [quesNum])

  return (
    <div>
      <div className="flex justify-between items-center">
        <button
          className="btn-start mr-5 md:mr-10 cursor-pointer"
          onClick={start}>
          <p>
            <FontAwesomeIcon
              className="h-6 block m-auto"
              icon={!hasStarted ? faPlay : faSync}
              size="sm"
            />
          </p>
          <img src="/images/icons/flower-1.svg" className="animate-spin-20" />
        </button>
        <Progress
          completed={completed}
          className="w-full bg-gray-100 mr-5 md:mr-10"
        />
        <div className="summary">
          <span className="correct">{rightAns}</span>
          <span className="total">/{quesNum}</span>
        </div>
      </div>
      <Choices choices={choices} submit={submit}></Choices>
    </div>
  )
}

const Choices = ({ choices, submit }) => {
  const getClassByStatus = status => {
    switch (status) {
      case CHOICE_STATUS.SUCCESS:
        return 'green'
      case CHOICE_STATUS.FAILED:
        return 'red'
      default:
        return ''
    }
  }

  const onSubmit = id => {
    const choice = choices.find(item => item.id === id)
    if (choice.status === CHOICE_STATUS.SUCCESS) return
    submit && submit(id)
  }

  return (
    <ChoicesWrapper>
      {choices.map((item, index) => (
        <button
          key={index}
          className={`wordSpan ${getClassByStatus(item.status)}`}
          onClick={() => onSubmit(item.id)}>
          <div className="flex relative">
            <p>{item.content}</p>
            <div className="btnBg">
              <img className="wordCloud" src="/images/wordCloud.svg" />
            </div>
          </div>
        </button>
      ))}
    </ChoicesWrapper>
  )
}

const ChoicesWrapper = styled.div`
  .wordSpan {
    position: relative;
    display: inline-block;
    cursor: pointer;
    z-index: 20;
    margin: 0.5rem;
    transition: all 0.3s;

    &:hover {
      -webkit-filter: drop-shadow(0px 0px 10px green) !important;
      filter: drop-shadow(0px 0px 10px green) !important;
      transform: scale(1.1);
    }

    &.green {
      -webkit-filter: drop-shadow(0px 0px 10px green) !important;
      filter: drop-shadow(0px 0px 10px green) !important;
    }

    &.red {
      -webkit-filter: drop-shadow(0px 0px 10px red) !important;
      filter: drop-shadow(0px 0px 10px red) !important;
    }

    p {
      position: absolute;
      color: #30a782;
      width: 100%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1;
      ${tw`text-sm md:text-2xl`}
    }

    img {
      ${tw`w-24 md:w-48`}
    }
  }
`

const RecognizedWrapper = styled.div`
  text-align: center;
  position: relative;

  .quest-card {
    opacity: 0.2;

    &.active {
      opacity: 1;
    }
  }

  .btn-start {
    position: relative;

    p {
      position: absolute;
      width: 100%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1;
      color: #33ccff;
      ${tw`text-xl md:text-6xl`}
    }
  }

  .summary {
    transition: all 0.3s;

    .correct {
      color: blue;
      ${tw`text-2xl md:text-3xl`}
    }

    .total {
      color: red;
      ${tw`text-3xl md:text-4xl`}
    }
  }

  .progressbar-progress {
    height: 1.5rem !important;
  }
`
