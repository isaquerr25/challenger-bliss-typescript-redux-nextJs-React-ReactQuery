import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QuestionListType } from '../../api';

type QuestionsPageSlice = {
  offset: number;
  questions: QuestionListType;
  lastPosition: number;
};

const initialState: QuestionsPageSlice = {
  offset: 0,
  questions: [],
  lastPosition: 0,
};

export const slice = createSlice({
  name: 'questionsPageSlice',
  initialState,
  reducers: {
    changeOffset: (state, { payload }: PayloadAction<number>) => {
      return { ...state, offset: payload };
    },
    changeQuestions: (state, { payload }: PayloadAction<QuestionListType>) => {
      return {
        ...state,
        questions: payload,
      };
    },
    changeLastPosition: (state, { payload }: PayloadAction<number>) => {
      return {
        ...state,
        lastPosition: payload,
      };
    },
  },
});

export const {
  changeOffset,
  changeQuestions,
  changeLastPosition,
} = slice.actions;

export default slice.reducer;
