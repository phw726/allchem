import { useCallback, useEffect, useState } from 'react'
import * as S from './PostForm.styles'
import { useDropzone } from 'react-dropzone'
import { FaRegPlusSquare } from 'react-icons/fa'

export interface FileWithPreview extends File {
  preview: string
}

interface FileDropProps {
  onFileChange: (files: FileWithPreview[]) => void // 파일 리스트를 전달하는 함수
}

export default function FileDrop({ onFileChange }: FileDropProps) {
  const [files, setFiles] = useState<FileWithPreview[]>([]) // 업로드한 파일들

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      }),
    )
    setFiles(prevFiles => [...prevFiles, ...newFiles])
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': [], // 이미지 파일 수락
      'application/pdf': [], // PDF 파일 수락
    },
    multiple: true,
  })

  const handleFileDelete = (
    e: React.MouseEvent<HTMLButtonElement>,
    indexToDelete: number,
  ) => {
    e.preventDefault()
    e.stopPropagation()

    setFiles(prevFiles =>
      prevFiles.filter((_, index) => index !== indexToDelete),
    )
  }

  useEffect(() => {
    onFileChange(files)

    return () => {
      files.forEach(file => URL.revokeObjectURL(file.preview))
    }
  }, [files, onFileChange])

  return (
    <S.DropZoneWrapper {...getRootProps()}>
      <input {...getInputProps()} />
      {files.length > 0 ? (
        <S.FileList>
          <S.Background>
            <FaRegPlusSquare />
          </S.Background>

          {files.map((file, index) => (
            <S.FileItem key={index}>
              {file.name.slice(0, 70)}... ({Math.round(file.size / 1024)} KB)
              <button type="button" onClick={e => handleFileDelete(e, index)}>
                X
              </button>
            </S.FileItem>
          ))}

          <S.PreviewWrapper>
            {files.map((file, index) =>
              file.type.startsWith('image/') ? (
                <S.PreviewImage key={index} src={file.preview} alt="Preview" />
              ) : null,
            )}
          </S.PreviewWrapper>
        </S.FileList>
      ) : (
        <S.DropText>Drop Image or PDF Files...</S.DropText>
      )}
    </S.DropZoneWrapper>
  )
}
