import getConfig from 'next/config'
import React, { useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import Fade from 'react-reveal/Fade'
import swal from 'sweetalert'

const { publicRuntimeConfig } = getConfig()

interface QuoteListProps {
  data: any
}

const bravo = '/audio/correct.mp3'
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

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

function Quote({ quote, index }) {
  return (
    <div className="">
      <Draggable draggableId={quote.pId} index={index}>
        {(provided, snapshot) => {
          // extending the DraggableStyle with our own inline styles
          const style = {
            ...provided.draggableProps.style,
            position: 'static'
          }
          return (
            <div
              className="w-full bg-gray-200 bg-opacity-75 rounded-lg p-1"
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={style}>
              {quote.content}
            </div>
          )
        }}
      </Draggable>
    </div>
  )
}

const QuoteList = React.memo(function QuoteList(props: QuoteListProps) {
  return props.data.map((quote, index) => (
    <div className="p-1" key={quote.pId}>
      <Quote quote={quote} index={index} />
    </div>
  ))
})

export default function ConversationReoderElement(inputData) {
  const conversation = inputData.conversation

  const [data, setData] = useState(conversation.data)

  const [answers, setAnswers] = useState(
    conversation.answer
      .sort(
        ({ correctOrder: previousID }, { correctOrder: currentID }) =>
          previousID - currentID
      )
      .map(item => {
        return {
          pId: item.pId
        }
      })
  )

  const [isSuccess, setSuccess] = useState(true)

  useEffect(() => {
    // Check dap an
    if (data && data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].pId !== answers[i].pId) {
          return
        }
      }
      if (isSuccess) {
        playSound(bravo)
        setSuccess(false)
        swal('Đúng rồi!', `xem xem`, 'success')
      }
    }
  }, [data])

  function onDragEnd(result) {
    if (!result.destination) {
      return
    }

    if (result.destination.index === result.source.index) {
      return
    }

    const newData = reorder(data, result.source.index, result.destination.index)
    setData(newData)
  }

  return (
    <div>
      <Fade>
        <div className="container mx-auto z-40 px-4 relative">
          <div className="text-lg">
            <img
              className="h-20 inline-block pr-4"
              src="/images/icons/writing.svg"></img>
            <div
              className="text-xl lg:text-3xl
            animate-bounce text-yellow-900 inline-block">
              Xếp lại nào! Xếp lại nào!
            </div>
          </div>
          {/* Danh sách items */}
          <section className="text-blue-700">
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="list">
                {provided => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    <div className="text-2xl sm:text-3xl md:text-4xl">
                      <QuoteList data={data} />
                    </div>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </section>

          {/* Phần trợ giúp */}
          {/* <section>
        <button onClick={onClickHelp}></button>
      </section> */}
        </div>
      </Fade>
    </div>
  )
}
