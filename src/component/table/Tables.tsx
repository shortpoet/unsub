import { id } from 'date-fns/locale';

const TABLES = {
  BASE: [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'labelIds', headerName: 'Label IDs' },
    { field: 'snippet', headerName: 'Snippet' },
    { field: 'internalDate', headerName: 'Internal Date', width: 50 },
    { field: 'dateParsed', headerName: 'Date Parsed', width: 50 },
    { field: 'from', headerName: 'From' },
    { field: 'received', headerName: 'Received' },
    { field: 'receivedSPF', headerName: 'Received SPF' },
    { field: 'subject', headerName: 'Subject' },
    {
      field: 'listUnsubscribe',
      headerName: 'List Unsubscribe',
      width: 100,
      renderCell: (params: any) => (
        <a href={params.row.listUnsubscribe} target="_blank" rel="noreferrer">
          Click me maybe...
        </a>
      )
    },
    { field: 'messageId', headerName: 'Message ID', width: 50 },
    { field: 'status', headerName: 'Status', width: 50 },
    { field: 'link', headerName: 'Link', width: 50 },
    { field: 'links', headerName: 'Links', width: 50 },
    { field: 'googleSheetsLink', headerName: 'Google Sheets Link', width: 50 },
    { field: 'domain', headerName: 'Domain', width: 50 }
  ]
};

export default TABLES;
