import { configureStore } from '@reduxjs/toolkit'
import cards from '../modules/cardsSlice'
import card from '../modules/editSlice'
import comments from '../modules/commentASlice'
import comment from '../modules/commentSlice'

const store = configureStore({
  reducer: {
    cards,
    card,
    comments,
    comment,
  },
})

export default store
