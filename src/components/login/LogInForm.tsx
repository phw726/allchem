import React, { useState } from 'react'
import * as S from './LogInForm.styles'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebookF } from 'react-icons/fa'
import { SiNaver } from 'react-icons/si'
import { RiKakaoTalkFill } from 'react-icons/ri'
import { MdOutlineEmail, MdOutlinePassword } from 'react-icons/md'
import { MainImg5 } from '../../../public/image'
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { useRouter } from 'next/router'
import { app } from '../../../firebase'

export type LogInType = 'signup' | 'login'

interface LoginFormProps {
  type: LogInType
}

export default function LogInForm({ type }: LoginFormProps) {
  const [error, setError] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordConfirm, setPasswordConfirm] = useState<string>('')
  const route = useRouter()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (type === 'signup') {
      try {
        const auth = getAuth(app)
        await createUserWithEmailAndPassword(auth, email, password)

        alert('회원가입에 성공했습니다.')
        route.push('/')
      } catch (error: any) {
        console.log(error)
        console.log('email', email, 'password', password)
        alert('회원가입에 실패했습니다.')
      }
    } else {
      try {
        const auth = getAuth(app)
        await signInWithEmailAndPassword(auth, email, password)

        alert('로그인에 성공했습니다.')
        route.push('/')
      } catch (error: any) {
        alert(error?.code)
      }
    }
  }
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e

    if (name === 'email') {
      setEmail(value)

      const validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

      if (!value?.match(validRegex)) {
        setError('이메일 형식이 올바르지 않습니다.')
      } else {
        setError('')
      }
    }

    if (name === 'password') {
      setPassword(value)

      if (value?.length < 6) {
        setError('비밀번호는 6자 이상으로 입력해주세요.')
      } else if (passwordConfirm?.length > 0 && value !== passwordConfirm) {
        setError('비밀번호가 일치하지 않습니다.')
      } else {
        setError('')
      }
    }

    if (name === 'password_confirm') {
      setPasswordConfirm(value)

      if (value?.length < 6) {
        setError('비밀번호는 6자 이상으로 입력해주세요.')
      } else if (value !== password) {
        setError('비밀번호가 일치하지 않습니다.')
      } else {
        setError('')
      }
    }
  }
  return (
    <S.Wrapper onSubmit={onSubmit}>
      <S.BackgroundImage
        src={MainImg5}
        alt="backgroundImg"
        priority
        sizes="auto"
        fill
        style={{ objectFit: 'cover' }}
      />
      <S.LoginWrapper>
        <S.InputWrapper>
          <S.Input
            type="email"
            name="email"
            id="email"
            required
            placeholder="Email"
            value={email}
            onChange={onChange}
          />
          <MdOutlineEmail css={S.IconStyle} />
        </S.InputWrapper>
        <S.InputWrapper>
          <S.Input
            type="password"
            name="password"
            id="password"
            required
            value={password}
            placeholder="Password"
            onChange={onChange}
          />
          <MdOutlinePassword css={S.IconStyle} />
        </S.InputWrapper>
        {type === 'signup' && (
          <S.InputWrapper>
            <S.Input
              type="password"
              name="passwordConfirm"
              id="passwordConfirm"
              required
              placeholder="PasswordConfirm"
              onChange={onChange}
            />
            <MdOutlinePassword css={S.IconStyle} />
          </S.InputWrapper>
        )}

        {error && error?.length > 0 && <S.Error>{error}</S.Error>}

        <S.Button type="submit" disabled={error?.length > 0} $isActive={true}>
          {type === 'login' ? 'SIGN IN' : 'SIGN UP'}
        </S.Button>
        <S.SignUpWrapper>
          {type === 'login' ? (
            <>
              <S.SignUpText>
                Don't have an account?
                <S.SignUpLink href="/signup">Sign up</S.SignUpLink>
              </S.SignUpText>
              <S.ForgetPW href="/">Forgot your password?</S.ForgetPW>
            </>
          ) : (
            <>
              <S.SignUpText>
                Do you have an account?
                <S.SignUpLink href="/login">Sign In</S.SignUpLink>
              </S.SignUpText>
              <S.TermsOfService>
                By signing up, you agree to our
                <S.ForgetPW href="/">Terms of Service</S.ForgetPW> and
                <S.ForgetPW href="/">Privacy Policy</S.ForgetPW>.
              </S.TermsOfService>
              <S.Version>Version 1.4.3</S.Version>
            </>
          )}
        </S.SignUpWrapper>
      </S.LoginWrapper>
      <S.OAuthWrapper>
        <S.Icon>
          <FcGoogle css={{ fontSize: '18px' }} />
          Sign In with Google
        </S.Icon>
        <S.Icon>
          <FaFacebookF css={{ fontSize: '18px', fill: '#1674EA' }} />
          Sign In with Facebook
        </S.Icon>
        <S.Icon>
          <SiNaver css={{ fontSize: '12px', fill: '#03C85D' }} />
          Sign In with Naver
        </S.Icon>
        <S.Icon>
          <RiKakaoTalkFill css={{ fontSize: '18px', fill: 'black' }} />
          Sign In with Kakao
        </S.Icon>
      </S.OAuthWrapper>
    </S.Wrapper>
  )
}
