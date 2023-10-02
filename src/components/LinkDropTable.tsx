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
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';

interface RowProps {
  row: any,
  colLen: number,
}

interface LinkTableProps {
  columns: string[],
  rows: any[],
}

const Row : React.FC<RowProps> = ({row, colLen}: RowProps) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {row.data.map((datapt: any) => (
          <TableCell>{typeof datapt ==  "boolean" ? <CheckBox checked={datapt} disabled={true}/> : datapt}</TableCell>
        ))}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={colLen}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              { row.dropdown }
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

const LinkTable : React.FC<LinkTableProps> = ({columns, rows}: LinkTableProps) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell />
            {columns.map((col: string) => (
              <TableCell>{col}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row row={row} colLen={columns.length}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LinkTable;
