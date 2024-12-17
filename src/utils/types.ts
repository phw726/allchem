export type ResponseTemplateType<DataType> = {
  success: boolean
  message: string
  code: number
  data: DataType
}

export type PostCategoryType = 'Community' | 'Q&A'

// const userId = user?.userId || user?.uid

// type UserIdentity = { uid: string } | { userId: string }

export interface PostProps {
  postId: string
  userId: string
  uid: string ///firebase UID
  title: string
  email: string
  content: string
  createdAt: string
  updatedAt?: string
  category: PostCategoryType
  files?: string[]
}
export interface CommentProps {
  email?: string
  commentId?: string // 코멘트 Id
  postId: string // 게시글 Id
  userId: string // 현재 user Id
  uid?: string // firebase uid
  content: string
  createdAt: string
  updatedAt?: string
}

export interface LikeProps {
  likeId?: string
  postId: string
  userId: string
  uid?: string
  createdAt: string
}

export interface BookMarkProps {
  postId?: string
  userId?: string
  uid?: string
  createdAt?: string
}
