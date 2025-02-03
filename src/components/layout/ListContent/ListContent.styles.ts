import styled from '@emotion/styled'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0px 20px;
`

export const ItemWrapper = styled.div`
  display: flex;
  width: 100%;
  /* flex-direction: column; */
  margin: 5px 0;
  padding-bottom: 10px;
  text-align: center;
  align-items: center;
  border-bottom: 1px solid #eee;
`

export const LabelText = styled.div`
  width: 120px;
  font-size: 16px;
  font-weight: 500;
  /* margin: 5px; */
  padding: 5px 10px;
  /* word-break: 'break-word'; */
  overflow-wrap: anywhere;
  line-height: 1.2;
  border-right: 1px solid #eee;
  flex-shrink: 0;
`
export const ItemText = styled.div`
  display: flex;
  font-size: 14px;
  margin-left: 10px;
  line-height: 1.4;
  text-align: left;
  /* text-indent: -5px; */
`
