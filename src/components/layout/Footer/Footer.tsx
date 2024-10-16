import Link from 'next/link'
import * as S from './Footer.styles'
import Image from 'next/image'
import { ILogo3, MainImg5 } from '../../../../public/image'
import { FaFacebookSquare, FaTelegram, FaTwitter } from 'react-icons/fa'
import { IoMdMail } from 'react-icons/io'
import { TfiGoogle } from 'react-icons/tfi'

export default function Footer() {
  return (
    <S.Wrapper>
      <S.FooterImg
        src={MainImg5}
        alt="Footer img"
        fill
        style={{ objectFit: 'cover' }}
        priority={false}
      />
      <FooterMenu />
      <S.Content>
        <Service />
      </S.Content>
    </S.Wrapper>
  )
}

function FooterMenu() {
  return (
    <S.FooterMenu>
      <S.FooterMenuContent>
        <S.LeftMenu>
          <Link href="/quests">Quests</Link>
          <a
            href="https://docs.plexus.app/plexus/user-guide/connect-wallet"
            target="_blank"
            rel="noreferrer"
          >
            User Guide
          </a>
          <a
            href="https://docs.plexus.app/plexus/plexus/roadmap"
            target="_blank"
            rel="noreferrer"
          >
            Roadmap
          </a>
          <a
            href="https://docs.plexus.app/plexus/notice/faq"
            target="_blank"
            rel="noreferrer"
          >
            FAQ
          </a>
        </S.LeftMenu>

        <S.RightMenu>
          <S.Community
            href="https://facebook.com/allchem"
            target="_blank"
            onClick={e => e.preventDefault()}
          >
            <FaFacebookSquare />
          </S.Community>
          <S.Community
            href="https://twitter.com/allchem"
            target="_blank"
            onClick={e => e.preventDefault()}
          >
            <FaTwitter />
          </S.Community>
          <S.Community
            href="https://allchem/community"
            target="_blank"
            onClick={e => e.preventDefault()}
          >
            <FaTelegram />
          </S.Community>
          <S.Community
            href="mailto:allchem@gmail.com"
            target="_blank"
            onClick={e => e.preventDefault()}
          >
            <TfiGoogle />
          </S.Community>
          <S.Community
            href="mailto:hello@allchem.app"
            target="_blank"
            onClick={e => e.preventDefault()}
          >
            <IoMdMail />
          </S.Community>
        </S.RightMenu>
      </S.FooterMenuContent>
    </S.FooterMenu>
  )
}

function Service() {
  return (
    <S.Service>
      <S.Logo>
        <Image src={ILogo3} alt="ALLCHEM Logo" width={'50'} />
        <S.FooterLogoText>ALLCHEM</S.FooterLogoText>
      </S.Logo>
      <S.Description>
        ALLCHEM is designed to help you quickly and easily compare chemical
        information in real-time, empowering researchers, scientists, and
        industry professionals to work smarter, not harder.
      </S.Description>
      <S.Copyright>Copyright © 2024 ALLCHEM Inc.</S.Copyright>
    </S.Service>
  )
}
