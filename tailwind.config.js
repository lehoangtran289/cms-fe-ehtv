module.exports = {
  purge: [
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'wood-card': "url('/images/icons/wood-card-04.svg')",
        // 'footer-texture': "url('/img/footer-texture.png')",
        paper: "url('/images/backgrounds/paper-1.jpg')",
        flower: "url('/images/icons/flower.svg')",
        'flower-1': "url('/images/icons/flower-1.svg')",
        'book-header': "url('/images/book/tieu_de.png')"
      }),
      backgroundSize: theme => ({
        '100%': '100% 100%'
      }),
      fontFamily: {
        sans: ['Patrick Hand', 'cursive'],
        'open-sans': ['Open Sans']
      },
      height: {
        '70vh': '70vh',
        '85vh': '85vh',
        '80vh': '80vh'
      },
      inset: {
        1: '1rem',
        2: '2rem',
        4: '4rem',
        5: '5rem',
        6: '6rem',
        8: '8rem',
        10: '10rem',
        11: '11rem',
        12: '12rem',
        14: '14rem',
        16: '16rem',
        18: '18rem',
        20: '20rem',
        24: '24rem',
        27: '27rem',
        '-2': '-2rem',
        '-4': '-4rem',
        '-6': '-6rem',
        '-8': '-8rem',
        '-10': '-10rem',
        '-12': '-12rem',
        '40%': '40%',
        '50%': '50%',
        '75%': '75%',
        '100%': '100%',
        '150%': '150%',
        '200%': '200%',
        '250%': '250%'
      },
      zIndex: {
        1: '1',
        '-1': '-1',
        '-10': '-10',
        60: '60'
      },
      spacing: {
        72: '18rem',
        80: '20rem',
        84: '21rem',
        96: '24rem',
        108: '27rem',
        120: '30rem',
        132: '33rem',
        144: '36rem',
        156: '39rem',
        168: '42rem'
      },
      translate: {
        '1/4': '25%',
        '-1/4': '-25%',
        '3/4': '75%',
        '-3/4': '-75%'
      },
      animation: {
        'ping-slow': 'ping-slow 3s infinite alternate',
        'spin-20': 'spin 20s linear infinite',
        'spin-5': 'spin 5s linear infinite',
        'up-down': 'up-down 1.5s infinite alternate',
        'cloud-16': 'cloud 16s linear infinite',
        'cloud-20': 'cloud 20s linear infinite',
        'cloud-24': 'cloud 24s linear infinite',
        'cloud-28': 'cloud 28s linear infinite',
        'cloud-32': 'cloud 32s linear infinite',
        'vibrate-1': 'vibrate-1 1.5s infinite alternate',
        'swing-0': 'swing-0 3.5s infinite',
        'swing-1': 'swing-1 3.5s infinite',
        'swing-2': 'swing-2 3.5s infinite',
        'wood-bounce-in': 'wood-bounce-in 0.3s'
      },
      keyframes: {
        'swing-0': {
          '0%,100%': {
            transform: 'rotate(-7deg)'
          },
          '50%': {
            transform: 'rotate(7deg)'
          }
        },
        'swing-1': {
          '0%,100%': {
            transform: 'rotate(-3deg) translateY(0.2rem)'
          },
          '50%': {
            transform: 'rotate(5deg) translateY(0.6rem)'
          }
        },
        'swing-2': {
          '0%,100%': {
            transform: 'rotate(-2deg) translateY(0.2rem)'
          },
          '50%': {
            transform: 'rotate(6deg) translateY(0.4rem)'
          }
        },
        'vibrate-1': {
          '100%': {
            transform: 'rotate(15deg)'
          }
        },
        'ping-slow': {
          '0%,100%': {
            transform: 'scale(1)'
          },
          '50%': {
            transform: 'scale(1.1)'
          }
        },
        'up-down': {
          '100%': {
            transform: 'translateY(10rem) rotate(5deg)'
          }
        },
        cloud: {
          '0%': {
            marginLeft: '-200vw'
          },
          '100%': {
            marginLeft: '100vw'
          }
        },
        'wood-bounce-in': {
          '0%': {
            transform: 'matrix(-0.99999, 1.73205, -1.73205, -0.99999, 0, 100)',
            opacity: 0
          },
          '100%': {
            transform: 'matrix(1, 0, 0, 1, 0, 0)',
            opacity: 1
          }
        }
      }
    }
  },
  variants: {},
  plugins: []
}
