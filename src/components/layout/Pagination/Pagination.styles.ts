import styled from '@emotion/styled'

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 30px;
  padding-top: 90px;
  padding-bottom: 45px;
  /* border-top: 1px solid #e0e0e0; */
  margin: 0 20px;
  /* 
  @media (max-width: 1199px) {
    margin-top: 60px;
  }

  @media (max-width: 767px) {
    gap: 20px;
  } */
`

export const Item = styled.div<{ $active: boolean }>`
  display: flex;
  align-items: center;
  text-align: center;
  margin-bottom: 4px;
  font-size: 18px;
  color: ${({ $active }) => ($active ? 'royalblue' : '#8e9294')};
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: black;
    font-weight: 600;
  }
`

export const Arrow = styled.div`
  width: 24px;
  height: 24px;
  cursor: pointer;

  svg {
    font-size: 20px;
    color: #8e9294;
    transition: all 0.2s ease;
  }

  &:hover {
    svg {
      color: black;
    }
  }
`

export const ArrowWrapper = styled.div<{ $isRight?: boolean }>`
  display: flex;
  text-align: center;
  align-items: center;
  gap: 10px;

  ${Arrow} {
    ${({ $isRight }) => ($isRight ? 'transform: rotateZ(-180deg)' : '')};
  }
`
