import Link from 'next/link'
import React from 'react'

import Layout, { LayoutProps } from './layout'
import RecordReplayButton from './RecordReplayButton'

type LessonLayoutProps = {
  children: React.ReactNode
  hasRecorder?: boolean
}

export default function LessonLayout({
  children,
  hasRecorder,
  ...rest
}: LessonLayoutProps & LayoutProps) {
  if (navigator.userAgent.toLowerCase().includes('iphone')) {
    hasRecorder = false
  }
  return (
    <Layout {...rest}>
      <Link href="/lesson">
        <button
          className="fixed
        bottom-1
        left-1
        w-16 transform transition ease-in-out duration-700 hover:scale-125 z-30">
          <img src="/images/icons/lessons.png" />
        </button>
      </Link>
      <>{children}</>
      {hasRecorder ? <RecordReplayButton /> : ''}
    </Layout>
  )
}
