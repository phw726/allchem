import React, { useRef, useState } from 'react'
import * as S from './Menu.styles'
import { FiArrowRightCircle, FiMenu } from 'react-icons/fi'
import { IoClose } from 'react-icons/io5'
import { css } from '@emotion/react'
import Utils from '../Utils'
import Banner from '@/components/common/Banner'
import { ILogo5 } from '../../../../public/image'
import AniBtn from '@/components/common/Buttons/aniBtn'

const MENU = [
  { name: 'Integrated Search', link: '/search' },
  { name: 'Chemical Safety Guideline', link: '/cmcgl' },
  { name: 'Chemical Safety Information', link: '/cmcinfo' },
  { name: 'Contact', link: '/contact' },
]

export default function Menu() {
  const target = useRef(null)
  const [open, setOpen] = useState<boolean>(false)

  const handleToggle = () => setOpen(prev => !prev)

  const handleClose = () => setOpen(false)

  const handleOpenPage = (link: string) => {
    if (typeof window !== 'undefined') window.open(link, '_blank')
    handleClose()
  }

  return (
    <S.Wrapper>
      <S.Button ref={target} onClick={handleToggle}>
        <FiMenu />
      </S.Button>

      <S.MenuWrapper open={open}>
        <Utils />
        <div onClick={handleClose}>
          <IoClose css={closeButton} />
        </div>
        {open && <Banner />}
        <S.MenuList>
          {MENU.map(({ name, link }) => (
            <S.MenuItem onClick={() => handleOpenPage(link)} key={name}>
              {name}
              <FiArrowRightCircle css={rightArrow} />
            </S.MenuItem>
          ))}
        </S.MenuList>
        <S.Membership href="/membership">
          <AniBtn>+ Join Membership</AniBtn>
        </S.Membership>

        <S.MenuImg src={ILogo5} alt="menu img" sizes="auto" />
      </S.MenuWrapper>
    </S.Wrapper>
  )
}

const closeButton = css`
  position: fixed;
  right: 15px;
  top: 20px;
  margin-top: 6px;
  width: 30px;
  height: 30px;
  color: #738491;
  cursor: pointer;

  &:hover {
    color: #22272b;
  }
`

const rightArrow = css`
  margin: 0 auto;
  margin-right: 0;

  &:hover {
    transition: all 0.4s;
    text-shadow: 1px 1px 3px #262626;
  }
`
