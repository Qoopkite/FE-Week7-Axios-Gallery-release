import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from 'styled-components';

const Photo= styled.img`
  width: 250px;
  height: 250px;
`;

const Wrapper = styled.div`
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Postname = styled.div`
  margin-left: 3px;
  font-size : 18px;
  font-weight : bold;
  display: block; //flex로 하면 말줄임표가 안보이던데 왜야;;
  align-self: flex-start;
  white-space: nowrap;       //한줄
  overflow: hidden;          //넘치는 글자 숨기기
  text-overflow: ellipsis;   //말줄임표
  max-width: 250px;  
`;

const Posttext = styled.div`
  margin-left: 3px;
  font-size : 13px;
  color: gray;
  display: block;
  align-self: flex-start;
  white-space: nowrap;      
  overflow: hidden;      
  text-overflow: ellipsis; 
  max-width: 250px;  
`

const Container= styled.div`
  //border: 2px solid black;
`

export default function Card({id, imgURL, imgName, imgText}) {
    const navigate = useNavigate();
  
    return (
      <>
      <Container>
          <Wrapper id={id} onClick={() => navigate(`/${id}`)}>
            <Photo src={imgURL} />
            <Postname>{imgName}</Postname>
            <Posttext>{imgText}</Posttext>
          </Wrapper>
        </Container>
      </>
    );
}