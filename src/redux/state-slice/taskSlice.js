import{createSlice} from "@reduxjs/toolkit";

export const taskSlice=createSlice({
    name: "taskSlice",
    initialState:{
        New:[],
        Completed:[],
        Progress:[],
        Cancelled:[]
    },
    reducers:{
        SetNewTask:(state,action)=>{
            state.New=action.payload;
        },
        SetCompletedTask:(state,action)=>{
          state.Completed=action.payload;
        },
        SetProgressTask:(state,action)=>{
            state.Progress=action.payload;
        },
        SetCancelledTask:(state,action)=>{
            state.Cancelled=action.payload;
        }
    }
})

export const {SetNewTask,SetCompletedTask, SetProgressTask,SetCancelledTask} = taskSlice.actions;
export default taskSlice.reducer;