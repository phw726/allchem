import React, { useCallback, useEffect, useState } from 'react'
import * as S from './PostForm.styles'
import QuillEditor from '@/components/common/QuillEditor'
import FileDrop, { FileWithPreview } from './FileDrop'
import { addDoc, collection, doc, getDoc, updateDoc } from '@firebase/firestore'
import { db } from '../../../../firebase'
import { useRouter } from 'next/router'
import { useAuth } from '@/components/hook/useAuth'

//// all : 모든글
//// Notice : jsonplaceholder api로 연결
//// community, Q&a : firebase로 연결

export type PostCategoryType = 'Community' | 'Q&A'
export const CATEGORIES: PostCategoryType[] = ['Community', 'Q&A']

export interface CommentType {
  content: string
  uid: string
  email?: string
  createdAt: string
  updatedAt?: string
}

export interface PostProps {
  id?: string
  title: string
  email: string
  content: string
  createdAt: string
  updatedAt?: string
  uid: string
  comments: CommentType[]
  category: PostCategoryType
  files?: string[]
}

export default function PostForm() {
  const router = useRouter()
  const { user } = useAuth()
  const { postId } = router.query

  const [post, setPost] = useState<PostProps | null>(null)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState<PostCategoryType>('Community')
  const [content, setContent] = useState('')
  const [files, setFiles] = useState<FileWithPreview[]>([]) // 파일 리스트로 변경

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const maxTotalSize = 10 * 1024 * 1024 // 10MB(10000KB)
    const totalSize = files.reduce((acc, file) => acc + file.size, 0)

    if (totalSize > maxTotalSize) {
      alert(
        'The attached file size is too large. Please attach a file of 10 MB or less.',
      )
      return
    }
    try {
      const fileUrls = files.map(file => file.preview)
      if (post?.id) {
        //만약 post 데이터 있으면 firestore로 데이터 수정

        const postRef = doc(db, 'posts', post.id)
        await updateDoc(postRef, {
          title: title,
          content: content,
          file: fileUrls,
          updatedAt: new Date()?.toLocaleDateString('en', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
          category,
        })
        console.log('post', post)

        alert('Successfully edited post!')
        router.push(`/community/${post.id}`)
      } else {
        // 없으면 기존처럼 데이터 생성

        await addDoc(collection(db, 'posts'), {
          title: title,
          content: content,
          file: fileUrls,
          createdAt: new Date()?.toLocaleDateString('en', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
          category,
          email: user?.email,
          uid: user?.uid,
        })

        alert('Successfully added post!')
        router.push('/community')
      }
    } catch (e: any) {
      console.log(e)
      alert('Failed to submit post. Please try again later')
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

    if (name === 'files') {
      setFiles(files)
    }
  }

  const handleFileChange = useCallback((newFiles: FileWithPreview[]) => {
    // const pdfFiles = newFiles.filter(file => file.type.endsWith('pdf'))
    const imageFiles = newFiles.filter(file => file.type.startsWith('image/'))

    setFiles(imageFiles)
    addImagesToContent(imageFiles)
  }, [])

  const addImagesToContent = (images: FileWithPreview[]) => {
    images.forEach(imageFile => {
      const reader = new FileReader()
      reader.onload = () => {
        const imgTag = `<img src="${reader.result}" alt="Uploaded Image" style="max-width:100%; height:auto;" />`
        setContent(prevContent => prevContent + imgTag)
      }
      reader.readAsDataURL(imageFile)
    })
  }

  const getPost = useCallback(async (id: string) => {
    try {
      const docRef = doc(db, 'posts', id)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const postData = { id: docSnap.id, ...(docSnap.data() as PostProps) }
        setPost(postData)

        setTitle(postData.title)
        setContent(postData.content)
        setCategory(postData.category as PostCategoryType)

        if (postData.files) {
          const postFiles = postData.files.map(
            fileUrl =>
              ({
                preview: fileUrl,
              }) as FileWithPreview,
          )
          setFiles(postFiles)
        }
      }
    } catch (error) {
      console.log('Failed to fetch post', error)
    }
  }, [])

  useEffect(() => {
    //   const postId = Array.isArray(params?.id) ? params.id[0] : params?.id // 배열인지 확인하여 처리
    //   if (postId) getPost(postId)
    // }, [params?.id])

    if (typeof postId === 'string') {
      getPost(postId)
    }
  }, [postId, getPost])

  // useEffect(() => {
  //   if (post) {
  //     setTitle(post.title)
  //     setContent(post.content)
  //     setCategory(post.category as PostCategoryType)
  //     if (post.files) {
  //       setFiles(
  //         post.files.map(fileUrl => ({ preview: fileUrl }) as FileWithPreview),
  //       )
  //     }
  //   }
  // }, [post])

  //// TODO ////
  //파일 첨부 시 fires storage로 업로드할 수 있도록 처리하고
  //디테일 페이지에서 첨부파일 다운받을 수 있도록 처리.........

  return (
    <S.Wrapper onSubmit={handleSubmit} id="">
      <S.MainText>Post</S.MainText>

      <S.TitleWrapper>
        <S.Category
          name="category"
          id="category"
          onChange={onChange}
          value={category}
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
          maxLength={50}
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
