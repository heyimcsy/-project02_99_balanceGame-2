import React, { useState } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { __addComments } from '../../redux/modules/commentASlice'

const AddCommentForm = () => {
  const dispatch = useDispatch()
  const { gameId } = useParams()

  const [comments, setComments] = useState({
    option: '',
    content: '',
  })

  const onAddCommentButtonHandler = (event) => {
    event.preventDefault()
    if (comments.content.trim() === '') {
      return alert('항목을 입력해주세요.')
    }
    dispatch(__addComments({ GameId: gameId, ...comments }))
    setComments({
      option: '',
      content: '',
    })
  }
  const handleSelectChange = (event) => {
    setComments({ ...comments, option: event.target.value })
  }

  const handleInputChange = (event) => {
    setComments({ ...comments, content: event.target.value })
  }
  // console.log('response-->')
  return (
    <>
      <form onSubmit={onAddCommentButtonHandler}>
        <InputBox>
          <div>
            <SelectOption value={comments.option} id="option" onChange={handleSelectChange}>
              <option value="">Options ▼</option>
              <option value="A">A</option>
              <option value="B">B</option>
            </SelectOption>
            <CommentInput
              placeholder="댓글을 달아주세요"
              value={comments.content}
              name="content"
              type="text"
              onChange={handleInputChange}
              maxLength={100}
            />
          </div>

          <SubmitButton type="submit" onClick={onAddCommentButtonHandler}>
            SUBMIT
          </SubmitButton>
        </InputBox>
      </form>
    </>
  )
}

export default AddCommentForm

const InputBox = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
`
const SelectOption = styled.select`
  background-color: #ffe3f1;
  appearance: none;
  border: 0px;
  border-radius: 40px 0px 0px 40px;
  padding: 5px 10px;
  color: #ff6db4;
`
const CommentInput = styled.input`
  border: 0px;
  padding: 5px 60px;
  border-radius: 0px 40px 40px 0px;
  color: #ff6db4;
  ::placeholder {
    color: #ffe3f1;
  }
`
const SubmitButton = styled.button`
  border-radius: 40px;
  border: 0px;
  color: #ff6db4;
  background-color: #ffe3f1;
  padding: 5px 20px;
`
