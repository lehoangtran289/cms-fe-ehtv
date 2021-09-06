import styled from 'styled-components'
import tw from 'twin.macro'

interface GradientBorderProps {
  color?: string
  size?: number
  background?: string
  borderWidth?: number
}

const GradientBorder = styled.section<GradientBorderProps>`
  ${tw``}
  --border-width: ${props => `${props.borderWidth || 5}px`};

  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${props => `${props.size || 50}px`};
  height: ${props => `${props.size || 50}px`};
  color: ${props => props.color || 'white'};
  background: ${props => props.background || '#222'};
  border-radius: var(--border-width);
  &::after {
    position: absolute;
    content: '';
    top: calc(-1 * var(--border-width));
    left: calc(-1 * var(--border-width));
    z-index: -1;
    width: calc(100% + var(--border-width) * 2);
    height: calc(100% + var(--border-width) * 2);
    background: linear-gradient(
      60deg,
      hsl(224, 85%, 66%),
      hsl(269, 85%, 66%),
      hsl(314, 85%, 66%),
      hsl(359, 85%, 66%),
      hsl(44, 85%, 66%),
      hsl(89, 85%, 66%),
      hsl(134, 85%, 66%),
      hsl(179, 85%, 66%)
    );
    background-size: 300% 300%;
    background-position: 0 50%;
    border-radius: calc(2 * var(--border-width));
    animation: moveGradient 4s alternate infinite;
  }

  @keyframes moveGradient {
    50% {
      background-position: 100% 50%;
    }
  }
`

export default GradientBorder
