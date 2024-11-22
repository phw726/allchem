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
import { signIn } from 'next-auth/react'
import app from '../../../firebase'
import { FirebaseError } from '@firebase/app'

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
        alert('Account registered successfully.')
        route.push('/')
      } catch (error: any) {
        if (error.code === 'auth/email-already-in-use') {
          alert('This email is already in use. Please try another email.')
        } else {
          alert('Failed to register. Please try again in a few minutes')
        }
      }
    } else {
      try {
        const auth = getAuth(app)
        await signInWithEmailAndPassword(auth, email, password)

        alert('Success!')
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
        setError('The email format is incorrect.')
      } else {
        setError('')
      }
    }

    if (name === 'password') {
      setPassword(value)

      if (value?.length < 6) {
        setError('Please enter a password of at least 6 characters.')
      } else if (passwordConfirm?.length > 0 && value !== passwordConfirm) {
        setError('Password does not match.')
      } else {
        setError('')
      }
    }

    if (name === 'passwordConfirm') {
      setPasswordConfirm(value)

      if (value?.length < 6) {
        setError('Please enter a password of at least 6 characters.')
      } else if (value !== password) {
        setError('Password does not match.')
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
        <S.Icon
          type="button"
          onClick={() => signIn('google', { callbackUrl: '/' })}
        >
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
