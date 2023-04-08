import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import boxSlicer from './slice/boxSlicer';
import questionsPageSlice from './slice/questionsSlice';

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    box: boxSlicer,
    questionsPageSlice: questionsPageSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
