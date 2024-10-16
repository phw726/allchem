import React from 'react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

export default function AniBtn({ children }: { children: string }) {
  return (
    <div css={frameStyle}>
      <MembershipBtn>
        <span>{children}</span>
      </MembershipBtn>
    </div>
  )
}

const frameStyle = css`
  width: 100%;
  text-align: center;
`

export const MembershipBtn = styled.button`
  flex-shrink: 0;
  position: relative;
  display: inline-block;
  padding: 10px 25px;
  font-size: 17px;
  font-family: 'Lato', sans-serif;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(
    0deg,
    rgba(0, 172, 238, 1) 0%,
    rgba(2, 126, 251, 1) 100%
  );
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #fff; /* Hover 시 배경을 흰색으로 변경 */
    color: rgba(2, 126, 251, 1); /* Hover 시 텍스트 색상 변경 */
  }

  /* 모든 방향의 라인 */
  &::before,
  &::after,
  span::before,
  span::after {
    content: '';
    position: absolute;
    background-color: rgba(2, 126, 251, 1);
    transition: all 0.3s ease;
  }
  /* 위쪽 라인 */
  &::before {
    top: 0;
    left: 0;
    height: 2px;
    width: 0;
  }

  /* 왼쪽 라인 */
  &::after {
    top: 0;
    left: 0;
    width: 2px;
    height: 0;
  }

  /* 아래쪽 라인 */
  span::before {
    bottom: 0;
    right: 0; /* 오른쪽 아래에서 시작 */
    height: 2px;
    width: 0;
  }

  /* 오른쪽 라인 */
  span::after {
    bottom: 0;
    right: 0; /* 오른쪽 아래에서 시작 */
    width: 2px;
    height: 0;
  }

  /* hover 시 모든 라인 동시 확장 */
  &:hover::before {
    width: 100%; /* 위쪽 라인 확장 */
  }

  &:hover::after {
    height: 100%; /* 왼쪽 라인 확장 */
  }

  &:hover span::before {
    width: 100%; /* 아래쪽 라인 확장, 오른쪽 아래에서 왼쪽으로 확장 */
  }

  &:hover span::after {
    height: 100%; /* 오른쪽 라인 확장, 오른쪽 아래에서 위쪽으로 확장 */
  }
`
