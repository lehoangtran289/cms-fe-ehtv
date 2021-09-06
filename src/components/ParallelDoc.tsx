export interface ParallelDocumentProps {
  content
  contentTranslated
  topRegion?
  bottomRegion?
  title?
  titleTranslated?
}

export default function ParallelDocument(props: ParallelDocumentProps) {
  const contentRows = props.content.split('\n')
  const translatedRows = props.contentTranslated?.split('\n')
  return (
    <section className="overflow-hidden flex-col sm:flex-col sm:text-xl md:flex-col lg:flex-col md:text-2xl  lg:text-2xl mt-4">
      {props.topRegion}

      {props.title && (
        <div className="flex">
          <div className="border-r-2 border-blue-700 flex-1 w-1/2 sm:w-1/2 md:w-1/2 lg:w-1/2 h-full whitespace-pre-wrap z-10 text-center text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-bold mt-0 pb-4">
            {props.title}
          </div>
          <br></br>
          <div className="flex-1 w-1/2 text-gray-800 sm:w-1/2 md:w-1/2 lg:w-1/2 h-full whitespace-pre-wrap z-10 text-center text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-bold mt-0">
            {props.titleTranslated}
          </div>
        </div>
      )}

      {contentRows.map((item, index) => (
        <div className="flex" key={index}>
          <div className="border-r-2 border-blue-700 flex-1 w-1/2 sm:w-1/2 md:w-1/2 lg:w-1/2 h-full whitespace-pre-wrap z-10 text-center pb-4">
            {item}
          </div>
          <div className="flex-1 w-1/2 text-gray-800 sm:w-1/2 md:w-1/2 lg:w-1/2 h-full whitespace-pre-wrap z-10 text-center">
            {translatedRows ? translatedRows[index] : ''}
          </div>
        </div>
      ))}
      {props.bottomRegion}
    </section>
  )
}
