import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import FlowerButton from '@/components/FlowerButton'
import Layout from '@/components/layout'
import { doGet } from '@/utils/api'
import { PAGE_LANGUAGE } from '@/utils/LocalStorageKey'

const NUMBER_OF_LESSONS = 10
const Lessons = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    doGet('/lesson').then(res => {
      setData(res)
      // console.log(JSON.stringify(data, null, '\t'))
      console.log('/lessons')
    })
  }, [])

  const handleLanguageChange = languageCode => {
    sessionStorage.setItem(PAGE_LANGUAGE, languageCode)
  }

  return (
    <Layout page="Bài học" onLanguageChange={handleLanguageChange}>
      <div
        className="container mx-auto z-1 mt-40 md:mt-48 xl:mt-56
      ">
        <section className="grid grid-cols-4 md:grid-cols-5 gap-4">
          {data.slice(0, NUMBER_OF_LESSONS).map((lesson, index) => (
            <div
              key={lesson.lessonNo}
              className="z-50 h-24 md:h-48 transform rotate-0 animate-vibrate-1">
              <Link href="/lesson/[id]" as={`/lesson/${lesson.lessonNo}`}>
                <FlowerButton>
                  <img src={`/images/numbers/number_${index + 1}.svg`} />
                </FlowerButton>
              </Link>
            </div>
          ))}
        </section>
      </div>
      {/*<section className="z-40 relative lg:absolute left-0 right-0 lg:top-50% lg:transform lg:-translate-y-1/2 flex items-baseline justify-between mt-2">*/}
      {/*  <PrevButton />*/}
      {/*  <NextButton />*/}
      {/*</section>*/}
    </Layout>
  )
}

export default Lessons
