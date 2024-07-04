import './Worksheet.style.scss';
import { useEffect, useState } from 'react';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import { ROW_INITIAL_VALUES, numberCheckPattern } from './WorksheetEditRow.service';
import { TreeResponse, RowId } from 'src/App.types';
import { useAppSelector, useAppDispatch } from 'src/store';
import { createRow, updateRow } from 'src/api';

export default function WorksheetEditRow({
  updatedRow,
  parentId,
  updateHandler
}: {
  updatedRow?: TreeResponse;
  parentId?: RowId;
  updateHandler: () => void;
}) {
  const dispatch = useAppDispatch();
  const lastCreatedRowId = useAppSelector((state) => state.lastCreatedRowId);
  const [currentParentId, setCurrentParentId] = useState<RowId>(null);
  const [updatedRowId, setUpdatedRowId] = useState<RowId>(null);
  const [rowCells, setRowCells] = useState({
    ...ROW_INITIAL_VALUES,
    parentId: currentParentId
  });
  useEffect(() => {
    if (updatedRow) {
      setRowCells((rowCells) => ({
        ...rowCells,
        rowName: updatedRow.rowName,
        salary: updatedRow.salary,
        equipmentCosts: updatedRow.equipmentCosts,
        overheads: updatedRow.overheads,
        estimatedProfit: updatedRow.estimatedProfit
      }));
      setUpdatedRowId(updatedRow.id);
    }
  }, []);
  useEffect(() => {
    parentId !== undefined && setCurrentParentId(parentId);
  }, [parentId]);
  const handleSubmitRow = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (updatedRowId) {        
        dispatch(updateRow({ outlayRowRequest: rowCells, rowId: updatedRowId }));
        updateHandler();
      } else {
        dispatch(createRow({ outlayRowRequest: rowCells }));
        updateHandler();
      }
    }
  };
  return (
    <>
      <TableCell>
        <TextField
          className="row-name"
          size="small"
          value={rowCells.rowName}
          onChange={(e) => setRowCells((rowCells) => ({ ...rowCells, rowName: e.target.value }))}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleSubmitRow(e)}
        />
      </TableCell>
      <TableCell>
        <TextField
          size="small"
          value={rowCells.salary}
          onChange={(e) =>
            setRowCells((rowCells) => ({
              ...rowCells,
              salary: parseFloat(e.target.value.replace(numberCheckPattern, ''))
            }))
          }
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleSubmitRow(e)}
        />
      </TableCell>
      <TableCell>
        <TextField
          size="small"
          value={rowCells.equipmentCosts}
          onChange={(e) =>
            setRowCells((rowCells) => ({
              ...rowCells,
              equipmentCosts: parseFloat(e.target.value.replace(numberCheckPattern, ''))
            }))
          }
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleSubmitRow(e)}
        />
      </TableCell>
      <TableCell>
        <TextField
          className="cell-field"
          size="small"
          value={rowCells.overheads}
          onChange={(e) =>
            setRowCells((rowCells) => ({
              ...rowCells,
              overheads: parseFloat(e.target.value.replace(numberCheckPattern, ''))
            }))
          }
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleSubmitRow(e)}
        />
      </TableCell>
      <TableCell>
        <TextField
          size="small"
          value={rowCells.estimatedProfit}
          onChange={(e) =>
            setRowCells((rowCells) => ({
              ...rowCells,
              estimatedProfit: parseFloat(e.target.value.replace(numberCheckPattern, ''))
            }))
          }
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleSubmitRow(e)}
        />
      </TableCell>
    </>
  );
}
