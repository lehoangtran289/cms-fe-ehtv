import { produce } from 'immer'
import _ from 'lodash'
import getConfig from 'next/config'
import { useRouter } from 'next/router'
import React, { ReactNode, useEffect, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { usePreview } from 'react-dnd-multi-backend'
import styled from 'styled-components'
import tw from 'twin.macro'

import useLazyFetch from '@/hooks/useLazyFetch.hook'
import { PracticeType } from '@/pages/lesson/[id]'

const { publicRuntimeConfig } = getConfig()

const bravo = '/audio/correct.mp3'
const failed = '/audio/wrong.mp3'

function playSound(url) {
  const audio = new Audio(url)
  audio.play()
}

interface ResultInterface {
  type: number
  isLastQuestion: boolean
  setQuestion: any
  setResultPage: any
}

interface WordInterface {
  word: string
  srcIdx?: number
  value: number
}

interface QuestionInterface {
  id: string
  question: Array<string>
  submitResult: any
}

interface AnswerInterface {
  answer: number
  id: number
  setAnswers: any
  words: Array<string>
}

const DRAG_TYPE = 'WORD'

const RESULT = {
  PASS: 1,
  FAILED: 0
}

let tryCount = 1

const MyPreview = () => {
  const { display, itemType, item, style } = usePreview()
  if (!display) {
    return null
  }

  const stylePreview = {
    ...style,
    fontSize: '30px',
    border: '1px solid transparent',
    borderRadius: '4px',
    height: '60px',
    background: '#e6e6e6',
    padding: '5px 20px',
    opacity: 0.8
  }
  return (
    <div className="item-list__item z-50" style={{ ...stylePreview }}>
      <Word {...item} />
    </div>
  )
  // return <Word {...item} />
  // render your preview
}

const Question = ({ id, question, submitResult }: QuestionInterface) => {
  const [answers, setAnswers] = useState([])

  const updateAnswers = (src, dest, value) => {
    const nextState = produce(answers, draftState => {
      src !== undefined && (draftState[src] = draftState[dest])
      draftState[dest] = value
    })
    setAnswers(nextState)

    const validAns = nextState.filter(item => item !== undefined)
    if (validAns.length === question.length) {
      submitResult(
        id,
        validAns.map(idx => question[idx])
      )
      // const result = question.answer.every((item, index) => item === nextState[index]);
      // submitResult(result ? RESULT.PASS : RESULT.FAILED);
    }
  }

  return (
    <QuestionWrapper>
      <div className="words">
        {question.map((word, idx) =>
          answers.indexOf(idx) === -1 ? (
            <Word word={word} value={idx} key={idx} />
          ) : (
            ''
          )
        )}
      </div>
      <div className="answers">
        {question.map((word, idx) => (
          <Anwser
            words={question}
            answer={answers[idx]}
            setAnswers={updateAnswers}
            id={idx}
            key={idx}
          />
        ))}
      </div>
    </QuestionWrapper>
  )
}

const Word = ({ word, value, srcIdx }: WordInterface) => {
  const [{ opacity }, dragRef] = useDrag({
    item: { type: DRAG_TYPE, value, srcIdx, word },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0 : 1
    })
  })

  return (
    <div className="word" ref={dragRef} style={{ opacity }}>
      <span>{word}</span>
    </div>
  )
}

const Anwser = ({ answer, setAnswers, id, words }: AnswerInterface) => {
  const onDrop = itemDrop => {
    const { value, srcIdx } = itemDrop
    setAnswers(srcIdx, id, value)
  }

  const [{ isOver }, dropRef] = useDrop({
    accept: DRAG_TYPE,
    drop: onDrop,
    collect: monitor => ({
      isOver: monitor.isOver()
    })
  })

  return (
    <div
      ref={dropRef}
      className={`answer animate-wood-bounce-in ${isOver ? 'over' : ''}`}>
      {answer !== undefined ? (
        <Word word={words[answer]} value={answer} srcIdx={id} />
      ) : (
        ''
      )}
    </div>
  )
}

