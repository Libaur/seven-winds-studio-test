const TABLE_HEAD_TITLES = [
   'Уровень',
   'Наименование работ',
   'Основная з/п',
   'Оборудование',
   'Накладные расходы',
   'Сметная прибыль'
];

const initialRow = {
   id: '',
   rowName: '',
   salary: 0,
   equipmentCosts: 0,
   overheads: 0,
   estimatedProfit: 0,
   edited: false
};

type Row = typeof initialRow;

const initialState: Row[] = [];

function worksheetReducer(
   state: Row[] | [] = [],
   action: {
      type: string;
      id: string;
      rowCells?: Row;
   }
): Row[] {
   switch (action.type) {
      case 'EDIT_ROW':
         const editedRow = state.find((row) => row.id === action.id);
         if (editedRow) {
            return [...state.filter((row) => row.id !== action.id), { ...editedRow, edited: true }];
         }
         return state;
      case 'UPDATE_ROW':
         const updatedRow = state.find((row) => row.id === action.id);

         if (updatedRow && action.rowCells) {
            return [
               ...state.filter((row) => row.id !== action.id),
               { ...action.rowCells, id: action.id, edited: false }
            ];
         }
         return state;
      case 'SUBMIT_FORM':
         if (action.rowCells) {
            return [...state, action.rowCells];
         }
         return state;
      case 'RESET_FORM':
         return initialState;
      default:
         return state;
   }
}

export { TABLE_HEAD_TITLES, type Row, initialRow, initialState, worksheetReducer };
