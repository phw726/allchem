import styled from '@emotion/styled'

export const Wrapper = styled.div<{ $bgColor?: string; $isFooter?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: auto;
  ${({ $bgColor }) => ($bgColor ? `background: ${$bgColor};` : '')}

  a {
    text-decoration: none;
  }
`

export const Content = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  margin-bottom: 80px;
`
