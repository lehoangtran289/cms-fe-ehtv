import '@@/styles/globals.css'
import 'react-image-gallery/styles/css/image-gallery.css'
// Import Swiper styles
import 'swiper/swiper.scss'
import 'swiper/components/navigation/navigation.scss'
import 'swiper/components/pagination/pagination.scss'
import 'swiper/components/scrollbar/scrollbar.scss'
import '../css/layout.css'
import '../css/alert.css'
import '../scss/butterfly.scss'
import '../scss/bee.scss'
import '../scss/font.scss'
import '../scss/bird.scss'
import '../scss/button.scss'

import { useEffect } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import MultiBackend, {
  MouseTransition,
  TouchTransition
} from 'react-dnd-multi-backend'
import { TouchBackend } from 'react-dnd-touch-backend'

import { init } from '@/utils/ga'

const HTML5toTouch = {
  backends: [
    {
      id: 'html5',
      backend: HTML5Backend,
      transition: MouseTransition
    },
    {
      id: 'touch',
      backend: TouchBackend, // Note that you can call your backends with options
      options: { enableMouseEvents: true },
      preview: true,
      transition: TouchTransition
    }
  ]
}

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    init('G-9H94WHKZMQ')
  }, [])
  return (
    <DndProvider backend={MultiBackend} options={HTML5toTouch}>
      <Component {...pageProps} />
    </DndProvider>
  )
}

export default MyApp
