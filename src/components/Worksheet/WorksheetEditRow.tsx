import './Worksheet.style.scss';
import { useEffect, useState } from 'react';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import { ROW_INITIAL_VALUES, numberCheckPattern } from './Worksheet.service';
import { TreeResponse, RowId } from 'src/App.types';
import { useAppDispatch } from 'src/store';
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
  }, [updateRow]);

  useEffect(() => {
    parentId !== undefined && setCurrentParentId(parentId);
  }, [parentId]);

  const handleSubmitRow = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (updatedRowId) {
        dispatch(updateRow({ outlayRowRequest: rowCells, rowId: updatedRowId }));
      } else {
        dispatch(createRow({ outlayRowRequest: rowCells }));
      }
      updateHandler();
    }
  };

  const handleChange = (
    field: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowCells((rowCells) => ({
      ...rowCells,
      [field]:
        field !== 'rowName'
          ? parseFloat(e.target.value.replace(numberCheckPattern, ''))
          : e.target.value
    }));
  };

  return (
    <>
      <TableCell>
        <TextField
          className="row-name"
          size="small"
          value={rowCells.rowName}
          onChange={(e) => handleChange('rowName', e)}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleSubmitRow(e)}
        />
      </TableCell>
      <TableCell>
        <TextField
          size="small"
          value={rowCells.salary}
          onChange={(e) => handleChange('salary', e)}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleSubmitRow(e)}
        />
      </TableCell>
      <TableCell>
        <TextField
          size="small"
          value={rowCells.equipmentCosts}
          onChange={(e) => handleChange('equipmentCosts', e)}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleSubmitRow(e)}
        />
      </TableCell>
      <TableCell>
        <TextField
          className="cell-field"
          size="small"
          value={rowCells.overheads}
          onChange={(e) => handleChange('overheads', e)}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleSubmitRow(e)}
        />
      </TableCell>
      <TableCell>
        <TextField
          size="small"
          value={rowCells.estimatedProfit}
          onChange={(e) => handleChange('estimatedProfit', e)}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleSubmitRow(e)}
        />
      </TableCell>
    </>
  );
}
