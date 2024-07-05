export type RowId = number | null;

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

export type RecalculatedRows = {
  changed: RowResponse[];
  current: RowResponse;
};

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
