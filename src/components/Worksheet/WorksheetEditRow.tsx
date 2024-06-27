import { useReducer } from 'react';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import { reducer, initialState } from './WorksheetEditRow.service';

export default function WorksheetEditRow() {
   const [state, dispatch] = useReducer(reducer, initialState);

   const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
         event.preventDefault();
         dispatch({ type: 'SUBMIT_FORM' });
         dispatch({ type: 'RESET_FORM' });
      }
   };

   return (
      <>
         <TableCell>
            <TextField
               style={{
                  width: '250px',
                  border: '1px solid #a1a1aa',
                  borderRadius: '5px'
               }}
               size="small"
               value={state.field1}
               onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({ type: 'UPDATE_FIELD', field: 'field1', value: e.target.value })
               }
               onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(e)}
               InputProps={{
                  style: { color: '#a1a1aa' }
               }}
            />
         </TableCell>
         <TableCell>
            <TextField
               size="small"
               style={{ border: '1px solid #a1a1aa', borderRadius: '5px' }}
               value={state.field2}
               onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({ type: 'UPDATE_FIELD', field: 'field2', value: e.target.value })
               }
               onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(e)}
               InputProps={{
                  style: { color: '#a1a1aa' }
               }}
            />
         </TableCell>
         <TableCell>
            <TextField
               size="small"
               style={{ border: '1px solid #a1a1aa', borderRadius: '5px' }}
               value={state.field3}
               onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({ type: 'UPDATE_FIELD', field: 'field3', value: e.target.value })
               }
               onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(e)}
               InputProps={{
                  style: { color: '#a1a1aa' }
               }}
            />
         </TableCell>
         <TableCell>
            <TextField
               size="small"
               style={{ border: '1px solid #a1a1aa', borderRadius: '5px' }}
               value={state.field4}
               onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({ type: 'UPDATE_FIELD', field: 'field4', value: e.target.value })
               }
               onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(e)}
               InputProps={{
                  style: { color: '#a1a1aa' }
               }}
            />
         </TableCell>
         <TableCell>
            <TextField
               size="small"
               style={{ border: '1px solid #a1a1aa', borderRadius: '5px' }}
               value={state.field5}
               onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({ type: 'UPDATE_FIELD', field: 'field5', value: e.target.value })
               }
               onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(e)}
               InputProps={{
                  style: { color: '#a1a1aa' }
               }}
            />
         </TableCell>
      </>
   );
}
