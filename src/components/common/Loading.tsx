import React from 'react'
import styled from '@emotion/styled'

export function CircleLoading() {
  return <Loading />
}

export function TextLoading() {
  return <Text>Loading...</Text>
}

const Loading = styled.div`
  margin: 10px auto 50px;
  height: 60px;
  width: 60px;
  border: 10px solid lightgray;
  border-radius: 50%;
  border-right-color: royalblue;
  border-top-color: royalblue;
  animation: spin 1000ms infinite linear;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
`

const Text = styled.div`
  margin: 190px 20px 220px;
  font-size: 24px;
  font-weight: 700;
  font-family: monospace;
  color: #22272b;
`
