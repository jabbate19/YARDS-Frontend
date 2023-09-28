import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CheckBox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';

interface LinkTableProps {
  columns: string[],
  rows: any[],
}

const LinkTable : React.FC<LinkTableProps> = ({columns, rows}: LinkTableProps) => {
  let columnCells = [];
  for (let i=0; i < columns.length; i++) {
    columnCells.push(<TableCell>{columns[i]}</TableCell>);
  }
  let rowCells = [];
  for (let i=0; i < rows.length; i++) {
    let rowData = [];
    for (let j=0; j < rows[i].data.length; j++) {
      rowData.push(<TableCell>{typeof rows[i].data[j]==  "boolean" ? <CheckBox checked={rows[i].data[j]} disabled={true}/> : rows[i].data[j]}</TableCell>);
    }
    rowCells.push(<TableRow component={Link} to={rows[i].link}>{rowData}</TableRow>);
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {columnCells}
          </TableRow>
        </TableHead>
        <TableBody>
          {rowCells}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LinkTable;
