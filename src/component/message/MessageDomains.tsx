import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { GmailMessageDTO } from '../../@types/messageDTO';
import { colorLog } from '../../util/colorLog';
import { MessageApi } from '../../api/MessageApi';
import { IApiConfig } from '../../api/IApi';

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
  domains?: GmailMessageDTO['domain'][];
}) {
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [errorJson, setErrorJson] = useState('');
  const [messageDomains, setMessageDomains] = useState();

  useEffect(() => {
    (async () => {
      const config: IApiConfig = {
        baseURL: 'http://localhost:3000',
        timeout: 10000
      };
      const api = new MessageApi(config);
      const params = {
        userId: 'me',
        // q: 'mous',
        fetchCount: 100,
        source: 'google'
      };
      // const response = await api.getMessages(params);
      // const data = response.messages;
      try {
        colorLog('getting domains');
        const response = await api.getDomains(params);
        console.log(response);
        // console.log(inspect(response, { depth: 5, colors: false }));
        if (response.data) {
          // setMessages(response.data);
          setMessageDomains(response.data);
        }
        if (response.error) {
          console.error(response.error);
          setError(true);
          setErrorJson(response.error);
        }
      } catch (e) {
        console.error('[error]', e);
      }
    })();
  }, []); // ← now we use an empty array, so React will never update this callback

  // useEffect(() => {
  //   setDomains(props.domains);
  // }, [props.domains]);

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newDomain: string | null
  ) => {
    setSelectedDomain(newDomain);
  };
  const domains = messageDomains || props.domains || [];
  const countedDomains = domains.reduce((acc, domain) => {
    if (acc[domain]) {
      acc[domain] += 1;
    } else {
      acc[domain] = 1;
    }
    return acc;
  }, {} as Record<string, number>);
  const domainList = Object.keys(countedDomains).sort((a, b) => {
    return countedDomains[b] - countedDomains[a];
  });

  return (
    <Bar>
      <ToggleButtonGroup
        id="domain-toggle"
        value={selectedDomain}
        exclusive
        onChange={handleChange}
        aria-label="text alignment">
        {domainList.map(domain => (
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
