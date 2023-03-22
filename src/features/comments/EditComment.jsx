import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { __deleteComment, __updatedComment } from '../../redux/modules/commentASlice'
import { clearComment, globalEditModeToggle, __getComment } from '../../redux/modules/commentSlice'
import CommentsAList from './CommentsAList'

const EditComment = ({ comment }) => {
  const dispatch = useDispatch()
  // console.log('comment', comment)
  const [edit, setEdit] = useState(false)
  const [editContent, setEditContent] = useState(comment.content)

  const { isGlobalEditmode } = useSelector((state) => state.comment)

  const updates = { editContent }

  const onDeleteButtonHandler = () => {
    const result = window.confirm('삭제하시겠습니까?')
    if (result) {
      // console.log('Deleting comment with commentId gameId', comment.commentId, comment.GameId)
      dispatch(__deleteComment({ commentId: comment.commentId, gameId: comment.GameId }))
    } else {
      return
    }
  }

  return (
    <>
      {edit ? (
        <div key={comment.commentId} className="box_txt_warp">
          <input
            className="box_content"
            type="text"
            value={editContent}
            onChange={(event) => setEditContent(event.target.value)}
          />

          <div>
            <button
              onClick={() => {
                dispatch(__updatedComment({ commentId: comment.commentId, content: editContent }))
                setEdit((pre) => !pre)
              }}
            >
              완료
            </button>
          </div>
        </div>
      ) : (
        <div key={comment.commentId} className="box_txt_warp">
          <div className="box_content">{updates.editContent}</div>
          <div>{comment.updatedAt.substr(0, 10)}</div>
          <button
            onClick={() => {
              // dispatch(__updatedComment(comment.commentId, editContent));
              setEdit(!edit)
            }}
          >
            수정
          </button>
          <button onClick={onDeleteButtonHandler} disabled={isGlobalEditmode}>
            삭제
          </button>
        </div>
      )}
    </>
  )
}

export default EditComment
