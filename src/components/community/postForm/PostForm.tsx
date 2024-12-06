import React, { useCallback, useEffect, useState } from 'react'
import * as S from './PostForm.styles'
import QuillEditor from '@/components/common/QuillEditor'
import FileDrop, { FileWithPreview } from './FileDrop'
import * as postService from '@/remote/postService'
import { useRouter } from 'next/router'
import { useAuth } from '../../../hooks/useAuth'
import { PostCategoryType, PostProps } from '@/utils/types'
import { usePost } from '@/hooks/usePost'

export const CATEGORIES: PostCategoryType[] = ['Community', 'Q&A']

export default function PostForm() {
  const router = useRouter()
  const { postId } = router.query as { postId?: string }
  const { post, savePost, isLoading } = usePost({ postId })

  const { user } = useAuth()
  const [title, setTitle] = useState(post?.title || '')
  const [category, setCategory] = useState<PostCategoryType>('Community')
  const [content, setContent] = useState(post?.content || '')
  const [files, setFiles] = useState<FileWithPreview[]>([]) // 파일 리스트로 변경

  useEffect(() => {
    if (post) {
      setTitle(post.title || '')
      setCategory(post.category || 'Community')
      setContent(post.content || '')
    }
  }, [post])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // const maxTotalSize = 10 * 1024 * 1024 // 10MB(10000KB)
    // const totalSize = files.reduce((acc, file) => acc + file.size, 0)

    // if (totalSize > maxTotalSize) {
    //   alert(
    //     'The attached file size is too large. Please attach a file of 10 MB or less.',
    //   )
    //   return
    // }

    // if (!user?.email || !user?.uid) {
    //   alert('You must be logged in to submit a post.')
    //   return
    // }

    const data = {
      title,
      category,
      content,
      email: user?.email as string,
      uid: user?.uid as string,
      createdAt:
        post?.createdAt ||
        new Date()?.toLocaleDateString('en', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
      ...(postId && {
        updatedAt: new Date()?.toLocaleDateString('en', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
      }),
    }

    try {
      const fileUrls = files.map(file => file.preview)
      if (postId) {
        //만약 post 데이터 있으면 firestore로 데이터 수정

        await postService.updatePost(postId, data)
        alert('Post updated successfully!')
        router.push(`/community/${postId}`)
      } else {
        // 없으면 기존처럼 데이터 생성

        await postService.writePost(data)

        alert('Post created successfully!')

        router.push('/community')
      }
    } catch (e: any) {
      console.log(e)
      alert('Failed to submit post. Please try again later')
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
        setContent((prevContent: string) => prevContent + imgTag)
      }
      reader.readAsDataURL(imageFile)
    })
  }

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
          value={category}
          onChange={e => setCategory(e.target.value as PostCategoryType)} // 변경된 값 반영
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
          onChange={e => setTitle(e.target.value)}
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
