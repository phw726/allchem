import React, { useEffect, useState } from 'react'
import * as S from './PostForm.styles'
import QuillEditor from '@/components/common/QuillEditor'
import FileDrop, { FileWithPreview } from './FileDrop'
import { addDoc, collection, doc, getDoc, updateDoc } from '@firebase/firestore'
import { db } from '../../../../firebase'
import { useRouter } from 'next/router'
import { useParams } from 'next/navigation'
import { useAuth } from '@/components/hook/useAuth'

export type PostCategoryType = 'Community' | 'Q&A'
export const CATEGORIES: PostCategoryType[] = ['Community', 'Q&A']

export interface PostProps {
  id?: string
  title: string
  email: string
  content: string
  createdAt: string
  updatedAt: string
  uid: string
  category?: PostCategoryType
  // comments?: CommentsInterface[];
}

export default function PostForm() {
  const router = useRouter()
  const [post, setPost] = useState<PostProps | null>(null)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Community')
  const [content, setContent] = useState('')
  const [files, setFiles] = useState<FileWithPreview[]>([]) // 파일 리스트로 변경
  const { user } = useAuth()
  const params = useParams()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      if (post && post.id) {
        //만약 post 데이터 있으면 firestore로 데이터 수정

        const postRef = doc(db, 'posts', post.id)
        await updateDoc(postRef, {
          title: title,
          content: content,
          file: files.map(file => file.name),
          updatedAt: new Date()?.toLocaleDateString('ko', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
          category,
        })

        alert('게시글을 성공적으로 수정했습니다.')
        router.push(`/community/${post.id}`)
      } else {
        // 없으면 기존처럼 데이터 생성

        await addDoc(collection(db, 'posts'), {
          title: title,
          content: content,
          file: files.map(file => file.name),

          createdAt: new Date()?.toLocaleDateString('ko', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
          category,
          email: user?.email,
          uid: user?.uid,
        })

        alert('게시글을 성공적으로 생성했습니다.')
        router.push('/community')
      }
    } catch (e: any) {
      console.log(e)
      alert(e?.code)
    }
  }

  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const {
      target: { name, value },
    } = e

    if (name === 'title') {
      setTitle(value)
    }

    if (name === 'content') {
      setContent(value)
    }

    if (name === 'category') {
      setCategory(value as PostCategoryType)
    }
  }

  const handleFileChange = (files: FileWithPreview[]) => {
    setFiles(files) // 파일 리스트를 업데이트
  }

  const getPost = async (id: string) => {
    if (id) {
      const docRef = doc(db, 'posts', id)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setPost({ id: docSnap.id, ...(docSnap.data() as PostProps) })
      }
      // setPost({ id: docSnap.id, ...(docSnap.data() as PostProps) })
    }
  }

  useEffect(() => {
    const postId = Array.isArray(params?.id) ? params.id[0] : params?.id // 배열인지 확인하여 처리
    if (postId) getPost(postId)
  }, [params?.id])

  useEffect(() => {
    if (post) {
      setTitle(post?.title)
      setContent(post?.content)
      setCategory(post?.category as PostCategoryType)
    }
  }, [post])

  return (
    <S.Wrapper onSubmit={handleSubmit} id="">
      <S.MainText>Post</S.MainText>

      <S.TitleWrapper>
        <S.Category
          name="category"
          id="category"
          onChange={onChange}
          defaultValue={category}
        >
          {CATEGORIES?.map(category => (
            <option value={category} key={category}>
              {category}
            </option>
          ))}
        </S.Category>
        <S.TitleInput
          type="text"
          name="title"
          onChange={onChange}
          value={title}
          id="title"
          required
          placeholder="Title"
        />
      </S.TitleWrapper>

      <QuillEditor value={content} onChange={setContent} />

      <FileDrop onFileChange={handleFileChange} />
      <S.Button type="submit">Submit</S.Button>
    </S.Wrapper>
  )
}
