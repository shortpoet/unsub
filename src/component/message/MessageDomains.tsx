import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { GmailMessageDTO } from '../../types/messageDTO';

const Bar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0.5rem;
  & > * {
    margin-right: 0.25rem;
  }
`;

export function MessageDomains(props: {
  domains: GmailMessageDTO['domain'][];
}) {
  const [domains, setDomains] = useState<string[]>([]);
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);

  useEffect(() => {
    setDomains(props.domains);
  }, [props.domains]);

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newDomain: string | null
  ) => {
    setSelectedDomain(newDomain);
  };

  return (
    <Bar>
      <ToggleButtonGroup
        id="domain-toggle"
        value={selectedDomain}
        exclusive
        onChange={handleChange}
        aria-label="text alignment">
        {domains.map(domain => (
          <ToggleButton
            size="small"
            key={domain}
            value={domain}
            aria-label={domain}>
            {domain}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Bar>
  );
}
