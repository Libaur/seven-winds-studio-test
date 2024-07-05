const API = {
  ENTITY_ID: process.env.ENTITY_ID,
  SERVER_URL: process.env.SERVER_URL,
  SAME_PARAMS: process.env.SAME_PARAMS
};

const ERRORS = {
  UNKNOWN: 'Произошла неизвестная ошибка',
  FETCH_LIST: 'Ошибка при загрузке списка строк',
  CREATE: 'Ошибка при создании строки',
  UPDATE: 'Ошибка при обновлении строки',
  DELETE: 'Ошибка при удалении строки'
};

export { API, ERRORS };
