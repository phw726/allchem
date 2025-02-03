import styled from '@emotion/styled'
import React from 'react'

interface AniTextProps {
  children: string
}

export default function AniText({ children }: AniTextProps) {
  const characters = children.split('') // 문자열을 개별 문자로 분할

  return (
    <Background>
      <Maintext>
        {characters.map((char, index) => (
          <span key={index} style={{ animationDelay: `${index * 0.1}s` }}>
            {char}
          </span>
        ))}
      </Maintext>
    </Background>
  )
}
const Background = styled.div`
  width: 160px;
  height: 100%;
  -webkit-font-smoothing: antialiased;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  background: rgba(15, 43, 122, 0.301);
  border-radius: 30px;
  box-shadow: 0px 0px 10px rgba(255, 255, 255, 1);
  transition: all 0.5s ease;
  flex-shrink: 0;

  @media (max-width: 870px) {
    width: 100px;
  }

  &:hover {
    transition: all 0.5s ease;
    border-radius: 4px;
    background: linear-gradient(to left, #55a2a6, #184e99);
    box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.5);

    span {
      animation: none;
    }
  }
`

const Maintext = styled.div`
  width: auto;
  height: auto;
  word-break: keep-all;
  flex-shrink: 0;

  span {
    position: relative;
    top: 0;
    display: inline-block;
    animation: bounce 0.7s ease infinite alternate;
    font-family: 'Titan One', cursive;
    font-size: 20px;
    color: white;
    text-shadow:
      0 1px 0 #494949,
      0 2px 0 #474747,
      0 3px 0 #474747,
      /* 0 4px 0 #ccc,
      0 5px 0 #ccc,
      0 6px 0 transparent,
      0 7px 0 transparent,
      0 8px 0 transparent,
      0 9px 0 transparent, */
        0 10px 8px rgba(0, 0, 0, 0.1);
    @media (max-width: 870px) {
      font-size: 15px;
    }

    &:nth-of-child(2) {
      animation-delay: 0.1s;
    }
    &:nth-of-child(3) {
      animation-delay: 0.2s;
    }
    &:nth-of-child(4) {
      animation-delay: 0.3s;
    }
    &:nth-of-child(5) {
      animation-delay: 0.4s;
    }
    &:nth-of-child(6) {
      animation-delay: 0.5s;
    }
    &:nth-of-child(7) {
      animation-delay: 0.6s;
    }
    &:nth-of-child(8) {
      animation-delay: 0.7s;
    }
    &:nth-of-child(9) {
      animation-delay: 0.8s;
    }
    &:nth-of-child(10) {
      animation-delay: 0.9s;
    }
    &:nth-of-child(11) {
      animation-delay: 1s;
    }

    @keyframes bounce {
      100% {
        top: -3px;
        text-shadow:
          0 1px 0 #474747,
          0 2px 0 #474747,
          0 3px 0 #474747,
          /* 0 4px 0 #ccc,
          0 5px 0 #ccc,
          0 6px 0 #ccc,
          0 7px 0 #ccc,
          0 8px 0 #ccc,
          0 9px 0 #ccc,*/
            0 50px 25px rgba(0, 0, 0, 0.1);
      }
    }
  }
`
