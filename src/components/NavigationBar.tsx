import classnames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import styled from 'styled-components'

import { languages } from '@/utils/config'
import { PAGE_LANGUAGE } from '@/utils/LocalStorageKey'

const animatedComponents = makeAnimated()

const languageStyles = language => {
  if (language) {
    return {
      control: styles => ({
        ...styles,
        filter: 'brightness(110%)',
        backgroundImage: `url('/images/languages/${language.value}/flag.svg')`,
        backgroundSize: '100% 100%',
        color: '#FFFFFF'
      }),
      option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return {
          ...styles,
          color: '#FFFFFF',
          backgroundColor: 'white',
          filter: 'brightness(110%)',
          backgroundImage: `url('/images/languages/${data.value}/flag.svg')`,
          backgroundSize: '100% 100%',
          borderRadius: '5px',
          cursor: 'pointer',
          display: isSelected ? 'none' : ''
        }
      }
    }
  }
}

export default function NavigationBar({ ...props }: { onLanguageChange }) {
  const router = useRouter()
  const languageOptions = languages.map((value, index) => {
    return {
      value: value.languageCode,
      label: 'I'
    }
  })

  const [language, setLanguage] = useState(null)

  useEffect(() => {
    if (localStorage) {
      const oldLanguageCode = localStorage.getItem(PAGE_LANGUAGE)

      setLanguage(
        oldLanguageCode
          ? languageOptions.find(value => value.value === oldLanguageCode)
          : languageOptions[0]
      )
    }
  }, [])

  return (
    <div className="flex flex-col fixed top-0 right-0 mr-2 mt-2 z-60">
      <div className="w-12 md:w-20">
        <Link href="/">
          <div className="clear-left">
            <HomeButton
              className={classnames({ active: router.pathname === '/' })}
            />
          </div>
        </Link>
      </div>
      <div className="w-12 md:w-20 mt-2">
        <Select
          defaultValue={languageOptions[0]}
          value={language}
          options={languageOptions}
          components={animatedComponents}
          styles={languageStyles(language)}
          onChange={event => {
            setLanguage(
              languageOptions.find(value => value.value === event.value)
            )
            props.onLanguageChange(event.value)
          }}
          isSearchable={false}
          instanceId={'language'}
          // theme={theme => ({
          //   ...theme,
          //   borderRadius: 0
          //   colors: {
          //     primary25: 'white',
          //     primary: 'white'
          //   }
          // })}
        />
      </div>
      {/* <MenuButton /> */}
    </div>
  )
}

const HomeButton = styled.img.attrs({
  src: '/images/icons/home.svg',
  className: 'rounded-full shadow cursor-pointer'
})`
  & {
    background: radial-gradient(#ffdf00 0%, #ffab00 60%, #ffab00 100%);
  }

  &:hover,
  &.active {
    background: radial-gradient(#ffdf00 0%, #ff4500 60%, #ff4500 100%);
  }
`

const MenuButton = styled.img.attrs({
  src: '/images/icons/menu.svg',
  className: 'w-8 md:w-20 rounded-full shadow mt-2 cursor-pointer'
})`
  & {
    background: radial-gradient(#ffdf00 0%, #ffab00 60%, #ffab00 100%);
  }

  &:hover,
  &.active {
    background: radial-gradient(#ffdf00 0%, #ff4500 60%, #ff4500 100%);
  }
`
