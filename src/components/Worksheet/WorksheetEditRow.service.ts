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

const currentRows: typeof initialRow[] = [];

function worksheetReducer(
   state: typeof initialRow,
   action: { type: string; field?: string; value?: string }
): typeof initialRow {
   switch (action.type) {
      case 'UPDATE_FIELD':
         return { ...state, [action.field!]: action.value! };
      case 'SUBMIT_FORM':
         return state;
      case 'RESET_FORM':
         return initialRow;
      default:
         return state;
   }
}

export { TABLE_HEAD_TITLES, initialRow, currentRows, worksheetReducer };
