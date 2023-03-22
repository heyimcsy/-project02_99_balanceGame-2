import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
import { __getCardsThunk } from '../redux/modules/cardsSlice'
import { useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
const CardList = () => {
  const dispatch = useDispatch()
  // const navigate = useNavigate()

  const { isLoading, error, cards } = useSelector((state) => {
    return state.cards
  })

  useEffect(() => {
    dispatch(__getCardsThunk())
  }, [])

  if (isLoading) {
    return <div>로딩중.....ㅎㅎ</div>
  }
  if (error) {
    return <div>{error.message}</div>
  }

  return (
    <div>
      <ul>
        {cards.map((card) => (
          <li key={card.gameId}>
            <strong>{card.title} </strong>
            <div>
              <div>
                <div>
                  <strong>{card.optionA}</strong>
                </div>
                <div>----------------------------------------</div>
                <div>
                  <strong>{card.optionB}</strong>
                </div>
              </div>
              <p>{card.userId}</p>
            </div>
            <Link to={`/games/${card.gameId}`}>Go</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
{
  /* 세현님 저 찾았어요 이저 밑에 값이 id일 때 디테일 카드 페이지에서 값들이 뜨는 것 이었씁니다 !!!! */
}
export default CardList
