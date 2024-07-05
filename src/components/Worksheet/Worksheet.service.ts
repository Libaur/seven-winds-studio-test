const TABLE_HEAD_TITLES = [
  'Уровень',
  'Наименование работ',
  'Основная з/п',
  'Оборудование',
  'Накладные расходы',
  'Сметная прибыль'
];

const ROW_INITIAL_VALUES = {
  rowName: '',
  salary: 0,
  equipmentCosts: 0,
  overheads: 0,
  estimatedProfit: 0,
  machineOperatorSalary: 0,
  mainCosts: 0,
  materials: 0,
  mimExploitation: 0,
  supportCosts: 0
};

const numberCheckPattern = /[^\d.]/g;

export { TABLE_HEAD_TITLES, ROW_INITIAL_VALUES, numberCheckPattern };
