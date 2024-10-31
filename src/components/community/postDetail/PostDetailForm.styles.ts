import styled from '@emotion/styled'
import Link from 'next/link'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  margin: 100px 50px 20px;
`
export const PostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`

export const Title = styled.div`
  display: flex;
  font-size: 18px;
  font-weight: 600;
  padding: 4px 0;
  border-bottom: 1px solid lightgray;
  padding-bottom: 10px;
  color: #22272b;
  align-items: center;
  height: auto;
  width: auto;

  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
  white-space: pre-wrap;
`

export const Category = styled.div`
  border: 1px solid lightgray;
  border-radius: 2px;
  margin-right: 10px;
  font-size: 12px;
  font-weight: 300;
  color: gray;
  padding: 4px 8px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
  align-items: center;
  text-align: center;
`

export const PostInfo = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: gray;
  margin: 10px 2px;
`
export const Info = styled.div`
  display: flex;
`

export const FileWrapper = styled.div`
  display: flex;
`

export const FileLink = styled(Link)`
  display: flex;
  font-size: 12px;
  color: #22272b;
`

export const Content = styled.div`
  width: 100%;
  margin: 40px 0px;
  color: #22272b;
  font-size: 14px;
  min-height: 400px;
  overflow-wrap: break-word;
  line-height: 1.5;
`

/// Post Prev, Next btn ///

export const PostHeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-top: 20px;
  justify-content: space-between;
  text-align: center;
  align-items: center;
`

export const Arrow = styled.button`
  border: none;
  background-color: transparent;
  font-size: 12px;
  padding: 4px 0;
  display: flex;
  color: gray;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  align-items: center;

  &:hover {
    color: #22272b;
    transform: scale(1.2);
  }
`
export const PostUtilsWrapper = styled.div`
  display: flex;
`

export const Edit = styled(Link)`
  display: flex;
  color: gray;
`

export const Delete = styled.button`
  display: flex;
  border: none;
`
