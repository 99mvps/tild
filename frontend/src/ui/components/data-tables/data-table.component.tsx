import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  MenuItem,
  TablePagination,
  Box,
  SxProps,
  Theme,
} from "@mui/material";

type DataTableComponentProps<T> = {
  tableHeader: {
    column: string;
    title: string;
    searchable?: boolean;
  }[];
  tableData: T[];
  tableRow: (row: T, index: number) => React.ReactNode;
  tableSx?: {
    table?: SxProps<Theme>;
    container?: SxProps<Theme>;
  };
};

export function PaginatedDataTableComponent<T>({
  tableHeader,
  tableData,
  tableRow,
  tableSx,
}: DataTableComponentProps<T>) {
  const [page, setPage] = useState(0);
  const [dataTable, setTableData] = useState<T[]>([]);
  const [numberOfItemsPerPage, setNumberOfItemsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchField, setSearchField] = useState<string>(
    tableHeader[0]?.column ?? ""
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    if (query === "") {
      setTableData(tableData);
      return;
    }

    const data = dataTable.length ? dataTable : tableData;

    const filteredData = data.filter(
      (item: T) =>
        searchField &&
        String(item[searchField as keyof T])
          .toLowerCase()
          .includes(query.toLowerCase())
    );

    setTableData(filteredData);
  };

  const handleFieldChange = (field: string) => {
    setSearchField(field);
    setSearchQuery("");
  };

  const searchableColumns = tableHeader
    .flatMap((h) => h?.searchable !== false && h.column)
    .filter(Boolean);

  useEffect(() => {
    setPage(0);
    setTableData(tableData);
  }, [tableData]);

  return (
    <TableContainer sx={tableSx?.container} component={Paper}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          margin: "1rem",
        }}
      >
        <TextField
          placeholder="Search"
          onChange={(e) => handleSearch(e.target.value)}
          value={searchQuery}
          variant="outlined"
          size="small"
          sx={{ marginRight: 1 }}
        />
        <TextField
          select
          value={searchField}
          onChange={(e) => handleFieldChange(e.target.value)}
          variant="outlined"
          size="small"
        >
          {tableHeader.map(({ column, title }, index: number) => {
            return (
              searchableColumns.includes(column) && (
                <MenuItem key={index} value={column}>
                  {title}
                </MenuItem>
              )
            );
          })}
        </TextField>
      </Box>
      <Table sx={tableSx?.table}>
        <TableHead>
          <TableRow>
            {tableHeader.map(({ title }, index: number) => (
              <TableCell key={index}>{title}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {dataTable
            .slice(
              page * numberOfItemsPerPage,
              page * numberOfItemsPerPage + numberOfItemsPerPage
            )
            .map((row: T, index: number) => tableRow(row, index))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={dataTable.length}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        rowsPerPage={numberOfItemsPerPage}
        onRowsPerPageChange={(e) =>
          setNumberOfItemsPerPage(parseInt(e.target.value, 10))
        }
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} of ${count}`
        }
        rowsPerPageOptions={[3, 5, 10]}
      />
    </TableContainer>
  );
}
