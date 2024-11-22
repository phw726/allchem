import AuthContext from '../../hook/AuthContext'
import React, { useContext } from 'react'
import * as S from './mypage.styles'
import { UserImg2 } from '../../../public/image'

export default function Profile() {
  const { user } = useContext(AuthContext)

  const getLoginProvider = () => {
    if (!user?.providerData) return 'Allchem account'
    const provider = user.providerData[0]?.providerId
    switch (provider) {
      case 'google.com':
        return 'Google account'
      case 'kakao.com':
        return 'Kakao account'
      case 'naver.com':
        return 'Naver account'
      case 'password':
        return 'Allchem account'
      default:
        return 'Authorized User'
    }
  }

  /// TODO : profile editor ///

  return (
    <S.ProfileWrapper>
      <S.UserImg
        src={user?.photoURL || UserImg2}
        alt="profile Img"
        width={100}
        height={100}
      />
      <S.UserInfo>
        <S.Email>
          {user?.email}
          <small>({getLoginProvider()})</small>
        </S.Email>
        <S.Name>{user?.displayName || 'Authorized User'}</S.Name>
      </S.UserInfo>
    </S.ProfileWrapper>
  )
}
