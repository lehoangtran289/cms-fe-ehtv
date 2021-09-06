import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const roundedRight = {
  borderTopRightRadius: '1.25rem',
  borderBottomRightRadius: '1.25rem',
  top: '70%',
  fontSize: '2em',
  color: 'rgb(69, 130, 236)',
  padding: '0.4rem',
  outline: 0
}

export interface LessonButtonProps {
  name
  handleOnClick
}

const LessonPrevButton = (props: LessonButtonProps) => (
  <button
    className="fixed left-0 z-50 bg-orange-200 tracking-widest flex flex-row
                    transform duration-1000
                    translate-x-f3d65 lg:translate-x-f3d25 md:translate-x-f3d25 sm:translate-x-f3d65
                    hover:translate-x-0 opacity-50 hover:opacity-100 hover:shadow"
    style={roundedRight}
    onClick={props.handleOnClick}>
    <span className="h-10 text-sm lg:text-2xl">{props.name}</span>
    <FontAwesomeIcon
      className="h-8 ml-4 block m-auto"
      icon={faArrowLeft}
      size="sm"
      fixedWidth
    />
  </button>
)

export default LessonPrevButton
