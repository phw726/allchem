import { css } from '@emotion/react'
import dynamic from 'next/dynamic'
import React, { forwardRef, useEffect, useMemo, useState } from 'react'
import { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

interface EditorProps {
  onChange: (value: string) => void
  value: string
}

const QuillEditor = forwardRef<typeof ReactQuill | null, EditorProps>(
  ({ value, onChange }, ref) => {
    const [editor, setEditor] = useState(value || '')

    useEffect(() => {
      setEditor(value)
    }, [value])

    const modules = useMemo(
      () => ({
        toolbar: {
          container: [
            [{ size: ['small', false, 'large', 'huge'] }],
            [{ align: [] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ color: [] }, { background: [] }],
            ['image'], // 이미지 버튼 추가
          ],
          handlers: {
            image: () => {
              const input = document.createElement('input')
              input.setAttribute('type', 'file')
              input.setAttribute('accept', 'image/*')
              input.click()

              input.onchange = async () => {
                const file = input.files ? input.files[0] : null
                if (file) {
                  const reader = new FileReader()
                  reader.onload = () => {
                    const imgTag = `<img src="${reader.result}" style="max-width:100%; height:auto;" />`
                    setEditor(prevEditor => {
                      const newContent = prevEditor + imgTag
                      onChange(newContent)
                      return newContent
                    })
                  }
                  reader.readAsDataURL(file)
                }
              }
            },
          },
        },
      }),
      [onChange],
    )

    const formats = [
      'size',
      'bold',
      'italic',
      'underline',
      'strike',
      'blockquote',
      'list',
      'bullet',
      'indent',
      'link',
      'align',
      'color',
      'background',
      'image',
    ]

    return (
      <div>
        <ReactQuill
          theme="snow"
          value={editor}
          modules={modules}
          formats={formats}
          onChange={(content, delta, source, editor) => {
            setEditor(content)
            onChange(editor.getHTML())
          }}
          css={QuillStyles}
        />
      </div>
    )
  },
)
export default QuillEditor

const QuillStyles = css`
  background-color: #fff;
  border-radius: 4px;
  /* border: none; */
  border: 1px solid lightgray;
  margin-top: 5px;
  height: 100%;
  width: 100%;
  min-height: 400px;

  strong {
    font-weight: bold;
  }

  em {
    font-style: italic;
  }

  .ql-editor img {
    max-width: 100%;
    min-height: 20px;
    height: auto;
  }

  .ql-editor {
    min-height: 400px;
    border: none;
  }
`
