import React, { useEffect, useRef, useState } from 'react'
import * as S from './postUtils.styles'
import { IoShareSocialOutline } from 'react-icons/io5'
import { RiFacebookBoxFill, RiKakaoTalkFill } from 'react-icons/ri'
import { SiNaver } from 'react-icons/si'
import { FaTwitter } from 'react-icons/fa'

function useOnClickOutside(
  ref: React.RefObject<HTMLDivElement>,
  handler: (event: MouseEvent | TouchEvent) => void,
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return
      }
      handler(event)
    }
    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)
    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])
}

export default function PostShared() {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleModalOpen = () => {
    setIsOpen(prev => !prev)
  }

  return (
    <>
      {isOpen && <Modal handleModalOpen={handleModalOpen} />}
      <S.UtilBtn type="button" onClick={handleModalOpen} $active={isOpen}>
        <IoShareSocialOutline />
      </S.UtilBtn>
    </>
  )
}

interface ModalType {
  handleModalOpen: () => void
}

function Modal({ handleModalOpen }: ModalType) {
  const modalRef = useRef(null)
  const currentUrl = window.location.href

  useOnClickOutside(modalRef, handleModalOpen)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl)
      alert('URL has been copied')
    } catch (error) {
      console.error('Failed to copy', error)
    }
  }

  return (
    <S.ModalWrapper ref={modalRef}>
      <S.ModalUtilWrapper>
        <S.ModalTitle>Share with</S.ModalTitle>
        <S.ModalCloseBtn onClick={handleModalOpen}>X</S.ModalCloseBtn>
      </S.ModalUtilWrapper>
      <S.ModalItemWrapper>
        <S.ModalItem
          href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <RiFacebookBoxFill css={{ fill: '#0d488f' }} />
        </S.ModalItem>
        <S.ModalItem
          href={`https://twitter.com/intent/tweet?url=${currentUrl}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter css={{ fill: '#1674EA' }} />{' '}
        </S.ModalItem>
        <S.ModalItem
          href={`https://share.kakao.com/?url=${currentUrl}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <RiKakaoTalkFill css={{ fill: 'black' }} />
        </S.ModalItem>
        <S.ModalItem
          href={`https://share.naver.com/web/shareView.nhn?url=${currentUrl}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <SiNaver css={{ fill: '#03C85D', fontSize: '20px' }} />
        </S.ModalItem>
      </S.ModalItemWrapper>
      <S.LinkWrapper>
        <S.PostLink>{currentUrl}</S.PostLink>
        <S.LinkCopyBtn onClick={copyToClipboard}>COPY</S.LinkCopyBtn>
      </S.LinkWrapper>
    </S.ModalWrapper>
  )
}
