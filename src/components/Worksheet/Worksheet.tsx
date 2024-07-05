import './Worksheet.style.scss';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import WorksheetRows from './WorksheetRows';
import { TABLE_HEAD_TITLES } from './Worksheet.service';

export default function Worksheet() {
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
          <WorksheetRows />
        </TableBody>
      </Table>
    </TableContainer>
  );
}
