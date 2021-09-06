import ReactHtmlParser from 'html-react-parser'
import _ from 'lodash'
import getConfig from 'next/config'
import { useRouter } from 'next/router'
import React, { ReactNode, useEffect, useState } from 'react'

import useLazyFetch from '@/hooks/useLazyFetch.hook'
import { PracticeType } from '@/pages/lesson/[id]'

const { publicRuntimeConfig } = getConfig()

export default function SentencePatterns({
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
  const [title, setTitle] = useState()

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
    <div className="relative container mx-auto z-40 px-4 py-32">
      <div className="bg-gray-600 bg-opacity-25 rounded-lg">
        <div className="flex flex-col flex-wrap lg:flex-row p-4">
          {data.map((item, index) => (
            <div
              key={index}
              className="w-full lg:w-1/2 my-2 py-2 px-4 border-2 text-blue-700 border-opacity-25
              text-xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text
          bg-white bg-opacity-75 rounded-lg
        cursor-pointer transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
              {index + 1 + '. '}
              {ReactHtmlParser(item.content)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
