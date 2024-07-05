import { createAsyncThunk } from '@reduxjs/toolkit';
import { API, ERRORS } from './constants';
import {
  OutlayRowRequest,
  TreeResponse,
  RecalculatedRows,
  RecalculatedRowsResponse
} from '../App.types';

const fetchRowsList = createAsyncThunk<TreeResponse[], void, { rejectValue: string }>(
  'rows/fetchRowsList',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API.SERVER_URL}${API.SAME_PARAMS}${API.ENTITY_ID}/row/list`);
      if (!response.ok) {
        throw new Error(ERRORS.FETCH_LIST);
      }
      const data: TreeResponse[] = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue(ERRORS.UNKNOWN);
    }
  }
);

const createRow = createAsyncThunk<
  RecalculatedRows,
  { outlayRowRequest: OutlayRowRequest },
  { rejectValue: string }
>('rows/createRow', async ({ outlayRowRequest }, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API.SERVER_URL}${API.SAME_PARAMS}${API.ENTITY_ID}/row/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(outlayRowRequest)
    });
    if (!response.ok) {
      throw new Error(ERRORS.CREATE);
    }
    const recalculated: RecalculatedRows = await response.json();
    return recalculated;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue(ERRORS.UNKNOWN);
  }
});

const updateRow = createAsyncThunk<
  RecalculatedRowsResponse,
  { outlayRowRequest: OutlayRowRequest; rowId: number },
  { rejectValue: string }
>('rows/updateRow', async ({ outlayRowRequest, rowId }, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `${API.SERVER_URL}${API.SAME_PARAMS}${API.ENTITY_ID}/row/${rowId}/update`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(outlayRowRequest)
      }
    );
    if (!response.ok) {
      throw new Error(ERRORS.UPDATE);
    }
    const recalculated: RecalculatedRows = await response.json();
    return { recalculated, rowId };
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue(ERRORS.UNKNOWN);
  }
});

const deleteRow = createAsyncThunk<
  RecalculatedRowsResponse,
  { rowId: number },
  { rejectValue: string }
>('rows/deleteRow', async ({ rowId }, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `${API.SERVER_URL}${API.SAME_PARAMS}${API.ENTITY_ID}/row/${rowId}/delete`,
      {
        method: 'DELETE'
      }
    );
    if (!response.ok) {
      throw new Error(ERRORS.DELETE);
    }
    const recalculated: RecalculatedRows = await response.json();
    return { recalculated, rowId };
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue(ERRORS.UNKNOWN);
  }
});

export { fetchRowsList, createRow, updateRow, deleteRow };
