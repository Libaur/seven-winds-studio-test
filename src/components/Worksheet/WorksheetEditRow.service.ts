import { nanoid } from 'nanoid';

const TABLE_HEAD_TITLES = [
  'Уровень',
  'Наименование работ',
  'Основная з/п',
  'Оборудование',
  'Накладные расходы',
  'Сметная прибыль'
];

type Row = {
  id: string;
  rowName: string;
  salary: string;
  equipmentCosts: string;
  overheads: string;
  estimatedProfit: string;
  edited: boolean;
  hovered: boolean;
  child: Row[] | [];
};

const initialRow = {
  id: '',
  rowName: '',
  salary: '0',
  equipmentCosts: '0',
  overheads: '0',
  estimatedProfit: '0',
  edited: true,
  hovered: false,
  child: []
};

const initialState: Row[] = [];

const mockRows = [
  {
    id: '1313446',
    rowName: 'Бухие работы',
    salary: 43634645634,
    equipmentCosts: 5686945699.779,
    overheads: 245614235,
    estimatedProfit: 87534754.68,
    edited: false,
    hovered: false,
    child: [
      {
        id: '3435345',
        rowName: 'Системный отстой',
        salary: 568699319779,
        equipmentCosts: 8757544368,
        overheads: 4363456634,
        estimatedProfit: 241.24235,
        edited: false,
        hovered: false,
        child: []
      },
      {
        id: '6456449',
        rowName: 'Маленький бизнес большие возможности',
        salary: 4363463434,
        equipmentCosts: 568693499779,
        overheads: 2345523,
        estimatedProfit: 2414523.5,
        edited: false,
        hovered: false,
        child: []
      }
    ]
  },
  {
    id: '353458',
    rowName: 'Хитрый подрядчик',
    salary: 241422335,
    equipmentCosts: 875754468,
    overheads: 875725468,
    estimatedProfit: 5686959.9779,
    edited: false,
    hovered: false,
    child: []
  },
  {
    id: '546547',
    rowName: 'Квартиры в долг',
    salary: 24142335,
    equipmentCosts: 875752468,
    overheads: 5686.9599779,
    estimatedProfit: 436342634,
    edited: false,
    hovered: false,
    child: []
  }
];

const preparedMockRows: Row[] = mockRows.map((row) => ({
  id: row.id,
  rowName: row.rowName,
  salary: row.salary.toString(),
  equipmentCosts: row.equipmentCosts.toString(),
  overheads: row.overheads.toString(),
  estimatedProfit: row.estimatedProfit.toString(),
  edited: row.edited,
  hovered: row.hovered,
  child: row.child.length
    ? row.child.map((childRow) => ({
        id: childRow.id,
        rowName: childRow.rowName,
        salary: childRow.salary.toString(),
        equipmentCosts: childRow.equipmentCosts.toString(),
        overheads: childRow.overheads.toString(),
        estimatedProfit: childRow.estimatedProfit.toString(),
        edited: childRow.edited,
        hovered: childRow.hovered,
        child: []
      }))
    : []
}));

function worksheetReducer(
  state: Row[] = preparedMockRows,
  action: {
    type: string;
    id: string;
    rowCells?: Partial<Row>;
  }
): Row[] {
  switch (action.type) {
    case 'ROW_EDITED':
      return state.map((row) =>
        row.id === action.id
          ? { ...row, edited: true }
          : row.child
            ? {
                ...row,
                child: row.child.map((childRow) =>
                  childRow.id === action.id ? { ...childRow, edited: true } : childRow
                )
              }
            : row
      );
    case 'ROW_UPDATED':
      if (action.rowCells) {
        return state.map((row) =>
          row.id === action.id
            ? { ...row, ...action.rowCells, id: action.id, edited: false }
            : row.child
              ? {
                  ...row,
                  child: row.child.map((childRow) =>
                    childRow.id === action.id
                      ? { ...row, ...action.rowCells, id: action.id, edited: false }
                      : childRow
                  )
                }
              : row
        );
      }
      return state;
    case 'ROW_DELETED':
      return state.flatMap((row) => {
        if (row.id === action.id) {
          return [];
        } else if (row.child) {
          return [
            {
              ...row,
              child: row.child.flatMap((childRow) => {
                if (childRow.id === action.id) {
                  return [];
                } else {
                  return [childRow];
                }
              })
            }
          ];
        } else {
          return [row];
        }
      });
    case 'ROW_HOVERED':
      return state.map((row) =>
        row.id === action.id
          ? { ...row, hovered: true }
          : row.child
            ? {
                ...row,
                child: row.child.map((childRow) =>
                  childRow.id === action.id ? { ...childRow, hovered: true } : childRow
                )
              }
            : row
      );
    case 'ROW_HOVERED_OFF':
      return state.map((row) =>
        row.id === action.id
          ? { ...row, hovered: false }
          : row.child
            ? {
                ...row,
                child: row.child.map((childRow) =>
                  childRow.id === action.id ? { ...childRow, hovered: false } : childRow
                )
              }
            : row
      );
    case 'ROW_SUBMITED':
      if (action.rowCells) {
        return [...state, { ...initialRow, ...action.rowCells, edited: false, id: nanoid() }];
      } else if (action.id) {
        return state.map((row) => {
          if (row.id === action.id) {
            return {
              ...row,
              child: [...row.child, { ...initialRow, id: nanoid() }]
            };
          } else {
            return {
              ...row,
              child: row.child.map((childRow) => {
                if (childRow.id === action.id) {
                  return {
                    ...childRow,
                    child: [...childRow.child, { ...initialRow, id: nanoid() }]
                  };
                } else {
                  return childRow;
                }
              })
            };
          }
        });
      }
      return [...state, { ...initialRow, id: nanoid() }];
    default:
      return state;
  }
}

export { TABLE_HEAD_TITLES, type Row, initialRow, initialState, worksheetReducer };
