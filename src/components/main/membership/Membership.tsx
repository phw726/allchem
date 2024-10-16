import React, { useRef } from 'react'
import * as S from './Membership.styles'
import Image from 'next/image'
import { AnimationImg2, AnimationImg3 } from '../../../../public/image'
import AniBtn from '@/components/common/Buttons/aniBtn'

// &apos;

export default function Membership() {
  return (
    <S.Wrapper>
      <S.Title data-aos="fade-up">Membership Service Open</S.Title>
      <S.SubTitle data-aos="fade-up" data-aos-delay="400">
        Join our membership to enjoy
        <br />
        <strong>
          unlimited access to {''}
          <span style={{ color: '#027efb' }}>Premium research </span>
        </strong>
      </S.SubTitle>
      <S.Description data-aos="fade-up" data-aos-delay="500">
        ALLCHEM offers a membership that provides unlimited access to not only
        free research but also premium paid research. Join our membership to
        quickly and easily access reliable research.
      </S.Description>
      <div data-aos="fade-up" data-aos-delay="400">
        <AniBtn>Join Membership</AniBtn>
      </div>

      <S.LeftAnimation
        data-aos="fade-right"
        initial={{ opacity: 0 }}
        animate={{
          x: -3,
          y: -10,
          rotate: -10,
          opacity: 1,
        }}
        transition={{
          ease: 'easeOut',
          duration: 10,
        }}
      >
        <S.LeftBackgroundObject>
          <Image
            data-aos="fade-up"
            src={AnimationImg3}
            alt="ALLCHAM Memebership Image"
            fill
            sizes="auto"
            priority={false}
          />
        </S.LeftBackgroundObject>
      </S.LeftAnimation>

      <S.RightAnimation
        animate={{ y: [3, -3] }}
        transition={{
          duration: 1,
          delay: 0.1,
          type: 'spring',
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      >
        <S.RightBackgroundObject data-aos="fade-right">
          <Image
            src={AnimationImg2}
            alt="ALLCHEM Memebership Point"
            fill
            sizes="auto"
            priority={false}
          />
        </S.RightBackgroundObject>
      </S.RightAnimation>
    </S.Wrapper>
  )
}
