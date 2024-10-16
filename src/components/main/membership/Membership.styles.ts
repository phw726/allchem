import styled from '@emotion/styled'
import { motion } from 'framer-motion'

export const Wrapper = styled.div`
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding-top: 250px;
  padding-bottom: 150px;
  background: #edf0f5;
`

export const Title = styled.div`
  position: relative;
  z-index: 1;
  font-family: Jaldi;
  font-size: 50px;
  font-weight: 700;
  color: #22272b;
  margin-bottom: 40px;
  /* 
  @media (max-width: 1199px) {
    font-size: 36px;
  }

  @media (max-width: 767px) {
    font-size: 35px;
  } */
`

export const SubTitle = styled.div`
  position: relative;
  z-index: 1;
  margin-top: 10px;
  font-family: Jaldi;
  font-size: 32px;
  line-height: 1.18;
  text-align: center;
  color: #22272b;

  strong {
    font-weight: 600;
  }

  /* @media (max-width: 767px) {
    font-size: 21px;
  } */
`

export const Description = styled.div`
  position: relative;
  z-index: 1;
  margin-top: 25px;
  font-family: Pretendard;
  font-size: 16px;
  color: #22272b;
  text-align: center;
  line-height: 1.4;
  width: 80%;
  margin-bottom: 100px;

  /* @media (max-width: 767px) {
    font-size: 14px;
  } */
`

export const Links = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  gap: 10px;
  margin-top: 40px;

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
`

export const LeftAnimation = styled(motion.div)`
  position: absolute;
  top: 100px;
  left: -40px;
  /* transform: translateX(-100px); */

  /* @media (max-width: 1199px) {
    top: -40px;
    left: -30px;
  } */
`

export const LeftBackgroundObject = styled.div`
  position: absolute;
  width: 250px;
  height: 200px;
  opacity: 0.5;

  /* 
  @media (max-width: 1199px) {
    width: 250px;
    height: 191px;
  }

  @media (max-width: 767px) {
    width: 180px;
    height: 137px;
  } */
`

export const RightAnimation = styled(motion.div)`
  position: absolute;
  bottom: 10px;
  right: -10px;
  opacity: 0.3;

  /* @media (max-width: 1199px) {
    bottom: -10px;
    right: -30px;
  } */
`

export const RightBackgroundObject = styled.div`
  position: relative;
  width: 150px;
  height: 250px;

  /* @media (max-width: 1199px) {
    width: 230px;
    height: 161px;
  }

  @media (max-width: 767px) {
    width: 200px;
    height: 140px;
  } */
`
