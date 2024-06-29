import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type Row = {
  id: number;
  rowName: string;
  salary: number;
  equipmentCosts: number;
  overheads: number;
  estimatedProfit: number;
};

type ChangedRow = {
  equipmentCosts: number;
  estimatedProfit: number;
  overheads: number;
  rowName: string;
  salary: number;
};

type RowChild = Row[] | [] | [null];

type CurrentRow = Row & {
  child: RowChild;
};

type RowsResponse = {
  changed: Row[];
  current: Row;
};

const API = {
  SERVER_URL: 'http://185.244.172.108:8081',
  ENTITY_ID: 128766
};

export const requestController = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: API.SERVER_URL
  }),
  endpoints: (builder) => ({
    getRowsList: builder.query<CurrentRow[], void>({
      query: () => `/v1/outlay-rows/entity/${API.ENTITY_ID}/row/list`
    }),
    createRow: builder.mutation<RowsResponse, ChangedRow>({
      query: (changedRow) => ({
        url: `/v1/outlay-rows/entity/${API.ENTITY_ID}/row/create`,
        method: 'POST',
        body: changedRow
      })
    }),
    updateRow: builder.mutation<RowsResponse, { changedRow: ChangedRow; rowId: number }>({
      query: ({ changedRow, rowId }) => ({
        url: `/v1/outlay-rows/entity/${API.ENTITY_ID}/row/${rowId}/update`,
        method: 'POST',
        body: changedRow
      })
    }),
    deleteRow: builder.mutation<RowsResponse, { changedRow: ChangedRow; rowId: number }>({
      query: ({ changedRow, rowId }) => ({
        url: `/v1/outlay-rows/entity/${API.ENTITY_ID}/row/${rowId}/delete`,
        method: 'DELETE',
        body: changedRow
      })
    })
  })
});
