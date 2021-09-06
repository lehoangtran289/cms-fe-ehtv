import produce from 'immer'
import _ from 'lodash'
import getConfig from 'next/config'
import React, { ReactNode, useEffect, useState } from 'react'
import Bounce from 'react-reveal/Bounce'
import styled from 'styled-components'
import tw from 'twin.macro'

import useLazyFetch from '@/hooks/useLazyFetch.hook'
import { PracticeType } from '@/pages/lesson/[id]'

const bravo = '/audio/correct.mp3'
const failed = '/audio/wrong.mp3'
let audio

function playSound(url) {
  if (audio) {
    try {
      audio.pause()
    } catch (error) {
      // ignored
    }
  }
  audio = new Audio(url)
  audio.play()
}

const { publicRuntimeConfig } = getConfig()
const CHOICE_STATUS = {
  UNSELECTED: 0,
  FAILED: -1,
  SUCCESS: 1
}
export default function MultipleChoices({
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

  const [disabled, setDisabled] = useState(true)

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

  const getAnswer = id => {
    return response.answer.find(item => item.pId === id).correct
  }

  const nextQuestion = () => {
    if (!disabled) {
      setQuesNum(prev => prev + 1)
      setDisabled(true)
    }
  }

  return (
    <div className="relative z-30 px-4 pt-10">
      {response && response.data ? (
        <Bounce>
          <P6Wrapper>
            <Question content={response.data[quesNum].content}></Question>
            <Choices
              choices={response.data[quesNum].answers}
              answer={getAnswer(response.data[quesNum].pId)}
              setDisabled={setDisabled}></Choices>
            {quesNum < response.data.length - 1 ? (
              <button
                className="next-quest"
                onClick={nextQuestion}
                disabled={disabled}>
                Tiếp theo
              </button>
            ) : (
              ''
            )}
          </P6Wrapper>
        </Bounce>
      ) : (
        ''
      )}
    </div>
  )
}

const Question = ({ content }) => {
  return (
    <section className="relative z-10 items-center bg-opacity-25 text-white m-auto">
      <img className="h-80 sm:h-64 xl:h-120" src="/images/board.svg" />
      <ContentWrapper>
        <span>{content}</span>
      </ContentWrapper>
    </section>
  )
}

const Choices = ({ choices, answer, setDisabled }) => {
  const [choiceWithStt, setChoiceWithStt] = useState([])

  useEffect(() => {
    const _temp = []
    for (let i = 0; i < choices.length; i++) {
      _temp.push({
        id: i,
        content: choices[i],
        status: CHOICE_STATUS.UNSELECTED
      })
    }
    setChoiceWithStt(_temp)
  }, [choices])

  const checkAnswer = id => {
    const choice = choiceWithStt.find(item => item.id === id)
    let nextState
    let isChecked
    let played = false

    if (choice.content === answer) {
      nextState = produce(choiceWithStt, drafState => {
        for (let i = 0; i < drafState.length; i++) {
          if (drafState[i].id === choice.id) {
            drafState[i].status = CHOICE_STATUS.SUCCESS
            playSound(bravo)
            setDisabled(false)
          } else {
            drafState[i].status = CHOICE_STATUS.FAILED
          }
        }
      })
    } else {
      nextState = produce(choiceWithStt, drafState => {
        for (let i = 0; i < drafState.length; i++) {
          if (drafState[i].id === choice.id) {
            drafState[i].status = CHOICE_STATUS.FAILED
            if (!played) {
              playSound(failed)
              played = true
            }
          }
        }

        if (
          drafState.filter(item => item.status === CHOICE_STATUS.UNSELECTED)
            .length === 1
        ) {
          drafState.find(
            item => item.status === CHOICE_STATUS.UNSELECTED
          ).status = CHOICE_STATUS.SUCCESS
          setDisabled(false)
        }
      })
    }
    setChoiceWithStt(nextState)
  }

  return (
    <ChoicesWrapper>
      {choiceWithStt.map(item => (
        <Choice
          content={item.content}
          status={item.status}
          submit={checkAnswer}
          key={item.id}
          id={item.id}
        />
      ))}
    </ChoicesWrapper>
  )
}

const Choice = ({ content, status, submit, id }) => {
  const getClassNameByStatus = status => {
    switch (status) {
      case CHOICE_STATUS.SUCCESS:
        return 'success'
      case CHOICE_STATUS.FAILED:
        return 'failed'
      default:
        return ''
    }
  }

  return (
    <div className="answerLineItem">
      <div className={`answerFlex ${getClassNameByStatus(status)}`}>
        <div className="crossWrap">
          <img src="/images/cross.svg" />
        </div>
        <div className="checkWrap">
          <img src="/images/check.svg" />
        </div>
        <button onClick={() => submit(id)}>{content}</button>
      </div>
    </div>
  )
}

const P6Wrapper = styled.div`
  & {
    z-index: 10;
    text-align: center;
    position: relative;

    img {
      margin: auto;
    }

    .next-quest {
      &:disabled {
        ${tw`bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed`}
      }

      ${tw`bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded`}
    }
  }
`

const ContentWrapper = styled.div`
  & {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  & > span {
    white-space: pre-wrap;
    ${tw`text-2xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-5xl`}
  }
`

const ChoicesWrapper = styled.div`
  & {
    text-align: center;

    .answerLineItem {
      display: inline-block;
      transition: all 0.4s;

      &:hover {
        transform: translate3d(10px, -5px, 100px);
      }

      .answerFlex {
        display: flex;
        align-items: center;
        text-align: center;
        transition: all 0.4s;
        position: relative;

        button {
          background-image: url('/images/paper.svg');
          border-radius: 4px;
          border: 1px solid transparent;
          margin: 10px;
          font-family: 'Patrick Hand', cursive;
          z-index: 100;
          background-size: cover;
          box-shadow: -7px 7px 5px rgba(102, 102, 153, 0.3);
          transition: all 0.4s;
          cursor: pointer;
          ${tw`px-6 py-4 text-lg sm:text-lg md:text-3xl lg:text-3xl xl:text-3xl`}
        }

        .crossWrap {
          position: absolute;
          overflow: hidden;
          left: 10px;
          width: 0;
          height: 0;
          transition: all 0.4s;

          img {
            color: #33ccff;
            max-width: 80px;
            z-index: 200;
            transition: all 0.4s;
            position: relative;
          }
        }

        .checkWrap {
          position: absolute;
          overflow: hidden;
          width: 0;
          height: 0;
          transition: all 0.4s;

          img {
            color: #33ccff;
            max-width: 80px;
            transform: scale(0.8, 0.8);
            z-index: 200;
            transition: all 0.4s;
            position: relative;
          }
        }

        &.failed {
          button {
            background-color: red !important;
            border-color: red !important;
            box-shadow: -7px 7px 5px rgba(102, 102, 153, 0.3),
              inset 0 0 500px rgb(255, 128, 128);
          }

          .crossWrap {
            height: initial;
            width: 80px;
          }
        }

        &.success {
          button {
            background-color: #008000 !important;
            border-color: #008000 !important;
            box-shadow: -7px 7px 5px rgba(102, 102, 153, 0.3),
              inset 0 0 500px rgba(102, 255, 194, 0.7);
          }

          .checkWrap {
            height: initial;
            width: 80px;
          }
        }
      }
    }
  }
`
