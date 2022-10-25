import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  SelectChangeEvent,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';
import { Label } from './UI';
import { myPalette } from '../Theme';
import styled from 'styled-components';
import { MessageViewTypes } from './message/MessageView';

const ViewFormControl = styled.div`
  flex-grow: 1;
`;

const ToggleViewGroup = styled(ToggleButtonGroup)`
  display: flex;
  width: 100%;
`;

const ViewButton = styled(ToggleButton)`
  flex-grow: 1;
  margin: 0.5rem;
  justify-content: space-between;
  && {
    margin: 0rem 0.5rem 0rem 0rem;
    border-radius: 0.25rem;
    background-color: ${myPalette.green.faded};
    color: ${myPalette.green.dark};
    text-transform: none;
    &:hover {
      background-color: ${myPalette.green.dark};
      color: ${myPalette.page.lightGrey};
    }
    &.Mui-selected {
      background-color: ${myPalette.green.dark};
      color: ${myPalette.page.lightGrey};
    }
  }
`;

export function ViewSwitch(props: {
  onChange: (viewType: MessageViewTypes) => void;
}) {
  const [messageViewType, setMessageViewType] = useState(
    'raw' as MessageViewTypes
  );

  const location = useLocation();

  useEffect(() => {
    props.onChange(messageViewType as unknown as MessageViewTypes);
  }, [messageViewType]);

  // const handleChange = (event: SelectChangeEvent<unknown>) => {
  //   const value = event.target.value as MessageViewTypes;
  //   setMessageViewType(value);
  //   // if (props.onChange) {
  //   //   props.onChange(value === 'primary' ? 'primary' : value);
  //   // }
  // };

  return (
    <ViewFormControl>
      <Label>View Type: </Label>
      <ToggleViewGroup
        id="view-type"
        color="primary"
        value={messageViewType}
        exclusive
        onChange={(event, newViewType) => {
          if (newViewType !== null) {
            setMessageViewType(newViewType);
          }
        }}>
        <ViewButton size="small" value="raw">
          Raw
        </ViewButton>
        <ViewButton size="small" value="list">
          List
        </ViewButton>
      </ToggleViewGroup>
    </ViewFormControl>
  );
}
