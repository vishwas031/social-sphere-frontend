// This folder is for Redux state management

// redux toolkit is a library to simplify the use redux
import { createSlice } from "@reduxjs/toolkit";

// this state will be stored globally and can be used at any instance of time while navigating to different pages
const intialState = {
    // for dark/light mode
    mode: "dark",
    user: null,
    token: null,
    // posts to be shown
    posts: [],
}

export const authSlice = createSlice({
    name: "auth",
    intialState,
    // these are the functions that modify the global state
    reducers:{
        // functions to change the states
        // //redux creates a new state, it doesnt updates the initial state
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setFriends: (state, action) => {
            if(state.user) {
                state.user.friends = action.payload.friends;
            } else {
                console.error("no friends :(")
            }
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if(post._id === action.payload.post_id) return action.payload.post;
                return post;
            });
            state.posts = updatedPosts;
        }
    }
})

export const {setMode, setLogin, setLogout, setFriends, setPosts, setPost} = authSlice.actions;
export default authSlice.reducer;