import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const __getCardsThunk = createAsyncThunk('GET_CARDS', async (_, thunkAPI) => {
  try {
    const { data } = await axios.get('http://43.201.20.151:3001/api/games')
    console.log('data--->', { data: data.games })
    return thunkAPI.fulfillWithValue({ data: data.games })
  } catch (error) {
    console.log('error--->', error)
    return thunkAPI.rejectWithValue(error)
  }
})

const initialState = {
  cards: [],
  error: null,
  isLoading: false,
  isError: false,
}

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {},
  extraReducers: {
    [__getCardsThunk.fulfilled]: (state, action) => {
      state.isLoading = false
      state.isError = false
      state.cards = action.payload.data
      console.log('action.payload-->', action.payload)
    },
    [__getCardsThunk.rejected]: (state, action) => {
      state.isLoading = false
      state.isError = true
      state.error = action.payload
    },
    [__getCardsThunk.pending]: (state) => {
      state.isLoading = true
      state.isError = true
    },
    // [__updatedCardThunk.fulfilled]: (state, action) => {
    //   state.isLoading = false
    //   state.todo = action.payload
    // },
    // [__updatedCardThunk.pending]: (state) => {
    //   state.isLoading = true
    // },
    // [__updatedCardThunk.rejected]: (state, action) => {
    //   state.isLoading = false
    //   state.error = action.payload
    // },
  },
})
export const {} = cardsSlice.actions
export default cardsSlice.reducer
