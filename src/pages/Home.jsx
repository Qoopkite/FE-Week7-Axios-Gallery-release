import React, { useEffect, useState } from "react";
import axios from 'axios';
import Header from "./Header";
import Card from "../components/Card";
import { styled } from 'styled-components';

const Container = styled.div`
  display : grid;
  grid-template-columns: 270px 270px 270px;
  //border: 2px solid black;
  width: 810px;
`;

const Home = () => {
  const [feed, setFeed] = useState([]); // 피드사진들을 저장할 배열로 초기화

  useEffect(() => {
    axios
      .get(`http://3.36.127.43:8080/imageAll`)
      .then((res) => {
        setFeed(res.data); // 데이터를 상태에 저장
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <>
      <Header />
      <Container>
        {feed.map(item => (
            <Card key={item.id}
            id={item.id}
            imgURL={item.imageURL}
            imgName={item.imageName}
            imgText={item.imageText}
            />
                  ))}
        </Container>
    </>
  );
};

export default Home;