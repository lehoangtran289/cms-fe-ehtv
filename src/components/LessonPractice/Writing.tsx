import _ from 'lodash'
import getConfig from 'next/config'
import { useRouter } from 'next/router'
import React, { ReactNode, useEffect, useState } from 'react'

import useLazyFetch from '@/hooks/useLazyFetch.hook'
import { PracticeType } from '@/pages/lesson/[id]'

const { publicRuntimeConfig } = getConfig()

export default function Writing({
  ...props
}: {
  practice: PracticeType
  language: string
}): ReactNode {
  const practice = props.practice
  const [doFetch, response] = useLazyFetch(
    `${publicRuntimeConfig.api.host}/lesson/practice-detail`
  )

  const [data, setData] = useState({
    content: '',
    contentTranslated: '',
    readingReq: '',
    readingReqTranslated: '',
    writingReq: '',
    writingReqTranslated: ''
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
    if (response && response.data) {
      setData(response.data[0])
      console.log(response)
    }
  }, [response])

  return (
    <div className="container mx-auto z-1 px-4">
      <div className="flex flex-col flex-wrap lg:flex-row relative z-40 py-20">
        <div className="w-full lg:w-1/2 py-4 bg-gray-600 bg-opacity-75 rounded-lg">
          <div
            className="
            text-2xl md:text-3xl xl:text-4xl
            whitespace-pre-wrap text-center text-white
          ">
            <div
              className=" bg-white bg-opacity-75 p-4 rounded-lg m-4
                    cursor-pointer transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
              <div className="text-blue-700">{data.readingReq}</div>
              <div className="text-gray-800">{data.readingReqTranslated}</div>
            </div>
            <div
              className=" bg-white bg-opacity-75 p-4 rounded-lg m-4 text-blue-700
                    cursor-pointer transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
              {data.content}
            </div>
            <div
              className=" bg-white bg-opacity-75 p-4 mt-4 rounded-lg m-4 text-gray-800
                    cursor-pointer transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
              {data.contentTranslated}
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 pl-0 lg:pl-8 py-8 lg:py-0 h-96 md:h-168">
          <textarea
            id="text-writing"
            className="h-full w-full text-3xl"
            placeholder={data.writingReq + '\n' + data.writingReqTranslated}
          />
        </div>
      </div>
    </div>
  )
}
