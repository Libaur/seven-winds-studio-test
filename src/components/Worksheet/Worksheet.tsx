import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { TreeItem2 } from '@mui/x-tree-view/TreeItem2';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import WorksheetEditRow from './WorksheetEditRow';
import { TABLE_HEAD_TITLES, currentRows } from './WorksheetEditRow.service';
import { useEffect, useState } from 'react';

// const id = 128766;

export default function Worksheet() {
   const [rows, setRows] = useState(currentRows);
   useEffect(() => {
      setRows(currentRows)
   }, [])
   // const isEdit = true;
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
               {rows.length > 0 ? (
                  rows.map((row, rowIndex) => (
                     <TableRow key={rowIndex}>
                        <TableCell>
                           {/* <RichTreeView /> */}
                           <DescriptionIcon style={{ color: '#7890B2', cursor: 'pointer' }} />
                        </TableCell>
                        {Object.values(row).map((value, cellIndex) => (
                           <TableCell key={cellIndex} style={{ color: 'white' }}>
                              {value}
                           </TableCell>
                        ))}
                     </TableRow>
                  ))
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
