import './Worksheet.style.scss';
import React, { useEffect, useState } from 'react';
import { TableCell, TableRow } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import DeleteIcon from '@mui/icons-material/Delete';
import WorksheetEditRow from './WorksheetEditRow';
import { ROW_INITIAL_VALUES } from './Worksheet.service';
import { useAppSelector, useAppDispatch } from 'src/store';
import { createRow, deleteRow, fetchRowsList } from 'src/api';
import { TreeResponse } from 'src/App.types';

export default function WorksheetRows() {
  const dispatch = useAppDispatch();
  const treeRows = useAppSelector((state) => state.rows);
  const [editedRow, setEditedRows] = useState<number | null>(null);
  const [hoveredRows, setHoveredRows] = useState<number[]>([]);
  const lastCreatedRowId = useAppSelector((state) => state.lastCreatedRowId);

  useEffect(() => {
    dispatch(fetchRowsList());
  });

  useEffect(() => {
    lastCreatedRowId && handleEditRow(lastCreatedRowId);
  }, [lastCreatedRowId]);

  const handleCreateRow = (id: number) => {
    dispatch(
      createRow({
        outlayRowRequest: { ...ROW_INITIAL_VALUES, parentId: id }
      })
    );
  };

  const handleEditRow = (id: number) => {
    setEditedRows(id);
  };

  const handleUpdateRow = () => {
    setEditedRows(null);
  };

  const handleDeleteRow = (rowId: number) => {
    dispatch(deleteRow({ rowId }));
  };

  const handleMouseEnter = (id: number) => {
    setHoveredRows((ids) => [...ids, id]);
  };

  const handleMouseLeave = (id: number) => {
    setHoveredRows((ids) => ids.filter((rowId) => rowId !== id));
  };

  const renderRow = (row: TreeResponse, level: number = 0) => (
    <React.Fragment key={row.id}>
      {row.id !== null && editedRow === row.id ? (
        <TableRow>
          <TableCell style={{ paddingLeft: `${level * 20}px` }}></TableCell>
          <WorksheetEditRow updatedRow={row} updateHandler={handleUpdateRow} />
        </TableRow>
      ) : (
        <TableRow
          onDoubleClick={() => handleEditRow(row.id)}
          onMouseEnter={() => handleMouseEnter(row.id)}
          onMouseLeave={() => handleMouseLeave(row.id)}
        >
          <TableCell style={{ paddingLeft: `${level * 20}px` }}>
            <DescriptionIcon className="description-icon" onClick={() => handleCreateRow(row.id)} />
            <DeleteIcon
              className={`delete-icon ${hoveredRows.includes(row.id) ? 'hovered' : ''}`}
              onClick={() => handleDeleteRow(row.id)}
            />
          </TableCell>
          <TableCell>{row.rowName}</TableCell>
          <TableCell>{row.salary}</TableCell>
          <TableCell>{row.equipmentCosts}</TableCell>
          <TableCell>{row.overheads}</TableCell>
          <TableCell>{row.estimatedProfit}</TableCell>
        </TableRow>
      )}
      {row.child && row.child.map((childRow) => renderRow(childRow, level + 1))}
    </React.Fragment>
  );

  return (
    <>
      {treeRows.length ? (
        treeRows.map((row) => renderRow(row))
      ) : (
        <WorksheetEditRow updateHandler={handleUpdateRow} />
      )}
    </>
  );
}
