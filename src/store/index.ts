import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import rowsReducer from './rows-slice';

const store = configureStore({
  reducer: rowsReducer
});

setupListeners(store.dispatch);

type AppState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
const useAppDispatch = () => useDispatch<AppDispatch>();

export { store, useAppSelector, useAppDispatch };
