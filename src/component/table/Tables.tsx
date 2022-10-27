import { id } from 'date-fns/locale';

const TABLES = {
  BASE: [
    // { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'gmailId', headerName: 'Gmail Id', flex: 1 },
    // { field: 'labelIds', headerName: 'Label IDs', flex: 3 },
    // { field: 'snippet', headerName: 'Snippet', flex: 3 },
    // { field: 'internalDate', headerName: 'Internal Date', flex: 1 },
    // { field: 'dateParsed', headerName: 'Date Parsed', flex: 1 },
    { field: 'from', headerName: 'From', flex: 3 },
    { field: 'received', headerName: 'Received', flex: 3 },
    { field: 'receivedSPF', headerName: 'Received SPF', flex: 3 },
    { field: 'subject', headerName: 'Subject', flex: 3 },
    {
      field: 'listUnsubscribe',
      headerName: 'Click me maybe...',
      renderCell: (params: any) => (
        <a href={params.row.listUnsubscribe} target="_blank" rel="noreferrer">
          {params.row.listUnsubscribe}
        </a>
      ),
      flex: 12
    },
    { field: 'status', headerName: 'Status', flex: 3 },
    // { field: 'link', headerName: 'Link', flex: 3 },
    // { field: 'links', headerName: 'Links', flex: 9 },
    // { field: 'googleSheetsLink', headerName: 'Google Sheets Link', flex: 3 },
    { field: 'domain', headerName: 'Domain', flex: 3 }
  ]
};

export default TABLES;
