import styled from '@emotion/styled'

export const Wrapper = styled.form`
  display: flex;
  margin-top: 150px;
  padding: 0 20px;
  color: #22272b;
  width: auto;
  height: auto;
  flex-direction: column;
`

export const MainText = styled.div`
  display: flex;
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 40px;
`

export const TitleWrapper = styled.div`
  display: flex;
  gap: 4px;
`

export const Category = styled.select`
  width: auto;
  padding: 4px 20px 4px 10px;
  border-radius: 4px;
  border: 2px solid lightgray;
  cursor: pointer;

  &:focus {
    outline: none;
    border: 2px solid royalblue;
  }
`

export const TitleInput = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 2px solid lightgray;

  &:focus {
    outline: none;
    border: 2px solid royalblue;
  }
`

export const ContentWrapper = styled.div`
  min-height: 400px;
  border-radius: 4px;
  border: 2px solid lightgray;
  padding: 4px;
  margin-top: 4px;

  &:focus {
    outline: none;
    border: 2px solid royalblue;
  }
`

export const Content = styled.input`
  display: flex;
  text-align: flex-start;
  width: auto;
  min-height: 400px;
  border-radius: 4px;
  border: 2px solid lightgray;
  padding: 4px;
  margin-top: 4px;

  &:focus {
    outline: none;
    border: 2px solid royalblue;
  }
`

export const DropZoneWrapper = styled.div`
  border: 2px dashed #cccccc;
  margin: 10px 2px;
  width: auto;
  min-height: 80px;
  display: flex;
  cursor: pointer;
  overflow: hidden;
  position: relative;
`

export const Background = styled.div`
  position: absolute;
  background-color: transparent;
  z-index: -10;
  display: flex;
  left: 50%;
  bottom: 50%;
  transform: translateX(-50%);
  transform: translateY(50%);
  opacity: 0.5;
  svg {
    fill: lightgray;
    width: 50px;
    height: 50px;
  }
`

export const DropText = styled.p`
  width: 100%;
  display: flex;
  padding: 40px auto;
  font-size: 14px;
  color: #888;
  text-align: center;
  align-items: center;
  justify-content: center;
`

export const FileList = styled.div`
  line-height: 1.5;
  padding: 4px;
`
export const FileItem = styled.div`
  font-size: 12px;
  color: #888;
  display: flex;
  align-items: center;

  & > button {
    display: flex;
    padding: 0;
    margin-top: 2px;
    margin-left: 4px;
    height: auto;
    border: none;
    color: red;
    font-weight: 600;
    font-size: 12px;
    cursor: pointer;
  }
`

export const PreviewWrapper = styled.div`
  display: grid;
  width: auto;
  height: auto;
  gap: 4px;
  margin-top: 10px;
  margin-bottom: 4px;
  grid-template-columns: repeat(10, 1fr);

  @media (max-width: 940px) {
    grid-template-columns: repeat(8, 1fr);
  }

  @media (max-width: 760px) {
    grid-template-columns: repeat(7, 1fr);
  }

  @media (max-width: 677px) {
    grid-template-columns: repeat(6, 1fr);
  }
`

export const PreviewImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 4px;
  background-color: #fff;
  object-fit: contain;
  border: 1px solid lightgray;

  @media (max-width: 760px) {
    width: 80px;
    height: 80px;
  }
`

export const Button = styled.button`
  width: 100%;
  padding: 10px 20px;
  border-radius: 4px;
  border: 2px solid royalblue;
  margin: 10px 0 10px auto;
  background-color: #fff;
  color: royalblue;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: royalblue;
    color: #fff;
  }
`
