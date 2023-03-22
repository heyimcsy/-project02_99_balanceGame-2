//111111111
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { __getComments } from '../../redux/modules/commentASlice'
import { __updatedComment } from '../../redux/modules/commentASlice'
import EditComment from './EditComment'

const CommentsAList = () => {
  const dispatch = useDispatch()
  const { gameId } = useParams()

  const { isLoading, error, comments } = useSelector((state) => {
    return state.comments
  })
  // const [edit, setEdit] = useState(false)
  // const [editTitle, setEditTitle] = useState()
  //useEffect e다시 공부하기   unmount 때 실현을 시키기 위해서  redux 공부하기  전달할 값이 없었다.
  //disPatch 에 빈 값만 넣어서 식을 적는 것은 범죄 하면 안 된다 .
  // return () => dispatch()
  useEffect(() => {
    dispatch(__getComments(gameId))
  }, [dispatch, gameId])

  const clickisEdit = (commentId, updatedCommentContent) => {
    dispatch(__updatedComment(commentId, updatedCommentContent))
    console.log(commentId)
  }
  if (isLoading) {
    return <div>로딩중.....ㅎㅎ</div>
  }
  if (error) {
    return <div>{error.message}</div>
  }

  return (
    <StwidthBox>
      <BoxDiv backgroundColor="green">
        <div>Option A</div>
        <div>
          {comments &&
            comments
              .filter((comment) => comment.option == 'A')
              .map((comment) => (
                <EditComment
                  key={comment.commentId}
                  comment={comment}
                  // onClick={() => clickisEdit(comment.commentId, __updatedComment)}
                />
              ))}
        </div>
      </BoxDiv>
      <BoxDiv backgroundColor="blue">
        <div>Option B</div>
        <div>
          {comments &&
            comments
              .filter((comment) => comment.option == 'B')
              .map((comment) => (
                <EditComment
                  key={comment.commentId}
                  comment={comment}
                  onClick={() => clickisEdit(comment.commentId, __updatedComment)}
                />
              ))}
        </div>
      </BoxDiv>
    </StwidthBox>
  )
}

export default CommentsAList

const Textarea = styled.textarea`
  width: 50%;
  border: 1px solid #eee;
  padding: 12px;
  font-size: 14px;
`

const BoxDiv = styled.div`
  background-color: ${(props) => props.backgroundColor};
  padding: 20px 50px;
  width: 50%;
  height: 230px;
  display: flex;
  align-items: center;
  flex-direction: column;
  word-wrap: break-word;
  overflow-y: auto;
`
const StwidthBox = styled.div`
  width: 100%;
  display: flex;
`
