import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  OutlayRowRequest,
  TreeResponse,
  RecalculatedRows,
  RecalculatedRowsResponse,
  RowId
} from '../App.types';

const API = {
  SERVER_URL: 'http://185.244.172.108:8081',
  ENTITY_ID: 128766
};

const fetchRowsList = createAsyncThunk<TreeResponse[], void, { rejectValue: string }>(
  'rows/fetchRowsList',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API.SERVER_URL}/v1/outlay-rows/entity/${API.ENTITY_ID}/row/list`
      );
      if (!response.ok) {
        throw new Error('Ошибка при загрузке списка строк');
      }
      const data: TreeResponse[] = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Произошла неизвестная ошибка');
    }
  }
);

const createRow = createAsyncThunk<
  RecalculatedRows,
  { outlayRowRequest: OutlayRowRequest },
  { rejectValue: string }
>('rows/createRow', async ({ outlayRowRequest }, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `${API.SERVER_URL}/v1/outlay-rows/entity/${API.ENTITY_ID}/row/create`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(outlayRowRequest)
      }
    );
    if (!response.ok) {
      throw new Error('Ошибка при создании строки');
    }
    const recalculated: RecalculatedRows = await response.json();
    return recalculated;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue('Произошла неизвестная ошибка');
  }
});

const updateRow = createAsyncThunk<
  RecalculatedRowsResponse,
  { outlayRowRequest: OutlayRowRequest; rowId: number },
  { rejectValue: string }
>('rows/updateRow', async ({ outlayRowRequest, rowId }, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `${API.SERVER_URL}/v1/outlay-rows/entity/${API.ENTITY_ID}/row/${rowId}/update`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(outlayRowRequest)
      }
    );
    if (!response.ok) {
      throw new Error('Ошибка при обновлении строки');
    }
    const recalculated: RecalculatedRows = await response.json();
    return { recalculated, rowId };
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue('Произошла неизвестная ошибка');
  }
});

const deleteRow = createAsyncThunk<
  RecalculatedRowsResponse,
  { rowId: number },
  { rejectValue: string }
>('rows/deleteRow', async ({ rowId }, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `${API.SERVER_URL}/v1/outlay-rows/entity/${API.ENTITY_ID}/row/${rowId}/delete`,
      {
        method: 'DELETE'
      }
    );
    if (!response.ok) {
      throw new Error('Ошибка при удалении строки');
    }
    const recalculated: RecalculatedRows = await response.json();
    return { recalculated, rowId };
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue('Произошла неизвестная ошибка');
  }
});

export { fetchRowsList, createRow, updateRow, deleteRow };
