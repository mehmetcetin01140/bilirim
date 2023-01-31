import { configureStore } from '@reduxjs/toolkit';
import ThemeSlice from './slices/theme-slice';
import  AppSlice  from './slices/app-slice';
import {
  useDispatch as useDispatchBase,
  useSelector as useSelectorBase,
} from 'react-redux';

export const store = configureStore({
  reducer: {
    Theme : ThemeSlice,
    AppSlice : AppSlice
  },
});


export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useDispatch = () => useDispatchBase<AppDispatch>();

export const useSelector = <TSelected = unknown>(
  selector: (state: RootState) => TSelected
): TSelected => useSelectorBase<RootState, TSelected>(selector);