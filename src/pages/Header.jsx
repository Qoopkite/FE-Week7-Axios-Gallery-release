import React from "react";
import { styled } from 'styled-components'; 
import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios';
import Profile from "../assets/profile.png"


const Container = styled.div`
  display: flex;
  align-items: center; 
`;

const Wrapper = styled.div`
  display : flex;
  align-items: center;
  //border: 2px solid black;
`
const Wrapper2 = styled.div`
  //border: 2px solid black;
  line-height: 0.5;
`
const Text =styled.div`
  font-size : 15px;
  font-weight:545;
`
const Text2 =styled.div`
  margin-top: 30px;
  font-size : 15px;
  font-weight:bold;
`

const Header=()=>{
  const [imageNum,setImageNum]=useState((0)); // 게시물8개

  useEffect(()=>{
    axios //게시물 8개
      .get(`http://3.36.127.43:8080/imageSize`)
      .then((res)=>{
        setImageNum(res.data);
     })
      .catch((e)=>{
         console.log(e);
     });

  },[])

  return(
  <>
    <Container>
      <Wrapper>
        <img src={Profile} width="130px" alt="프로필"/>
      </Wrapper>
      <Wrapper2>
        <h1>likelion_12th_frontend</h1>
        <Text>멋쟁이사자처럼 12기 여러분 화이팅!!! 어른사자로 폭풍성장중..🦁</Text>
        <Text2>게시물 {imageNum}개</Text2>
      </Wrapper2>
    </Container>
  </>
  );
};

export default Header;