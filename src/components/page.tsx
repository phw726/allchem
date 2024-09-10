/** @jsxImportSource @emotion/react */

import styled from "@emotion/styled";
import Link from "next/link";
import React from "react";

function Test() {
  return (
    <>
      <Container>안녕하세요</Container>
      <div css={{ color: "red" }}>아오왜이래진짜</div>
      <Link href="/nextTest">다음페이지</Link>
    </>
  );
}

const Container = styled.div`
  color: blue;
  text-decoration: dashed;
  font-size: 20px;
`;

export default Test;