export default function SentencesReorders({
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
  const [answers, setAnswers] = useState([])
  const [question, setQuestion] = useState(0)
  const [resultPage, setResultPage] = useState({
    isShow: false,
    type: null
  })

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
      setData(response.data)
      setAnswers(response.answer)
    }
  }, [response])

  const submitResult = (id, result) => {
    const answer = answers.find(item => item.pId === id)
    if (answer && answer.content) {
      const pass = answer.content.every((item, idx) => item === result[idx])
      if (pass == true) {
        playSound(bravo)
      } else {
        playSound(failed)
      }
      setResultPage({ isShow: true, type: pass ? RESULT.PASS : RESULT.FAILED })
    } else {
      setResultPage({ isShow: true, type: RESULT.FAILED })
    }
  }

  return (
    <div className="container mx-auto">
      <section className="grid grid-cols-1 gap-4">
        <MyPreview />
        {data.length ? (
          resultPage.isShow ? (
            <Result
              type={resultPage.type}
              setQuestion={setQuestion}
              setResultPage={setResultPage}
              isLastQuestion={question === data.length - 1}
            />
          ) : (
            <Question
              id={data[question].pId}
              question={data[question].content}
              submitResult={submitResult}
            />
          )
        ) : (
          ''
        )}
      </section>
    </div>
  )
}

const Result = ({
  type,
  setQuestion,
  setResultPage,
  isLastQuestion
}: ResultInterface) => {
  const next = () => {
    setQuestion(prev => prev + 1)
    setResultPage({ isShow: false, type: null })
    tryCount = 1
  }

  const tryAgain = () => {
    setQuestion(prev => prev)
    setResultPage({ isShow: false, type: null })
    tryCount++
  }

  return (
    <ResultWrapper>
      <div className="text-center mt-48">
        {type === RESULT.PASS ? (
          <div className="">
            <button className="btn-result">
              Score: 1 / {tryCount} {tryCount > 1 ? 'tries' : 'try'}
            </button>
            {!isLastQuestion ? (
              <button className="btn-result" onClick={next}>
                Next
              </button>
            ) : (
              ''
            )}
          </div>
        ) : (
          <button className="btn-result" onClick={tryAgain}>
            Try again
          </button>
        )}
      </div>
    </ResultWrapper>
  )
}

const ResultWrapper = styled.div`
  z-index: 1;
  margin: auto;

  .btn-result {
    cursor: pointer;
    padding-top: 0.3em;
    padding-bottom: 0.3em;
    padding-left: 0.8em;
    padding-right: 0.8em;
    margin: 0.2em;
    border: 0.2em solid #f2f2f2;
    border-radius: 10px;

    font-size: 2.5em;
    color: black;
    transition: all 0.5s;
    background: initial;

    &:hover {
      background: #f2f2f2;
    }

    ${tw`animate-wood-bounce-in`}
  }
`

const QuestionWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  transform: translate(-50%, -50%);
  z-index: 1;

  & > .words {
    text-align: center;

    & > .word {
      cursor: grab;
      display: inline-block;
      border-radius: 4px;
      border: 1px solid transparent;
      height: 60px;
      /* padding: 6px 15px; */
      margin: 5px;
      background: #e6e6e6;
      font-size: 30px;

      & > span {
        position: relative;
        float: left;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 0 20px;
      }
    }
  }

  & > .answers {
    text-align: center;

    & > .answer {
      animation-fill-mode: forwards;
      animation-delay: 0.3s;
      opacity: 0;
      display: inline-block;
      min-width: 60px;
      height: 60px;
      font-size: 30px;
      text-align: center;
      border-radius: 4px;
      padding: 5px 10px;
      background: rgba(0, 153, 255, 0.8);
      margin: 5px;
    }

    & > .over {
      background: rgba(0, 153, 255, 0.3);
    }
  }
`
