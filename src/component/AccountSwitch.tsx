import React, { useState, useEffect, ChangeEvent } from 'react';
import styled from 'styled-components';
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent
} from '@mui/material';
import { AccountApi } from '../api/AccountApi';
import { Label } from './UI';
import { Account } from '../types/Session';
import { IApiConfig } from '../api/IApi';
import { SelectInputProps } from '@mui/material/Select/SelectInput';

const Switcher = styled.div`
  width: 100%;
  margin-right: 1rem;
`;

// const Switcher = styled.div`
//   && {
//     width: 100%;
//     margin-right: 1rem;
//   }
// `;

const AccountSelect = styled(Select)`
  && {
    width: 100%;
    background-color: #fff;
  }
`;

export function AccountSwitch(props: {
  onChange: (value: Account['type']) => void;
}) {
  const [accounts, setAccounts] = useState([] as Account[]);
  const [account, setAccount] = useState('' as Account['type']);
  const [error, setError] = useState(false);
  const [errorJson, setErrorJson] = useState('');
  // const [labels, setLabels] = useState([] as any[]);
  // const [label, setLabel] = useState('label_id');

  useEffect(() => {
    (async () => {
      const config: IApiConfig = {
        baseURL: 'http://localhost:3000',
        timeout: 10000
      };
      const api = new AccountApi(config);
      const params = {
        userId: 'me',
        // q: 'mous',
        fetchCount: 100
      };
      // const response = await api.getMessages(params);
      // const data = response.messages;
      try {
        const response = await api.getAccounts(params);
        // console.log(inspect(response, { depth: 5, colors: false }));
        if (response.data) {
          setAccounts(response.data);
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
  }, []);

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    const value = event.target.value as Account['type'];
    setAccount(value);
    // if (props.onChange) {
    //   props.onChange(value === 'primary' ? 'primary' : value);
    // }
  };
  // useEffect(() => {
  //   if (account) {
  //     AccountApi.getLabels(account).then(labels => {
  //       setLabels(labels);
  //     });
  //   }
  // }, [account]);

  return (
    <Switcher>
      <Label>Account</Label>
      <FormControl variant="outlined" fullWidth size="small">
        <AccountSelect value={account} onChange={handleChange}>
          {accounts.map(account => (
            <MenuItem key={account.id} value={account.type}>
              {account.name}
            </MenuItem>
          ))}
        </AccountSelect>
      </FormControl>
      {/* {(messages.length > 0 && <Messages messages={messages} />) ||
            (error && <PrettyPrintJson data={errorJson} />) || <Loading />} */}

      {/* <FormControl variant="outlined">
        <Label>Label</Label>
        <Switch value={label} onChange={e => setLabel(e.target.value)}>
          {labels.map(label => (
            <MenuItem key={label.id} value={label.id}>
              {label.name}
            </MenuItem>
          ))}
        </Switch>
      </FormControl> */}
    </Switcher>
  );
}
