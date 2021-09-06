import styled from 'styled-components'

const PrevButton = styled.img.attrs({
  src: '/images/icons/prev.svg',
  className: 'z-50 w-12 md:w-24 ml-2 rounded-full shadow cursor-pointer'
})`
  background: radial-gradient(#ffdf00 0%, #ffab00 60%, #ffab00 100%);

  &:hover {
    background: radial-gradient(#ffdf00 0%, #ff4500 60%, #ff4500 100%);
  }
`

export default PrevButton
