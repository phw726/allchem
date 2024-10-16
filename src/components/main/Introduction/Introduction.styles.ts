import AniText from '@/components/common/Buttons/aniText'
import styled from '@emotion/styled'
import Link from 'next/link'

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: justify-contents;
  align-items: center;
  width: 100%;
  height: 500px;
  background-color: #edf0f5;
  margin-top: 100px;

  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 10px 5px;
  z-index: 1;
  /* 
  @media (max-width: 1199px) {
    height: unset;
    padding: 150px 0 60px;
  }
*/
  @media (max-width: 760px) {
    height: 400px;
  }
`

export const BackgroundImage = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  height: 500px;
  background-position: center;
  /* background-color: #edf0f5; */

  /* transform: scale(1.4); */
  opacity: 0.7;
  overflow: hidden;

  @media (max-width: 760px) {
    height: 400px;
  }

  /* 
  @media (min-width: 1200px) {
    background: linear-gradient(115deg, #fff 3%, #f5ecfc 96%);

    & > img:last-of-type {
      display: none;
    }
  }

  @media (max-width: 1199px) {
    & > img:first-of-type {
      display: none;
    }
  } */
`

// IntroText Component Styles

export const IntroText = styled.div`
  position: absolute;
  height: auto;
  margin: 140px 10px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  /* top: 25%; */
  /* transform: translateY(40%); */

  @media (max-width: 760px) {
    margin-top: 120px;
  }
`

export const MainText = styled.div`
  font-size: 40px;
  font-weight: 600;
  color: #22272b;
  text-align: center;
  line-height: 1.3;

  @media (max-width: 870px) {
    font-size: 35px;
  }

  @media (max-width: 760px) {
    font-size: 30px;
  }

  span {
    color: black;
    /* text-shadow: 1px 0px 2px rgba(0, 0, 0, 0.3); */
  }
`

export const SubText = styled.div`
  margin-top: 20px;
  /* font-family: Pretendard; */
  font-size: 20px;
  color: #22272b;
  font-weight: 400;
  width: auto;
  height: auto;

  @media (max-width: 870px) {
    font-size: 16px;
    text-align: center;
  }
`

export const IntroWrapper = styled.div`
  display: flex;
  position: absolute;
  width: auto;
  height: auto;
  text-align: center;
  justify-content: center;
  align-items: center;
  /* margin-top: 340px; */
  margin: 340px 100px 0;

  @media (max-width: 870px) {
    margin-top: 310px;
  }

  @media (max-width: 760px) {
    margin-top: 270px;
  }
`

export const SearchButton = styled.button`
  /* display: flex; */
  justify-content: center;
  width: auto;
  align-items: center;
  margin-left: 10px;
  cursor: pointer;
  border: none;
  background: none;
  font-size: inherit;
  height: 32px;
  margin-bottom: 20px;

  /* @media (max-width: 1199px) {
    margin-top: 59px;
  }
     */

  @media (max-width: 870px) {
    width: 166px;
  }
`
