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

const mockRows = [
   {
      id: '1313446',
      rowName: 'Бухие работы',
      salary: 43634645634,
      equipmentCosts: 5686945699.779,
      overheads: 245614235,
      estimatedProfit: 87534754.68,
      edited: false
   },
   {
      id: '3435345',
      rowName: 'Системный отстой',
      salary: 568699319779,
      equipmentCosts: 8757544368,
      overheads: 4363456634,
      estimatedProfit: 241.24235,
      edited: false
   },
   {
      id: '6456449',
      rowName: 'Маленький бизнес большие возможности',
      salary: 4363463434,
      equipmentCosts: 568693499779,
      overheads: 2345523,
      estimatedProfit: 2414523.5,
      edited: false
   },
   {
      id: '353458',
      rowName: 'Хитрый подрядчик',
      salary: 241422335,
      equipmentCosts: 875754468,
      overheads: 875725468,
      estimatedProfit: 5686959.9779,
      edited: false
   },
   {
      id: '546547',
      rowName: 'Квартиры в долг',
      salary: 24142335,
      equipmentCosts: 875752468,
      overheads: 5686.9599779,
      estimatedProfit: 436342634,
      edited: false
   }
];

function worksheetReducer(
   state: Row[] = mockRows,
   action: {
      type: string;
      id: string;
      rowCells?: Partial<Row>;
   }
): Row[] {
   switch (action.type) {
      case 'EDIT_ROW':
         return state.map((row) => (row.id === action.id ? { ...row, edited: true } : row));
      case 'UPDATE_ROW':
         if (action.rowCells) {
            return state.map((row) =>
               row.id === action.id
                  ? { ...row, ...action.rowCells, id: action.id, edited: false }
                  : row
            );
         }
         return state;
      case 'SUBMIT_FORM':
         if (action.rowCells) {
            return [...state, { ...initialRow, ...action.rowCells }];
         }
         return state;
      case 'RESET_FORM':
         return initialState;
      default:
         return state;
   }
}

export { TABLE_HEAD_TITLES, type Row, initialRow, initialState, worksheetReducer };
