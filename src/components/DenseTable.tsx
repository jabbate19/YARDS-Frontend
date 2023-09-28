import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface DenseTableProps {
  columns: string[],
  rows: any[][],
}

const DenseTable : React.FC<DenseTableProps> = ({columns, rows}: DenseTableProps) => {
  let columnCells = [];
  for (let i=0; i < columns.length; i++) {
    columnCells.push(<TableCell>{columns[i]}</TableCell>);
  }
  let rowCells = [];
  for (let i=0; i < rows.length; i++) {
    let rowData = [];
    for (let j=0; j < rows[i].length; j++) {
      rowData.push(<TableCell>{rows[i][j]}</TableCell>);
    }
    rowCells.push(<TableRow>{rowData}</TableRow>);
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

export default DenseTable;
