import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useAppDispatch } from 'src/store';
import { initialRow } from './WorksheetEditRow.service';

export default function WorksheetEditRow() {
   const [rowCells, setRowCells] = useState(initialRow);
   const dispatch = useAppDispatch();

   const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
         event.preventDefault();
         dispatch({ type: 'SUBMIT_FORM', rowCells: rowCells });
         setRowCells(initialRow);
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
               value={rowCells.rowName}
               onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setRowCells({ ...rowCells, rowName: e.target.value })
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
               value={rowCells.salary.toString()}
               onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setRowCells({ ...rowCells, salary: Number(e.target.value) })
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
               value={rowCells.equipmentCosts.toString()}
               onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setRowCells({ ...rowCells, equipmentCosts: Number(e.target.value) })
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
               value={rowCells.overheads.toString()}
               onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setRowCells({ ...rowCells, overheads: Number(e.target.value) })
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
               value={rowCells.estimatedProfit.toString()}
               onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setRowCells({ ...rowCells, estimatedProfit: Number(e.target.value) })
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
