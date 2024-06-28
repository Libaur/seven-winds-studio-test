const TABLE_HEAD_TITLES = [
   'Уровень',
   'Наименование работ',
   'Основная з/п',
   'Оборудование',
   'Накладные расходы',
   'Сметная прибыль'
];

const initialRow = {
   rowName: '',
   salary: 0,
   equipmentCosts: 0,
   overheads: 0,
   estimatedProfit: 0
};

type Row = typeof initialRow;

const initialState: Row[] = [];

function worksheetReducer(
   state: Row[] = initialState,
   action: {
      type: string;
      field?: string;
      value?: string;
      index?: number;
      rowCells?: Row;
   }
): Row[] {
   switch (action.type) {
      case 'UPDATE_FIELD':
         if (action.index && action.field && action.value) {
            return state.map((row, index) =>
               index === action.index ? { ...row, [action.field!]: action.value } : row
            );
         }
         return state;
      case 'SUBMIT_FORM':
         if (action.rowCells) {
            return [...state, { ...action.rowCells }];
         }
         return state;
      case 'RESET_FORM':
         return initialState;
      default:
         return state;
   }
}

export { TABLE_HEAD_TITLES, type Row, initialRow, initialState, worksheetReducer };
