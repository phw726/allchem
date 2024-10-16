import styled from '@emotion/styled'

export const Wrapper = styled.div`
  width: auto;
  height: auto;
  margin-top: 150px;
  padding: 0 20px;
`

export const MenuText = styled.div`
  font-size: 30px;
  color: #22272b;
  font-weight: 600;
  margin-bottom: 40px;
`

export const SearchWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 50px;

  input {
    width: 100%;
  }
`

export const SearchButton = styled.button`
  background-color: #fafafa;
  border-radius: 4px;
  font-size: 15px;
  font-weight: 600;
  border: 2px solid royalblue;
  color: royalblue;
  margin: 0 5px;
  height: auto;
  text-align: center;
  align-items: center;
  padding: 5px 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-shrink: 0;

  a {
    color: royalblue;
    padding: 6px 3px;
  }

  &:hover {
    background-color: royalblue;
    color: #fff;

    a {
      color: #fff;
    }
  }
`
