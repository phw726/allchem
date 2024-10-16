import styled from '@emotion/styled'
import Link from 'next/link'

export const Utils = styled.nav`
  display: flex;
  align-items: center;
  gap: 22px;
  width: auto;
  padding: 10px;
  margin-top: 10px;
`
export const UtilsItem = styled.div`
  position: relative;
  font-size: 22px;
  color: #22272b;
  /* color: #3a434a; */
  text-decoration: none;

  &:hover {
    color: #56a9ac;
  }
`
