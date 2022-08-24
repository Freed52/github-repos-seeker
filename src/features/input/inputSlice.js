import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchOrg } from '../../api/';

const initialState = {
    message: null,
    startPage: 0,
    search: ''
};

export const checkOrg = createAsyncThunk(
    'input/fetchOrg',
    async (search) => {
        const response = await fetchOrg(search);
        const { status } = response
        return (status && status === 404) ? response.data.message : 'Found';
    }
);

export const responseList = createSlice({
    name: 'input',
    initialState,
    reducers: {
        clearMessage: (state, action) => {
            state.message = null
        },
        setSearchParams: (state, action) => {
            state.startPage = 1;
            state.search = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(checkOrg.fulfilled, (state, action) => {
            state.message = action.payload
        })
    },
});

export const { setSearchParams, clearMessage } = responseList.actions;

export default responseList.reducer;