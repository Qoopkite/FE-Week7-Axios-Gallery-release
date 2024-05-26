import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { styled } from 'styled-components';

const Photo = styled.img`
  width: 810px;
  height: 810px;
`;

const Postname = styled.div`
  margin-left: 3px;
  font-size: 18px;
  font-weight: 800;
  display: flex;
  align-self: flex-start;
`;

const Posttext = styled.div`
  margin-left: 3px;
  font-size: 14px;
  font-weight: 550;
  display: flex;
  align-self: flex-start;
`;

const Container = styled.div`
  padding: 3px;
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
`;

const TextWrapper = styled.div`
  border: 2px solid black;
  display: block;
`;

const TextWrapper2 = styled.div`
  border: 2px solid black;
  font-size: 13px;
  display: flex;
  align-items: center;
`;

const CommentList = styled.div`
  margin-top: 10px;
  width: 100%;
  border-top: 1px solid black;
  padding-top: 10px;
`;

const CommentItem = styled.div`
  border-bottom: 1px solid black;
  padding: 5px 0;
`;

const Post = () => {
  const { Id } = useParams();
  const [Feed, setFeed] = useState([]);
  const [Comments, setComments] = useState("");
  const [commentNum, setCommentNum] = useState(0);
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    axios
      .get(`http://3.36.127.43:8080/imageAll`)
      .then((res) => {
        const image = res.data.find(item => item.id === Id);
        setFeed(image);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [Id]);

  const fetchComments = () => {
    axios
      .get(`http://3.36.127.43:8080/${Id}/comments`)
      .then((res) => {
        const sortedComments = res.data.reverse(); // 최신순으로 정렬
        setCommentList(sortedComments);
        setCommentNum(sortedComments.length);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    fetchComments();
  }, [Id]);

  const handleComments = event => {
    setComments(event.target.value);
  };

  const postComment = () => {
    if (Comments===""){
      return;
    }
    axios
      .post(`http://3.36.127.43:8080/${Id}/comments`, {
        commentBody: Comments
      })
      .then(response => {
        console.log('Comment Created:', response.data);
        setComments("");
        fetchComments(); // 댓글 작성 후 다시 최신 댓글 목록 가져오기
      })
      .catch(error => {
        console.error('Failed to post comment:', error);
      });
  };

  const deleteComment = (commentId) =>{
    axios
      .delete(`http://3.36.127.43:8080/${Id}/comments/${commentId}`, {
      })
      .then(response => {
        console.log('Comment deleted successfully:', response.data);
                fetchComments(); 
      })
      .catch(error => {
          console.log('Failed to delete comment:', error);
      });
  }
  return (
    <Container>
      <Wrapper>
        <TextWrapper>
          <Postname>{Feed.imageName}</Postname>
          <Posttext>{Feed.imageText}</Posttext>
        </TextWrapper>
        <TextWrapper2>
          댓글 {commentNum}개
        </TextWrapper2>
      </Wrapper>
      <Photo src={Feed.imageURL} />
      <input type="text" placeholder="댓글작성.." value={Comments} onChange={handleComments} />
      <button onClick={postComment}>
        게시
      </button>
      <CommentList>
        {commentList.map((comment) => (
          <CommentItem key={comment.id}>
            {comment.commentBody} <button onClick={() => deleteComment(comment.id)}>삭제</button>
          </CommentItem>
        ))}
      </CommentList>
    </Container>
  );
};

export default Post;