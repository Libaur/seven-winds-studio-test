import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { TreeItem2 } from '@mui/x-tree-view/TreeItem2';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import WorksheetEditRow from './WorksheetEditRow';
import { tableHeadTitles, tableRowsData } from './Worksheet.data';

// const id = 128766;

export default function Worksheet() {
   const isEdit = true;
   return (
      <TableContainer style={{ background: '#323232', borderLeft: '1px solid #a1a1aa' }}>
         <Table>
            <TableHead>
               <TableRow>
                  {tableHeadTitles.map((title, index) => (
                     <TableCell key={index} style={{ color: '#a1a1aa' }}>
                        {title}
                     </TableCell>
                  ))}
               </TableRow>
            </TableHead>
            <TableBody>
               <TableRow>
                  <TableCell>
                     {/* <RichTreeView /> */}
                     {!isEdit && (
                        <DescriptionIcon style={{ color: '#7890B2', cursor: 'pointer' }} />
                     )}
                  </TableCell>
                  {/* {tableRowsData.map((data, index) => (
                     <TableCell
                        width={data === 'Data Description' ? 250 : ''}
                        key={index}
                        style={{ color: 'white' }}
                     >
                        {data}
                     </TableCell>
                  ))} */}
                  <WorksheetEditRow />
               </TableRow>
            </TableBody>
         </Table>
      </TableContainer>
   );
}
