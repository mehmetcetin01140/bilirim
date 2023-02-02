import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";

export interface AppStateTypes {
  snackBarIsOpen: boolean;
  selectedCategory: {
    categoryId: number | null;
    dialogIsOpen: boolean;
  };
  isReadyForStart:boolean;
  score: number;
  isLastChoiseTrueOrFalse: null | boolean;
  retry:boolean

}

interface ActionTypes {
  categoryId: number | null;
  dialogIsOpen: boolean;
}

const initialState: AppStateTypes = {
  snackBarIsOpen: false,
  selectedCategory: {
    categoryId: null,
    dialogIsOpen: false,
  },
  isReadyForStart:false,
  score: 0,
  isLastChoiseTrueOrFalse: null,
  retry:false,

} as const;

export const AppSlice = createSlice({
  name: "AppSlice",
  initialState,
  reducers: {
    setSnackBarIsOpen: (
      state: Draft<typeof initialState>,
      action: PayloadAction<boolean>
    ) => {
      state.snackBarIsOpen = action.payload;
    },
    setSelectedCategory: (
      state: Draft<typeof initialState>,
      action: PayloadAction<ActionTypes>
    ) => {
      state.selectedCategory.categoryId = action.payload.categoryId;
      state.selectedCategory.dialogIsOpen = action.payload.dialogIsOpen;
    },
    setIsReadyForStart: (
      state: Draft<typeof initialState>,
      action: PayloadAction<boolean>
    ) => {
      state.isReadyForStart = action.payload;
    },
    setScore: (
      state: Draft<typeof initialState>,
      action: PayloadAction<number>
    ) => {
      state.score = action.payload;
    },
    setLastChoise: (
      state: Draft<typeof initialState>,
      action: PayloadAction<null | boolean>
    ) => {
      state.isLastChoiseTrueOrFalse = action.payload;
    },
    setRetry: (
      state: Draft<typeof initialState>,
      action: PayloadAction<boolean>
    ) => {
      state.retry = action.payload;
    },

  },
});


export const getAppState = (state: { AppSlice: AppStateTypes }) =>
  state.AppSlice;
export const {
  setSnackBarIsOpen,
  setSelectedCategory,
  setIsReadyForStart,
  setScore,
  setLastChoise,
  setRetry,

} = AppSlice.actions;

export default AppSlice.reducer;
