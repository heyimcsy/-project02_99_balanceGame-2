import React from 'react'
import AddCommentForm from '../comments/AddCommentForm'
import CommentsAList from '../comments/CommentsAList'
import styled from 'styled-components'

function Comments() {
  return (
    <div>
      <BackStyle>
        <AddCommentForm />
      </BackStyle>
      <CommentBox>
        <CommentsAList />
      </CommentBox>
    </div>
  )
}

export default Comments

// Form Data
// json형식으로 리퀘스트 보냄

const BackStyle = styled.div`
  background-color: #ffafd6;
  width: 100%;
  height: 200px;
`
const CommentBox = styled.div`
  background-color: #ffc3e0;
  width: 100%;
  display: flex;
  height: 270px;
`
