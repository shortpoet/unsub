import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { DataGrid } from '@mui/x-data-grid';

const Box = styled.div`
  width: 100%;
  overflow-x: auto;
  padding: 1rem 1rem;
`;

const TableBox = styled.div`
  min-width: 100%;
`;

export function Table(props: {
  data: any;
  columns: any;
  rowsPerPage?: number;
}) {
  const [data, setData] = useState<any>(props.data);
  const [columns, setColumns] = useState<any>(props.columns);
  const [rowsPerPage, setRowsPerPage] = useState<(number | undefined)[]>(
    [props.rowsPerPage] || [5]
  );

  useEffect(() => {
    setData(props.data);
    setColumns(props.columns);
    console.log('data set for table', data);
  }, [props.data]);

  return (
    <Box>
      <TableBox>
        <DataGrid
          rows={data}
          columns={columns}
          autoHeight={true}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 15]}
        />
      </TableBox>
    </Box>
  );
}
