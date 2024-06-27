export const initialState = {
   field1: '',
   field2: '',
   field3: '',
   field4: '',
   field5: ''
};

export function reducer(
   state: typeof initialState,
   action: { type: string; field?: string; value?: string }
): typeof initialState {
   switch (action.type) {
      case 'UPDATE_FIELD':
         return { ...state, [action.field!]: action.value! };
      case 'SUBMIT_FORM':
         console.log(state);
         return state;
      case 'RESET_FORM':
         return initialState;
      default:
         return state;
   }
}
