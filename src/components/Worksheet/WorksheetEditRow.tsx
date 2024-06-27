import { useReducer } from 'react';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import { worksheetReducer, initialRow, currentRows } from './WorksheetEditRow.service';

export default function WorksheetEditRow() {
   const [state, dispatch] = useReducer(worksheetReducer, initialRow);

   const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
         event.preventDefault();
         dispatch({ type: 'SUBMIT_FORM' });
         currentRows.push(state);
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
               value={state.rowName}
               onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({ type: 'UPDATE_FIELD', field: 'rowName', value: e.target.value })
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
               value={state.salary}
               onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({ type: 'UPDATE_FIELD', field: 'salary', value: e.target.value })
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
               value={state.equipmentCosts}
               onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({ type: 'UPDATE_FIELD', field: 'equipmentCosts', value: e.target.value })
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
               value={state.overheads}
               onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({ type: 'UPDATE_FIELD', field: 'overheads', value: e.target.value })
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
               value={state.estimatedProfit}
               onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                     type: 'UPDATE_FIELD',
                     field: 'estimatedProfit',
                     value: e.target.value
                  })
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
