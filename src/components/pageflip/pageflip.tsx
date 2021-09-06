import React from 'react'

interface PageFlipProps {
  content?
  topRegion?
  bottomRegion?
  item?
}

export default function PageFlip(props: PageFlipProps) {
  let contentRows = []
  if (typeof props.content === 'string') {
    contentRows = props.content ? props.content.split('\n') : []
  } else {
    contentRows = props.content?.contentTranslate?.split('\n')
  }

  return (
    <section className="mb-12 overflow-y-auto overflow-x-hidden flex-col h-120 sm:flex-col sm:text-xl md:flex-col lg:flex-col lg:text-2xl mt-4">
      {props.topRegion}
      {contentRows?.map((item, index) => (
        <div className="flex pl-10" key={index}>
          <div className="flex z-10 text-justify pr-3">{item.trim()}</div>
        </div>
      ))}
      {props.bottomRegion}
    </section>
  )
}
