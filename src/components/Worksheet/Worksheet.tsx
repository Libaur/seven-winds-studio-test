import './Worksheet.style.scss';
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import DeleteIcon from '@mui/icons-material/Delete';
import WorksheetEditRow from './WorksheetEditRow';
import { TABLE_HEAD_TITLES, ROW_INITIAL_VALUES } from './WorksheetEditRow.service';
import { useAppSelector, useAppDispatch } from 'src/store';
import { fetchRowsList, createRow, deleteRow } from 'src/api';

export default function Worksheet() {
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

  return (
    <TableContainer className="table-container">
      <Table>
        <TableHead>
          <TableRow>
            {TABLE_HEAD_TITLES.map((title, index) => (
              <TableCell key={index} sx={{ color: '#a1a1aa' }}>
                {title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {treeRows.length > 0 ? (
            treeRows.map((row, rowIndex) => (
              <React.Fragment key={rowIndex}>
                {row.id !== null && editedRow === row.id ? (
                  <TableRow>
                    <TableCell></TableCell>
                    <WorksheetEditRow updatedRow={row} updateHandler={handleUpdateRow} />
                  </TableRow>
                ) : (
                  <TableRow
                    onDoubleClick={() => handleEditRow(row.id)}
                    onMouseEnter={() => handleMouseEnter(row.id)}
                    onMouseLeave={() => handleMouseLeave(row.id)}
                  >
                    <TableCell>
                      <DescriptionIcon
                        className="description-icon"
                        onClick={() => handleCreateRow(row.id)}
                      />
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
                {row.child &&
                  row.child.map((childRow, childIndex) => (
                    <React.Fragment key={childIndex}>
                      {editedRow === childRow.id ? (
                        <TableRow>
                          <TableCell></TableCell>
                          <WorksheetEditRow updatedRow={childRow} updateHandler={handleUpdateRow} />
                        </TableRow>
                      ) : (
                        <TableRow
                          onDoubleClick={() => handleEditRow(childRow.id)}
                          onMouseEnter={() => handleMouseEnter(childRow.id)}
                          onMouseLeave={() => handleMouseLeave(childRow.id)}
                        >
                          <TableCell className="table-cell-child">
                            <div className="flex-center">
                              <DescriptionIcon
                                className="description-icon icon-child"
                                onClick={() => handleCreateRow(childRow.id)}
                              />
                              <DeleteIcon
                                className={`delete-icon ${hoveredRows.includes(childRow.id) ? 'hovered' : ''}`}
                                onClick={() => handleDeleteRow(childRow.id)}
                              />
                            </div>
                          </TableCell>
                          <TableCell>{childRow.rowName}</TableCell>
                          <TableCell>{childRow.salary}</TableCell>
                          <TableCell>{childRow.equipmentCosts}</TableCell>
                          <TableCell>{childRow.overheads}</TableCell>
                          <TableCell>{childRow.estimatedProfit}</TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  ))}
              </React.Fragment>
            ))
          ) : (
            <TableRow>
              <TableCell></TableCell>
              <WorksheetEditRow updateHandler={handleUpdateRow} />
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
