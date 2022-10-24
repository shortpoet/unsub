import React from 'react';

export const PrettyPrintJson = React.memo(({ data }: any) => (
  <div>
    <pre>{JSON.stringify(data, null, 2)}</pre>
  </div>
));
