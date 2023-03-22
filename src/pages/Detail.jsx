import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { __getComment } from '../redux/modules/commentASlice'
import { __getCardThunk, clearCard, __updatedCardThunk } from '../redux/modules/editSlice'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Comments from '../features/card/Comments'
import styled from 'styled-components'
import { BsArrowLeftCircleFill } from 'react-icons/bs'
import heartIcon from '../image/Pasted.png'

const Detail = () => {
  const dispatch = useDispatch()
  const { gameId } = useParams()

  const [isEditMode, setIsEditMode] = useState(false)
  const [updatedOptionA, setUpdatedOptionA] = useState('')
  const [updatedOptionB, setUpdatedOptionB] = useState('')
  const [plusLikesA, setPlusLikesA] = useState(0)
  const [plusLikesB, setPlusLikesB] = useState(0)
  const card = useSelector((state) => state.card.card)

  useEffect(() => {
    dispatch(__getCardThunk(gameId))
    return () => dispatch(clearCard())
  }, [dispatch, gameId])

  useEffect(() => {
    setUpdatedOptionA(card.optionA)
    setUpdatedOptionB(card.optionB)
    setPlusLikesA(card.likesA)
    setPlusLikesB(card.likesB)
  }, [card])

  const saveUpdatedLikesA = (updatedLikesA) => {
    dispatch(
      __updatedCardThunk({
        ...card,
        likesA: updatedLikesA,
      })
    )
  }
  const saveUpdatedLikesB = (updatedLikesB) => {
    dispatch(
      __updatedCardThunk({
        ...card,
        likesB: updatedLikesB,
      })
    )
  }
  const onIncreaseLikesAHandler = () => {
    const updatedLikesA = plusLikesA + 1
    setPlusLikesA(updatedLikesA)
    saveUpdatedLikesA(updatedLikesA)
  }
  const onIncreaseLikesBHandler = () => {
    const updatedLikesB = plusLikesB + 1
    setPlusLikesB(updatedLikesB)
    saveUpdatedLikesB(updatedLikesB)
  }

  const onSaveButtonHandler = () => {
    if (updatedOptionA.trim() === '') {
      return alert('입력된 내용이 없습니다.')
    } else if (updatedOptionB.trim() === '') {
      return alert('입력된 내용이 없습니다.')
    }

    dispatch(
      __updatedCardThunk({
        ...card,
        optionA: updatedOptionA,
        optionB: updatedOptionB,
        likesA: plusLikesA,
        likesB: plusLikesB,
      })
    )
    setIsEditMode(false)
  }

  return (
    <>
      <BackStyle>
        <Link to={'/games'}>
          <BsArrowLeftCircleFill
            style={{
              color: '#FF6DB4',
              fontSize: '15px',
            }}
          />
        </Link>
        <div>
          {isEditMode ? (
            <>
              <Textarea
                name="body"
                rows="10"
                maxLength={200}
                value={updatedOptionA}
                onChange={(event) => {
                  setUpdatedOptionA(event.target.value)
                }}
              />
              <Textarea
                name="body"
                rows="10"
                maxLength={200}
                value={updatedOptionB}
                onChange={(event) => {
                  setUpdatedOptionB(event.target.value)
                }}
              />
            </>
          ) : (
            <div
              style={{
                marginTop: '20px',
                display: 'flex',
                justifyContent: 'space-around',
              }}
            >
              <ContentBox>
                <OptionLikes>
                  <div
                    style={{
                      fontSize: '12px',
                      color: '#ff6db4',
                    }}
                  >
                    option A
                  </div>
                  <div
                    style={{
                      display: 'flex',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '12px',
                        color: 'white',
                      }}
                    >
                      {card.likesA}
                    </div>
                    <img
                      style={{
                        height: '14px',
                      }}
                      src={heartIcon}
                      onClick={onIncreaseLikesAHandler}
                    />
                  </div>
                </OptionLikes>

                <div>{card.optionA}</div>
              </ContentBox>
              <div>VS</div>
              <ContentBox>
                <OptionLikes>
                  <div
                    style={{
                      fontSize: '12px',
                      color: '#ff6db4',
                    }}
                  >
                    option B
                  </div>
                  <div
                    style={{
                      display: 'flex',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '12px',
                        color: 'white',
                      }}
                    >
                      {card.likesB}
                    </div>
                    <img
                      style={{
                        height: '14px',
                      }}
                      src={heartIcon}
                      onClick={onIncreaseLikesBHandler}
                    />
                  </div>
                </OptionLikes>
                <div>{card.optionB}</div>
              </ContentBox>
            </div>
          )}

          <div>
            {isEditMode ? (
              <Button onClick={onSaveButtonHandler}>SAVE</Button>
            ) : (
              <Button
                onClick={() => {
                  setIsEditMode(true)
                }}
              >
                EDIT
              </Button>
            )}
          </div>
        </div>
        {!isEditMode && <Comments />}
      </BackStyle>
    </>
  )
}

export default Detail

const BackStyle = styled.div`
  background-color: #ffafd6;
`
const ContentBox = styled.div`
  width: 25%;
  padding: 10px 20px;
  border: 1px solid #ff6db4;
`
const OptionLikes = styled.div`
  display: flex;
  justify-content: space-between;
`

const Textarea = styled.textarea`
  width: 50%;
  border: 1px solid #eee;
  padding: 12px;
  font-size: 14px;
  color: #ff6db4;
  background-color: #ffe3f1;
`
const Button = styled.button`
  border-radius: 40px;
  border: 0px;
  color: #ff6db4;
  background-color: #ffe3f1;
  padding: 5px 20px;
`
