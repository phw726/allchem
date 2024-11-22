import styled from '@emotion/styled'
import Link from 'next/link'

export const UtilsWrapper = styled.div`
  display: flex;
  margin: 0 0 20px auto;
  gap: 10px;
`

export const UtilItems = styled.div`
  display: flex;
  position: relative;

  color: #d3d4d4;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:nth-child(2) {
    font-size: 14px;
  }

  &:focus {
    outline: none;
  }
`

export const UtilBtn = styled.button<{ $active: boolean }>`
  display: flex;
  width: 45px;
  height: 30px;
  padding: 0;
  font-size: 17px;
  border: 1px solid #d3d4d4;
  border-radius: 40px 40px 30px 30px;
  background-color: transparent;
  transition: all 0.3s ease;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  color: ${({ $active }) => ($active ? 'royalblue' : '#d3d4d4')};
  border-color: ${({ $active }) => ($active ? 'royalblue' : '#d3d4d4')};

  small {
    font-size: 12px;

    &:hover {
      transform: none;
    }
  }

  &:hover {
    transform: scale(1.2);

    color: ${({ $active }) => ($active ? 'royalblue' : 'gray')};
    border-color: ${({ $active }) => ($active ? 'royalblue' : 'gray')};
  }
`

//// post shared

export const ModalWrapper = styled.div`
  position: absolute;
  width: 300px;
  height: 150px;
  right: 0px;
  top: 40px;
  bottom: 0px;
  background-color: #fcfcfc;
  border: 1px solid lightgray;
  border-radius: 4px;
  padding: 4px;
  gap: 10px;
  cursor: default;
  z-index: 1000;
`

export const ModalUtilWrapper = styled.div`
  display: flex;
  width: 100%;
  margin: 20px 0;
  position: relative;
  justify-content: space-evenly;
  align-items: center;
`

export const ModalTitle = styled.div`
  display: flex;
  position: absolute;
  font-size: 18px;
  font-weight: 500;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  color: #22272b;
`

export const ModalCloseBtn = styled.button`
  display: flex;
  position: absolute;
  margin-top: 20px;
  right: 0;
  width: 20px;
  height: 20px;
  padding: 0;
  border: none;
  outline: none;
  margin: 8px 0 8px 0;
  cursor: pointer;
  background-color: transparent;
  color: gray;

  &:hover {
    color: black;
  }
`

export const ModalItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`

export const ModalItem = styled(Link)`
  display: flex;
  width: 50px;
  height: 50px;
  margin-top: 8px;
  margin-bottom: 10px;
  border-radius: 50%;
  font-size: 25px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  /* border: 1px solid #f5f5f5?; */
  background-color: #f7f7f7;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.2);
    background-color: #fff;
  }
`

// export const Backdrop = styled.div`
//   width: 100px;
//   height: 100px;
//   position: fixed;
//   top: 0;
//   z-index: 9999;
//   background-color: rgba(0, 0, 0, 0.2);
// `

export const LinkWrapper = styled.div`
  display: flex;
  width: auto;
  height: 20px;
  margin: 10px 4px;
  border-radius: 2px;
  align-items: center;
`

export const PostLink = styled.div`
  display: flex;
  width: auto;
  height: 21px;
  font-size: 14px;
  background-color: #eff0f0;
  color: #22272b;
  margin: 2px 5px 2px 0;
  padding: 4px;
  cursor: text;

  overflow-x: scroll;
  white-space: nowrap;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const LinkCopyBtn = styled.button`
  width: 48px;
  height: auto;
  padding: 5px 6px;
  border-radius: 4px;
  border: 2px solid royalblue;
  color: royalblue;
  background-color: #fff;
  font-weight: 600;
  outline: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: royalblue;
    color: #fff;
  }
`
