import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { styled } from 'styled-components';

const Photo= styled.img`
  width: 810px;
  height: 810px;
`;

const Postname = styled.div`
  margin-left: 3px;
  font-size : 18px;
  font-weight : 800;
  display: flex;
  align-self: flex-start;
`;

const Posttext = styled.div`
  margin-left: 3px;
  font-size : 14px;
  font-weight : 550;
  display: flex;
  align-self: flex-start;
`
const Container = styled.div`
  padding : 3px;
  border: 2px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  border: 2px solid red;
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const TextWrapper = styled.div`
  border: 2px solid black;
  display: block;
`
const TextWrapper2 = styled.div`
  border: 2px solid black;
  font-size : 13px;
  display: flex;
  align-items: center;
`

const Post = () => {

  const {Id}=useParams();
  const [Feed, setFeed] = useState([]);
  useEffect(()=>{
    axios
        .get(`http://3.36.127.43:8080/imageAll`)
        .then((res)=>{
           const image = res.data.find(item => item.id === Id);
            setFeed(image);
        })
        .catch((e)=>{
            console.log(e);
        });
    },[Id]);
  return(
      <>
        <Container>
          <Wrapper>
            <TextWrapper>
              <Postname>{Feed.imageName}</Postname>
              <Posttext>{Feed.imageText}</Posttext>
            </TextWrapper>
            <TextWrapper2>
               댓글몇개
            </TextWrapper2>
          </Wrapper>
            <Photo src={Feed.imageURL}/>
        </Container>

      </>
  );
};

export default Post;