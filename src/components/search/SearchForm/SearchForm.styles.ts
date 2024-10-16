import styled from '@emotion/styled'

export const SearchWrpper = styled.form`
  display: flex;
  position: relative;
  align-items: center;
  margin-left: 5px;
  width: 100%;
`

export const SearchHeaderIcon = styled.div`
  width: 10px;
  height: 10px;
  position: absolute;
  bottom: 47%;
  left: 15px;
`

export const SearchMainIcon = styled.div`
  width: 15px;
  height: 15px;
  position: absolute;
  bottom: 50%;
  left: 20px;
  font-size: 30px;

  svg {
    fill: #738491;

    &:focus {
      fill: royalblue;
    }
  }
`

export const StyleWrapper = styled.div`
  display: flex;
  width: 100%;
  margin: 0 10px;
`
export const SearchMainInput = styled.input`
  width: 100%;
  display: flex;
  min-width: 500px;
  border: 2px solid royalblue;
  padding: 10px 10px 10px 50px;
  font-size: 20px;
  background-color: #fff;
  transition: all 0.3s;
  flex-shrink: 1;

  @media (max-width: 870px) {
    min-width: 400px;
    font-size: 15px;
  }

  @media (max-width: 760px) {
    min-width: 350px;
  }

  &:focus {
    outline: none;
    background-color: #eff7fa;

    &::placeholder {
      opacity: 0;
    }
  }

  &::placeholder {
    color: #c0c0c0;
  }
`

export const SearchHeaderInput = styled.input`
  padding: 4px 8px 4px 28px;
  font-size: 12px;
  border: none;
  border-bottom: 1px solid #56a9ac;
  background: transparent;
  cursor: auto;
  width: 80px;
  transition: all 0.3s;

  &::placeholder {
    color: #c0c0c0;
  }

  &:focus {
    width: 150px;
    outline: none;
    border-radius: 2px;
    border: 1px solid #56a9ac;
    background-color: #fff;

    &::placeholder {
      opacity: 0;
    }
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
  }

  &:hover {
    background-color: royalblue;
    color: #fff;

    a {
      color: #fff;
    }
  }
`
