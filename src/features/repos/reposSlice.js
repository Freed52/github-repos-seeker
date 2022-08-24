import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchRepos } from '../../api/';
import { parseLink, getPagesCount, setPaginationSequence } from '../../lib/littleHelpers';

const initialState = {
    list: null,
    pagination: [],
    page: 0
};

export const getRepos = createAsyncThunk(
    'repos/fetchRepos',
    async ({ search, page }) => {
        const response = await fetchRepos(search, page);
        const { data, headers } = response
        const last = parseLink(headers.link)
        const pagesCount = getPagesCount(last)
        const pagination = setPaginationSequence(pagesCount)
        return { search, data, pagination };
    }
);

export const repos = createSlice({
    name: 'repos',
    initialState,
    reducers: {
        clearUpRepos: (state) => {
            state.list = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getRepos.fulfilled, (state, action) => {
            const { search, data, pagination } = action.payload
            state.list = data
            state.pagination = pagination
            state.search = search
        })
    },
});

export const { clearUpRepos } = repos.actions;

export default repos.reducer;
