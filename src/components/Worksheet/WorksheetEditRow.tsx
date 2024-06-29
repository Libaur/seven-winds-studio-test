import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import { useAppDispatch } from 'src/store';
import { initialRow, Row } from './WorksheetEditRow.service';

export default function WorksheetEditRow({ changedRow }: { changedRow?: Row }) {
   const currentRow = changedRow || initialRow;
   const [rowCells, setRowCells] = useState(currentRow);
   const currentId = changedRow ? rowCells.id : nanoid();
   const dispatch = useAppDispatch();

   const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
         event.preventDefault();
         !changedRow && dispatch({ type: 'ROW_SUBMITED', rowCells: { ...rowCells, id: currentId } });
         dispatch({ type: 'ROW_UPDATED', id: currentId, rowCells: rowCells });
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
                  setRowCells({ ...rowCells, salary: e.target.value.replace(/[^\d.]/g, '') })
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
                  setRowCells({
                     ...rowCells,
                     equipmentCosts: e.target.value.replace(/[^\d.]/g, '')
                  })
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
                  setRowCells({ ...rowCells, overheads: e.target.value.replace(/[^\d.]/g, '') })
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
                  setRowCells({
                     ...rowCells,
                     estimatedProfit: e.target.value.replace(/[^\d.]/g, '')
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
