"use client";
/** @jsxImportSource @emotion/react */

import styled from "@emotion/styled";
import Link from "next/link";
import React from "react";

function NextTest() {
  return (
    <>
      <Container>다음페이지에요</Container>
      <Link href="/">이전페이지</Link>
    </>
  );
}

const Container = styled.div`
  color: blue;
  text-decoration: dashed;
  font-size: 20px;
`;

export default NextTest;
