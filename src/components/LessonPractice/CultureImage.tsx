import _ from 'lodash'
import getConfig from 'next/config'
import React, { ReactNode, useEffect, useState } from 'react'
import ImageGallery from 'react-image-gallery'
import styled from 'styled-components'
import tw from 'twin.macro'

import useLazyFetch from '@/hooks/useLazyFetch.hook'
import { PracticeType } from '@/pages/lesson/[id]'

const { publicRuntimeConfig } = getConfig()

export default function CultureImage({
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

  let images

  useEffect(() => {
    if (response && response.data) {
      setData(
        response.data.map(item => {
          return {
            original: `${publicRuntimeConfig.api.resourceHost}${item.imagePath}`,
            originalTitle:
              item.imageCaption + ' (' + item.imageCaptionTranslated + ')',
            description:
              item.imageCaption + ' (' + item.imageCaptionTranslated + ')',
            thumbnail: `${publicRuntimeConfig.api.resourceHost}${item.imagePath}`,
            order: item.order
          }
        })
      )
    }
  }, [response])

  return (
    <>
      <div className="container mx-auto z-1 px-4">
        <div className="flex flex-col space-y-4 z-40">
          <ImageGalleryWrapper>
            <ImageGallery
              items={data}
              lazyLoad={true}
              slideInterval={5000}
              autoPlay={true}
              showBullets={true}
              additionalClass="w-full"
            />
          </ImageGalleryWrapper>
        </div>
      </div>
    </>
  )
}
const ImageGalleryWrapper = styled.div`
  ${tw`z-10 align-middle bg-gray-600 bg-opacity-25`}
  .image-gallery-slide img {
    ${tw`w-full z-10 h-48 sm:h-48 md:h-96 lg:h-120 xl:h-144`}
  }

  .fullscreen .image-gallery-slide img {
    max-height: 100vh;
  }

  .image-gallery-slide {
    ${tw`text-2xl md:text-4xl`}
  }

  .image-gallery-description {
    ${tw`relative`}
  }

  .image-gallery-thumbnail-image {
    ${tw`h-20`}
  }
`
