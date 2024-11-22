import styled from '@emotion/styled'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  width: auto;
  margin-top: 20px;
`

export const TotalText = styled.span`
  display: flex;
  font-size: 20px;
  font-weight: 600;
  color: #22272b;
`

export const TextAreaWrapper = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`
export const CommentText = styled.textarea`
  display: flex;
  width: auto;
  height: 80px;
  margin: 20px 0px 10px 0;
  padding: 10px 10px;
  border: 1px solid lightgray;
  border-radius: 2px;
  background-color: transparent;
  color: #22272b;
  cursor: text;
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
  white-space: pre-wrap;
  resize: none;

  &::placeholder {
    color: lightgray;
    align-items: center;
    text-align: justify;
  }

  &:focus {
    outline: none;
  }
`

export const SubmitBtn = styled.button`
  display: flex;
  width: 100px;
  padding: 8px 10px;
  margin: 5px 0 30px auto;
  font-size: 15px;
  font-weight: 600;
  color: royalblue;
  background-color: #fff;
  border: 2px solid royalblue;
  border-radius: 3px;
  align-items: center;
  text-align: center;
  justify-content: center;
  transition: all 0.3s ease-in;
  cursor: pointer;

  &:focus,
  &:hover {
    background-color: royalblue;
    color: #fff;
  }
`

export const CommentUtils = styled.div`
  display: flex;
  margin: 10px 0 10px auto;
  gap: 7px;
`

export const SubmitBtn_s = styled(SubmitBtn)`
  width: 50px;
  font-size: 12px;
  font-weight: 400;
  border: 1px solid royalblue;
  padding: 4px 4px;
  margin: 0;
`

export const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #f1f2f2;
  width: auto;
  height: auto;
  padding: 10px 0;
  /* 
  &:last-child {
    border: none;
  }

  &:nth-last-child() {
    border: none;
  } */
`

export const UserInfo = styled.div`
  display: flex;
  font-size: 13px;
  text-align: center;
  align-items: center;
  margin-bottom: 15px;
  margin-top: 10px;
  gap: 15px;
`
export const Email = styled.div`
  display: flex;
  font-weight: 500;
  font-size: 12px;
  color: #22272b;
`

export const UtilsWrapper = styled.div`
  display: flex;
  gap: 7px;
  align-items: center;
`

export const DeleteBtn = styled.button`
  display: flex;
  border: none;
  background-color: transparent;
  font-size: 18px;
  color: darkgray;
  cursor: pointer;
  padding: 0;
  transition: all 0.3s ease;

  &:nth-child(2) {
    font-size: 14px;
  }

  &:hover {
    /* transform: scale(1.3); */
    color: royalblue;
  }
`

export const EditBtn = styled(DeleteBtn)``

export const Date = styled(Email)``

export const Comment = styled(Email)`
  line-height: 1.5;
  font-size: 14px;
  padding-bottom: 10px;
`
