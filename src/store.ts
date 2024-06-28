import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { worksheetReducer } from './components/Worksheet/WorksheetEditRow.service';

const store = configureStore({
   reducer: worksheetReducer
});

type AppState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
const useAppDispatch = () => useDispatch<AppDispatch>();

export { store, useAppSelector, useAppDispatch };
