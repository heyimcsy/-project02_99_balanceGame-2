import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const __getComments = createAsyncThunk('GET_COMMENTS', async (payload, thunkAPI) => {
  try {
    // console.log('payloadaddcomment--', payload)
    const { data } = await axios.get(`http://43.201.20.151:3001/api/games/${payload}`)
    console.log('card.comments.dataAA--->', data.game[0].comments)
    return thunkAPI.fulfillWithValue(data.game[0].comments)
  } catch (error) {
    console.log('card.error--->', error)
    return thunkAPI.rejectWithValue(error)
  }
})

export const __getCommentByCommendId = createAsyncThunk('GET_COMMENT_BY_COMMENT_ID', async (payload, thunkAPI) => {
  try {
    const { data } = await axios.get(`http://43.201.20.151:3001/api/games/${payload}/comments/${payload}`)
    return thunkAPI.fulfillWithValue(data)
  } catch (e) {
    return thunkAPI.rejectWithValue(e.code)
  }
})
//////필요한 payload 값만 가져오기
export const __addComments = createAsyncThunk('ADD_COMMENTS', async (payload, thunkAPI) => {
  try {
    console.log('payloadaddcomment--', payload)
    const { data } = await axios.post(`http://43.201.20.151:3001/api/games/${payload.GameId}`, {
      option: payload.option,
      content: payload.content,
    })
    return thunkAPI.fulfillWithValue(data)
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const __updatedComment = createAsyncThunk('UPDATE_COMMENTS', async (payload, thunkAPI) => {
  try {
    console.log('payloadupdatecomment--', payload)
    axios.patch(`http://43.201.20.151:3001/api/games/${payload.gameId}/comments/${payload.commentId}`, {
      commentId: payload.commentId,
      content: payload.content,
    })
    console.log('commentS.payload', payload)
    return thunkAPI.fulfillWithValue(payload)
  } catch (error) {
    console.log('comments.error', error)
    return thunkAPI.rejectWithValue(error)
  }
})

export const __deleteComment = createAsyncThunk('DELETE_COMMENT', async (payload, thunkAPI) => {
  try {
    console.log('payloaddelete', payload)
    await axios.delete(`http://43.201.20.151:3001/api/games/${payload.gameId}/comments/${payload.commentId}`)
    return thunkAPI.fulfillWithValue(payload)
  } catch (error) {
    return thunkAPI.rejectWithValue(error.code)
  }
})
//바뀌는 데이터들은 요 안에 있는 값들만 바뀐다.
//state 값들은 여기서 적고 밑에 엑스트라에서
const initialState = {
  data: {},
  isLoading: false,
  error: null,
}

export const commentASlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {},
  extraReducers: {
    [__getComments.pending]: (state, action) => {
      state.isLoading = true
    },
    [__getComments.fulfilled]: (state, action) => {
      state.isLoading = false
      console.log('action.comments.dataAA', action.payload)
      state.comments = action.payload
    },
    [__getComments.rejected]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    [__addComments.pending]: (state) => {
      state.isLoading = true
    },

    // 댓글 조회 (todoId)
    [__getCommentByCommendId.pending]: (state) => {
      state.isLoading = true
    },
    [__getCommentByCommendId.fulfilled]: (state, action) => {
      state.isLoading = false
      state.data = action.payload
    },
    [__getCommentByCommendId.rejected]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },

    [__addComments.fulfilled]: (state, action) => {
      state.isLoading = false
      console.log('action.comments.data->', action.payload)
      state.data.push(action.payload)
    },
    [__addComments.rejected]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    [__updatedComment.fulfilled]: (state, action) => {
      console.log('card.action.payload-->', action.payload)
      const target = state.data.findIndex((comment) => comment.commentId === action.payload.id)
      state.isLoading = false
      state.data.splice(target, 1, action.payload)
    },
    [__updatedComment.pending]: (state) => {
      state.isLoading = true
    },
    [__updatedComment.rejected]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    [__deleteComment.pending]: (state) => {
      state.isLoading = true
    },
    [__deleteComment.fulfilled]: (state, action) => {
      state.isLoading = false
      console.log('deletedata', target)
      const target = state.data.findIndex((comment) => comment.commentId === action.payload.commentId)

      state.data.splice(target, 1)
    },
    [__deleteComment.rejected]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
  },
})

export const {} = commentASlice.actions
export default commentASlice.reducer
