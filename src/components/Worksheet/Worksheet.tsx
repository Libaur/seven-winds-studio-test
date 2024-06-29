import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { TreeItem2 } from '@mui/x-tree-view/TreeItem2';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import DeleteIcon from '@mui/icons-material/Delete';
import WorksheetEditRow from './WorksheetEditRow';
import { TABLE_HEAD_TITLES, initialRow } from './WorksheetEditRow.service';
import { useAppSelector, useAppDispatch } from 'src/store';

export default function Worksheet() {
  const worksheetData = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  return (
    <TableContainer style={{ background: '#323232', borderLeft: '1px solid #a1a1aa' }}>
      <Table>
        <TableHead>
          <TableRow>
            {TABLE_HEAD_TITLES.map((title, index) => (
              <TableCell key={index} style={{ color: '#a1a1aa' }}>
                {title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {worksheetData.length > 0 ? (
            worksheetData.map((row, rowIndex) =>
              !row.edited ? (
                <>
                  <TableRow
                    key={rowIndex}
                    onDoubleClick={() => dispatch({ type: 'ROW_EDITED', id: row.id })}
                    onMouseEnter={() => dispatch({ type: 'ROW_HOVERED', id: row.id })}
                    onMouseLeave={() => dispatch({ type: 'ROW_HOVERED_OFF', id: row.id })}
                  >
                    <TableCell>
                      <DescriptionIcon
                        style={{ color: '#7890B2', cursor: 'pointer' }}
                        onClick={() => dispatch({ type: 'ROW_SUBMITED', id: row.id })}
                      />
                      {row.hovered && (
                        <DeleteIcon
                          style={{ color: '#DF4444', cursor: 'pointer' }}
                          onClick={() => dispatch({ type: 'ROW_DELETED', id: row.id })}
                        />
                      )}
                    </TableCell>
                    <TableCell style={{ color: 'white' }}>{row.rowName}</TableCell>
                    <TableCell style={{ color: 'white' }}>{row.salary}</TableCell>
                    <TableCell style={{ color: 'white' }}>{row.equipmentCosts}</TableCell>
                    <TableCell style={{ color: 'white' }}>{row.overheads}</TableCell>
                    <TableCell style={{ color: 'white' }}>{row.estimatedProfit}</TableCell>
                  </TableRow>
                  {row.child &&
                    row.child.map((childRow, childIndex) =>
                      !childRow.edited ? (
                        <TableRow
                          key={childIndex}
                          onDoubleClick={() => dispatch({ type: 'ROW_EDITED', id: childRow.id })}
                          onMouseEnter={() => dispatch({ type: 'ROW_HOVERED', id: childRow.id })}
                          onMouseLeave={() =>
                            dispatch({ type: 'ROW_HOVERED_OFF', id: childRow.id })
                          }
                        >
                          <TableCell style={{ width: '100px', minWidth: '100px' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <DescriptionIcon
                                style={{ marginLeft: '15px', color: '#7890B2', cursor: 'pointer' }}
                                onClick={() => dispatch({ type: 'ROW_SUBMITED', id: childRow.id })}
                              />
                              <DeleteIcon
                                style={{
                                  color: childRow.hovered ? '#DF4444' : 'transparent',
                                  cursor: 'pointer'
                                }}
                                onClick={() => dispatch({ type: 'ROW_DELETED', id: childRow.id })}
                              />
                            </div>
                          </TableCell>
                          <TableCell style={{ color: 'white' }}>{childRow.rowName}</TableCell>
                          <TableCell style={{ color: 'white' }}>{childRow.salary}</TableCell>
                          <TableCell style={{ color: 'white' }}>
                            {childRow.equipmentCosts}
                          </TableCell>
                          <TableCell style={{ color: 'white' }}>{childRow.overheads}</TableCell>
                          <TableCell style={{ color: 'white' }}>
                            {childRow.estimatedProfit}
                          </TableCell>
                        </TableRow>
                      ) : (
                        <TableRow>
                          <TableCell></TableCell>
                          <WorksheetEditRow changedRow={childRow} />
                        </TableRow>
                      )
                    )}
                </>
              ) : (
                <TableRow>
                  <TableCell></TableCell>
                  <WorksheetEditRow changedRow={row} />
                </TableRow>
              )
            )
          ) : (
            <TableRow>
              <TableCell></TableCell>
              <WorksheetEditRow />
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
