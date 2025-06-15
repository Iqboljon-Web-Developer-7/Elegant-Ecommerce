import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserInfo {
    id?: string;
    name: string;
    email: string;
}

interface UserInfoState {
    userInfo: UserInfo | null;
}

const initialState: UserInfoState = {
    userInfo: JSON.parse(localStorage.getItem('userInfo') || 'null'),
};

const PermanentData = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        setUserInfo: (state, action: PayloadAction<UserInfo>) => {
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        },
        clearUserInfo: (state) => {
            state.userInfo = null;
            localStorage.removeItem('userInfo');
        },
    },
});

export const { setUserInfo, clearUserInfo } = PermanentData.actions;

export default PermanentData.reducer;