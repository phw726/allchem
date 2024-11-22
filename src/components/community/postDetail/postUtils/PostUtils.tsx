import React from 'react'
import * as S from './postUtils.styles'
import PostBookmark from './PostBookmark'
import { PostProps } from '../../postForm/PostForm'
import PostLike from './PostLike'
import PostShared from './PostShared'

export interface PostUtilProps {
  post: PostProps
  getPost: (id: string) => Promise<void>
}

export default function PostUtils({ post, getPost }: PostUtilProps) {
  return (
    <S.UtilsWrapper>
      <S.UtilItems>
        <PostLike post={post} getPost={getPost} />
      </S.UtilItems>
      <S.UtilItems>
        <PostBookmark post={post} getPost={getPost} />
      </S.UtilItems>
      <S.UtilItems>
        <PostShared />
      </S.UtilItems>
    </S.UtilsWrapper>
  )
}

/// like -> 갯수 늘어나는거 실시간 보여쥼... like한 유저 보여주기...? // 마이페이지에서 목록화
/// 북마크 -> 마이페이지 목록...
/// 공유하기 : 공유하기 버튼 누르면 모달창 뜨기..  카카오, 네이버, 페이스북, 트위터,,,,현재 글 주소 복사
