import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { LessonButtonProps } from '@/components/LessonPractice/LessonPrevButton'

const roundedLeft = {
  borderTopLeftRadius: '1.25rem',
  borderBottomLeftRadius: '1.25rem',
  top: '70%',
  fontSize: '2em',
  color: 'rgb(69, 130, 236)',
  padding: '0.4rem',
  outline: 0
}

const LessonNextButton = (props: LessonButtonProps) => (
  <button
    className="fixed right-0 z-50 bg-orange-200 tracking-widest flex flex-row
                    transform duration-1000
                    -translate-x-f3d65 lg:-translate-x-f3d25 md:-translate-x-f3d25 sm:-translate-x-f3d65
                    hover:translate-x-0 opacity-50 hover:opacity-100 hover:shadow"
    style={roundedLeft}
    onClick={props.handleOnClick}>
    <FontAwesomeIcon
      className="h-8 mr-4 block m-auto"
      icon={faArrowRight}
      size="sm"
      fixedWidth
    />
    <span className="h-10 text-sm lg:text-2xl">{props.name}</span>
  </button>
)

export default LessonNextButton
