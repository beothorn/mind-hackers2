import { configureStore } from '@reduxjs/toolkit'
import appStateReducer from './appStateSlice'
import gameStateReducer from './gameStateSlice'

const store = configureStore({
    reducer: {
        appState: appStateReducer,
        gameState: gameStateReducer,
    },
})
  
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;