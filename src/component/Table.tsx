import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { DataGrid } from '@mui/x-data-grid';

const Box = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const TableBox = styled.div`
  min-width: 100%;
`;

export function Table(props: { data: any; columns: any }) {
  const [data, setData] = useState<any>([]);
  const [columns, setColumns] = useState<any>([]);

  useEffect(() => {
    setData(props.data);
    setColumns(props.columns);
  }, [props.data, props.columns]);

  return (
    <Box>
      <TableBox>
        <DataGrid
          rows={data}
          columns={columns}
          autoHeight={true}
          pageSize={15}
        />
      </TableBox>
    </Box>
  );
}
