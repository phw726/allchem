import styled from '@emotion/styled'

export const BannerSwiper = styled.div`
  position: relative;
  margin-top: 20px;
  width: 100%;
  height: auto;

  &:hover,
  &:focus {
    transition: all 0.3s linear;
  }

  .swiper-pagination {
    position: relative;
    color: lightgray;
    margin-top: 4px;
  }

  .swiper-pagination-bullet {
    width: 6px;
    height: 6px;
    &-active {
      background-color: #56a9ac;
    }
  }

  .swiper-container {
    width: 100%;
    height: auto;
    position: relative;
  }
  /*왼쪽 화살표 스타일링*/

  .swiper-button-next::after,
  .swiper-button-prev::after {
    font-size: 15px;
    color: #fff;
    display: flex;
    justify-content: center;
    text-shadow: 1px 1px 2px gray;
  }
  .swiper-button-next,
  .swiper-button-prev {
    position: absolute;
    background-color: lightgray;
    z-index: 10;
    border-radius: 100%;
    width: 30px;
    height: 30px;
    padding: 5px;
    opacity: 0.2;
    top: 40%;
    bottom: 0;

    &:hover,
    &:focus {
      transition: all 0.3s ease;
      opacity: 0.7;
      box-shadow: 2px 2px 1px rgba(0, 0, 0, 0.2);
    }
  }

  img {
    width: 100%;
    max-width: 400px;
    height: 80px;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    margin: 2px auto;
    box-shadow: 2px 2px 1px rgba(0, 0, 0, 0.2);
  }
`
