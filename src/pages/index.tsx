import ReactHtmlParser from 'html-react-parser'
import getConfig from 'next/config'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import FlowerButton from '@/components/FlowerButton'
import Layout from '@/components/layout'
import { doGet } from '@/utils/api'
import { languages } from '@/utils/config'
import { PAGE_LANGUAGE } from '@/utils/LocalStorageKey'

import { init } from '../utils/ga'

const { publicRuntimeConfig } = getConfig()

export default function Index() {
  useEffect(() => {
    init('G-9H94WHKZMQ')
  }, [])

  const [language, setLanguage] = useState(null)
  const [title, setTitle] = useState('')
  const [authors, setAuthors] = useState('')
  const [sponsors, setSponsors] = useState('')

  useEffect(() => {
    setLanguage(
      localStorage.getItem(PAGE_LANGUAGE)
        ? localStorage.getItem(PAGE_LANGUAGE)
        : languages[0].languageCode
    )

    if (language) {
      doGet(
        `/config/message?message_keys=homepage-authors,homepage-title&language=${language}`
      ).then(res => {
        if (res[0]) {
          setAuthors(res[0].messageValue)
        }
        if (res[1]) {
          setTitle(res[1].messageValue)
        }
      })
    }
  }, [language])

  useEffect(() => {
    doGet(`/config/message?message_key=sponsors&language=vi`).then(res => {
      if (res[0]) {
        setSponsors(res[0].messageValue)
      }
    })
  }, [])

  const handleChangeLanguage = languageCode => {
    setLanguage(languageCode)
    localStorage.setItem(PAGE_LANGUAGE, languageCode)
  }

  return (
    <Layout
      page="Trang chủ"
      heading={
        <section className="mb-48 md:mb-36 lg:mb-20 relative pt-8">
          <div className="flex flex-row content-center justify-center md:px-6">
            <img
              className="w-12 h-12 md:w-24 md:h-24 z-10 mt-6"
              src="/images/logos/hoi.png"
            />
            <h1
              className="flex flex-col content-center justify-center mt-6 px-2 md:px-6
              text-sm sm:text-xl md:text-xl lg:text-2xl
              text-center leading-normal z-10"
              style={{ color: '#793f29' }}>
              <span>{ReactHtmlParser(sponsors)}</span>
              <span>{ReactHtmlParser(authors)}</span>
            </h1>
            <img
              className="w-12 h-12 md:w-24 md:h-24 z-10 mt-6"
              src="/images/logos/T&T.png"
            />
          </div>
        </section>
      }
      onLanguageChange={handleChangeLanguage}>
      <section className="flex flex-col content-center justify-center">
        <div className="flex self-center content-center justify-center relative w-full md:w-3/4 xl:w-2/4 px-8">
          <img
            className="transform scale-90 w-168 h-24 animate-ping-slow z-10"
            src="/images/brand.svg"
          />
          <img
            className="bg-no-repeat bg-cover bg-center absolute transform translate-y-32 rotate-0 animate-up-down w-12 md:w-16 lg:w-24 left-2 -top-12 z-1"
            src="/images/icons/bee.svg"
          />
        </div>
        <h2
          className="text-center uppercase text-sm md:text-2xl font-semibold z-1"
          style={{ color: '#793f29' }}>
          {ReactHtmlParser(title)}
        </h2>
        <section className="flex content-center justify-between self-center mt-2 w-full md:w-3/4 xl:w-2/4 h-32 md:h-40 lg:h-48 xl:h-56 z-1">
          <Link href="/intro">
            <FlowerButton>
              <span>
                Giới
                <br />
                thiệu
              </span>
            </FlowerButton>
          </Link>
          <Link href="/lesson">
            <FlowerButton>
              <span>
                Bài
                <br />
                học
              </span>
            </FlowerButton>
          </Link>
          <Link href="/guide">
            <FlowerButton>
              <span>
                Hướng
                <br />
                dẫn
              </span>
            </FlowerButton>
          </Link>
        </section>
      </section>
    </Layout>
  )
}
