import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TreeResponse, RecalculatedRows, RecalculatedRowsResponse, RowsState } from 'src/App.types';
import { fetchRowsList, createRow, updateRow, deleteRow } from 'src/api';

const initialState: RowsState = {
  rows: [],
  lastCreatedRowId: null,
  status: 'idle',
  error: null
};

export const rowsSlice = createSlice({
  name: 'rows',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRowsList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRowsList.fulfilled, (state, action: PayloadAction<TreeResponse[]>) => {
        state.status = 'succeeded';
        state.rows = action.payload;
      })
      .addCase(fetchRowsList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(createRow.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createRow.fulfilled, (state, action: PayloadAction<RecalculatedRows>) => {
        state.status = 'succeeded';
        const newRow = action.payload.current;
        if (state.rows.length) state.lastCreatedRowId = newRow.id;
        state.rows.push(newRow);
        // const newRow = action.payload.recalculated.current;
        // const parentId = action.payload.parentId;
        // if (parentId) {
        //   state.rows = state.rows.map((row) => {
        //     if (row.id === parentId) {
        //       return {
        //         ...row,
        //         child:
        //           row.child.length === 0
        //             ? [{ ...newRow, child: [] }]
        //             : [...row.child, { ...newRow, child: [] }]
        //       };
        //     }
        //     return row;
        //   });
        // } else {
        //   state.rows.push({ ...newRow, child: [] });
        // }
      })
      .addCase(createRow.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(updateRow.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateRow.fulfilled, (state, action: PayloadAction<RecalculatedRowsResponse>) => {
        state.status = 'succeeded';
        state.rows = state.rows.filter((row) => row.id !== action.payload.rowId);
        state.rows.push(action.payload.recalculated.current);
        // const updatedRow = action.payload.current;
        // state.rows = state.rows.map((row) => {
        //   if (row.id === updatedRow.id) {
        //     return { ...row, ...updatedRow };
        //   }
        //   return row;
        // });
      })
      .addCase(updateRow.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(deleteRow.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteRow.fulfilled, (state, action: PayloadAction<RecalculatedRowsResponse>) => {
        state.status = 'succeeded';
        state.rows.filter((row) => row.id !== action.payload.rowId);
      })
      .addCase(deleteRow.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  }
});

export default rowsSlice.reducer;
