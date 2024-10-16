import React from 'react'
import * as S from './Banner.styles'
import Image from 'next/image'
import {
  Banner1,
  Banner2,
  Banner4,
  Banner5,
  Banner6,
  Banner7,
} from '../../../../public/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import SwiperCore from 'swiper'

SwiperCore.use([Autoplay, Navigation, Pagination])

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const slideData = [
  {
    id: 7,
    text: 'banner7',
    image: <Image src={Banner7} alt="Banner 7" />,
  },
  {
    id: 3,
    text: 'banner6',
    image: <Image src={Banner6} alt="Banner 6" />,
  },
  {
    id: 1,
    text: 'banner1',
    image: <Image src={Banner1} alt="Banner 1" />,
  },
  {
    id: 2,
    text: 'banner2',
    image: <Image src={Banner2} alt="Banner 2" />,
  },

  {
    id: 4,
    text: 'banner4',
    image: <Image src={Banner4} alt="Banner 4" />,
  },
  {
    id: 5,
    text: 'banner5',
    image: <Image src={Banner5} alt="Banner 5" />,
  },
]

function Banner() {
  return (
    <S.BannerSwiper className="swiper-container">
      <Swiper
        observer={true}
        observeParents={true}
        loop={true}
        slidesPerView={1}
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        {slideData.map(slide => (
          <SwiperSlide key={slide.id}>{slide.image}</SwiperSlide>
        ))}
      </Swiper>
    </S.BannerSwiper>
  )
}

export default Banner
