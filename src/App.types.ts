export type RowId = number | null;
// /v1/outlay-rows/entity/{eID}/row/create | createRowInEntity ---> request
// /v1/outlay-rows/entity/{eID}/row/{rID}/update | update updateRow ---> request
export type OutlayRowRequest = {
  equipmentCosts: number;
  estimatedProfit: number;
  machineOperatorSalary: number;
  mainCosts: number;
  materials: number;
  mimExploitation: number;
  overheads: number;
  parentId: number | null; // number if createRowInEntity ---> request
  rowName: string;
  salary: number;
  supportCosts: number;
};

// OutlayRowRequest + id, total - parentId
export type RowResponse = {
  equipmentCosts: number;
  estimatedProfit: number;
  id: number;
  machineOperatorSalary: number;
  mainCosts: number;
  materials: number;
  mimExploitation: number;
  overheads: number;
  rowName: string;
  salary: number;
  supportCosts: number;
  total: number;
};

// /v1/outlay-rows/entity/{eID}/row/create | createRowInEntity ---> response
// /v1/outlay-rows/entity/{eID}/row/{rID}/update | updateRow ---> response
// /v1/outlay-rows/entity/{eID}/row/{rID}/delete | deleteRow ---> response
export type RecalculatedRows = {
  changed: RowResponse[];
  current: RowResponse;
};

// /v1/outlay-rows/entity/{eID}/row/list | getTreeRows ---> response
export type TreeResponse = RowResponse & {
  child?: [] | TreeResponse[];
};

export type RecalculatedRowsResponse = {
  recalculated: RecalculatedRows;
  rowId: RowId;
};

export type RowsState = {
  rows: TreeResponse[];
  lastCreatedRowId: number | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};
