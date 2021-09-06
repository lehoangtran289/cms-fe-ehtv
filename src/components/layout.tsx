import _ from 'lodash'
import Head from 'next/head'
import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'

import NavigationBar from './NavigationBar'

const MAIN_TITLE = 'Em học tiếng việt'

export type LayoutProps = {
  children: React.ReactNode
  page?: string
  heading?: React.ReactNode
  onLanguageChange
}

export default function Layout({
  children,
  page = '',
  heading,
  onLanguageChange
}: LayoutProps) {
  const title = page.concat(!_.isEmpty(page) ? ' - ' : '').concat(MAIN_TITLE)
  return (
    <>
      {/* <ScrollBar> */}
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} key="title" />
        <style>
          {
            'body { background-image: linear-gradient(to bottom, #26D6F7 0%, #6EE4FA 50%, #26D6F7 100%); }'
          }
        </style>
      </Head>
      <PageWrapper>
        <BackgroundGlass>
          <NavigationBar onLanguageChange={onLanguageChange} />
          {heading}
          <section className="fixed inset-0 mt-2">
            <img
              className="w-1/4 absolute top-10 left-1 md:top-10 lg:top-2 invisible md:visible"
              src="/images/icons/tree-1.svg"
            />
            <img
              className="w-1/4 absolute top-12 left-2 md:top-16 lg:top-10 invisible md:visible"
              src="/images/icons/tree-2.svg"
            />
            <img
              className="w-1/6 absolute top-10 left-6 md:top-10 md:left-12 lg:top-4 invisible md:visible"
              src="/images/icons/tree-3.svg"
            />
            <img
              className="w-1/6 absolute top-10 right-5 md:top-10 md:right-10 lg:top-2 invisible md:visible"
              src="/images/icons/tree-4.svg"
            />
            <img
              className="w-1/3 absolute top-11 right-4 md:top-12 md:right-8 lg:top-5"
              src="/images/icons/tree-5.svg"
            />
          </section>
          {children}
          <section className="fixed inset-x-0 bottom-0 z-1">
            <img
              className="animate-ping-slow sm:h-20 md:h-32 lg:h-40 xl:h-40 absolute bottom-0 hidden md:block"
              src="/images/icons/glass-1.svg"
            />
            <img
              className="animate-swing-1 sm:h-2 md:h-32 lg:h-40 xl:h-40 absolute bottom-0 left-4 md:left-16 hidden md:block"
              src="/images/icons/glass-2.svg"
            />
            <img
              className="animate-swing-2 sm:h-2 md:h-32 lg:h-40 xl:h-40 absolute bottom-0 left-16 md:left-24 hidden md:block"
              src="/images/icons/glass-3.svg"
            />
            <img
              className="animate-ping-slow sm:h-20 md:h-32 lg:h-40 xl:h-40 absolute bottom-0 right-8 lg:right-6 hidden xl:block"
              src="/images/icons/candy-1.svg"
            />
            <img
              className="animate-swing-0 sm:h-20 md:h-32 lg:h-40 xl:h-40 absolute bottom-0 right-4 hidden xl:block max"
              src="/images/icons/candy-2.svg"
            />
          </section>
        </BackgroundGlass>
      </PageWrapper>
    </>
  )
}

const PageWrapper = styled.div.attrs({
  className: 'overflow-y-visible overflow-x-hidden max-h-full'
})``

const BackgroundGlass = styled.div.attrs({})`
  & {
  }

  &::before {
    ${tw`bg-repeat bg-cover bg-fixed bg-center h-screen fixed inset-0 z-1`}
    content: "";
    background-image: url('/images/backgrounds/bg-glass.svg');
  }
`
