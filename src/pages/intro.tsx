import ReactHtmlParser from 'html-react-parser'
import React, { useEffect, useState } from 'react'

import Layout from '@/components/layout'
import { doGet } from '@/utils/api'
import { languages } from '@/utils/config'
import { PAGE_LANGUAGE } from '@/utils/LocalStorageKey'

export default function Intro(): JSX.Element {
  const [language, setLanguage] = useState(null)
  const [viData, setViData] = useState('')
  const [foreignData, setForeignData] = useState('')
  const [authors, setAuthors] = useState('')

  const type = 'introduce'

  useEffect(() => {
    setLanguage(
      localStorage.getItem(PAGE_LANGUAGE)
        ? localStorage.getItem(PAGE_LANGUAGE)
        : languages[0].languageCode
    )
  }, [])

  useEffect(() => {
    const url = '/config/message?message_key=' + type + '&language=vi'
    doGet(url).then(res => {
      setViData(res[0].messageValue)
    })
  }, [])

  useEffect(() => {
    if (language) {
      const url =
        '/config/message?message_keys=' +
        type +
        ',homepage-authors&language=' +
        language
      doGet(url).then(res => {
        if (res[0]) {
          setForeignData(res[0].messageValue)
        }
        if (res[1]) {
          setAuthors(res[1].messageValue)
        }
      })
    }
  }, [language])

  const handleChangeLanguage = languageCode => {
    setLanguage(languageCode)
    localStorage.setItem(PAGE_LANGUAGE, languageCode)
  }

  return (
    <Layout
      onLanguageChange={handleChangeLanguage}
      page="Giới thiệu"
      heading={
        <section className="mt-16 md:mt-8 mb-20 md:mb-40 lg:mb-8 relative">
          <div className="flex flex-row content-center justify-center px-6">
            <img
              className="transform sm: w-6/12 md:w-3/12 animate-ping-slow self-center z-30"
              src="/images/about-text.svg"
              alt={''}
            />
          </div>
        </section>
      }>
      <div className="z-10 container mx-auto px-4 pb-40">
        <section className="relative z-10 mt-4 gap-4 bg-no-repeat bg-cover bg-white bg-opacity-75 p-4 rounded-lg text-blue-700">
          <section className="z-10">
            <section className="overflow-hidden flex-col sm:flex-col sm:text-xl md:flex-col lg:flex-col md:text-2xl  lg:text-2xl mt-4">
              {ReactHtmlParser(viData)}
              {/*{ReactHtmlParser(authors)}*/}
            </section>
          </section>
        </section>
      </div>

      <div className="z-10 container mx-auto px-4 pb-40">
        <section className="relative z-10 mt-4 gap-4 bg-no-repeat bg-cover bg-white bg-opacity-75 p-4 rounded-lg text-blue-700">
          <section className="z-10">
            <section className="overflow-hidden flex-col sm:flex-col sm:text-xl md:flex-col lg:flex-col md:text-2xl  lg:text-2xl mt-4">
              {ReactHtmlParser(foreignData)}
            </section>
          </section>
        </section>
      </div>
    </Layout>
  )
}
