import React, { SyntheticEvent, useState } from 'react';
import styled from 'styled-components';
import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteRenderOptionState,
  createFilterOptions,
  FormControl,
  TextField
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Label } from '../../UI';
import { GmailMessageDTO } from '../../../types/messageDTO';
import { MessageApi } from '../../../api/MessageApi';

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0 1rem 0;
  width: 10rem;
`;

const SearchTextField = styled(TextField)`
  width: 100%;
  && {
    margin: 0 0.5rem 0 0;
    background-color: #fff;
  }
`;

export interface MessageSearchOptions {
  label: string;
  color: string;
  id: number;
  count: number;
}
export function MessageSearchField({
  options,
  onChange
}: {
  // messages: GmailMessageDTO[];
  options: any;
  // loading: boolean;
  onChange: (value: string) => void;
}) {
  const [value, setValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  // const { label, color } = options;
  const [open, setOpen] = useState(false);
  const loading = open && options.length === 0;

  const onInputChange = (
    event: SyntheticEvent<Element, Event>,
    newInputValue: string
  ) => {
    setInputValue(newInputValue);
  };
  options = options
    .map((option: any, i: number) => {
      return {
        label: option,
        color: 'blue',
        id: i
      };
    })
    .reduce((acc: any, current: any) => {
      const unique = acc.find((item: any) => item.label === current.label);
      if (!unique) {
        return acc.concat([{ ...current, count: 1 }]);
      } else {
        unique.count += 1;
        unique.color = 'red';
        return acc;
      }
    }, []);

  const filterOptions = createFilterOptions({
    // limit: 10,
    // matchFrom: 'start',
    // stringify: (option: any) => option.name,
    ignoreCase: true
  });

  // const filteredOptions = messages.filter((message) => {
  //   return message.snippet.toLowerCase().includes(inputValue.toLowerCase());
  // });

  // const filteredOptions = (options: any, inputValue: string) => {
  //     const filtered = filterOptions(options, inputValue);

  //     // Suggest the creation of a new value
  //     if (inputValue !== '') {
  //       filtered.push({
  //         inputValue: inputValue,
  //         name: `Add "${inputValue}"`
  //       });
  //     }

  //     return filtered;
  //   }
  // };

  const getOptionLabel = (option: any) => {
    // Value selected with enter, right from the input
    if (typeof option === 'string') {
      // console.log('[MessageSearch - getOptionLabel - string] option: ', option);
      return option;
    }
    // Add "xxx" option created dynamically
    if (option.inputValue) {
      // console.log(
      //   `[MessageSearch - getOptionLabel - inputValue] option: `,
      //   option
      // );
      return option.inputValue;
    }
    // Regular option
    // console.log('[MessageSearch - getOptionLabel - regular] option: ', option);
    return option.name;
  };

  function renderOption(
    props: any,
    option: any,
    state: AutocompleteRenderOptionState
  ) {
    // console.log('[MessageSearch - renderOption] option: ', option);
    if (typeof option === 'string') {
      return (
        <li {...props}>
          <Label color="red">{option}</Label>
        </li>
      );
    }
    if ((option as MessageSearchOptions).label) {
      const { label, color, id, count } = option as MessageSearchOptions;
      return (
        <li {...props} key={id}>
          <Label style={{ color: color }}>{`${label} (${count})`}</Label>
        </li>
      );
    }
  }

  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: unknown,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<unknown> | undefined
  ) => {
    console.log('selected', value);
    if (typeof value === 'string') {
      setValue(value);
      onChange(value);
      // window.open(`https://mail.google.com/mail/u/0/#search/${value}`, '_blank');
    }
    if (value) {
      if ((value as MessageSearchOptions).label) {
        const { label, color, id, count } = value as MessageSearchOptions;
        setValue(label);
        onChange(label);
      }
    }
    if (value === null) {
      setValue('');
      onChange('');
    }
  };
  const handleTextChange = async (event: SyntheticEvent<Element, Event>) => {
    const term = event.target;
    if (term instanceof HTMLInputElement) {
      // console.log('[MessageSearchField.handleTextChange] term: ', term.value);
      const value = term.value;
      // const messages = await MessageApi // or onChange
      setValue(value);
      onChange(value);
    }
  };

  return (
    <SearchContainer>
      <FormControl>
        <Label>Search</Label>
        <Autocomplete
          value={value}
          onChange={handleChange}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          filterOptions={filterOptions}
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          id="search"
          options={options}
          // getOptionLabel={getOptionLabel}
          renderOption={renderOption}
          style={{ width: 300 }}
          freeSolo
          renderInput={params => (
            <SearchTextField
              {...params}
              label="Search"
              placeholder="Message Search"
              onChange={handleTextChange}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? (
                      <FontAwesomeIcon icon={faSpinner} spin />
                    ) : (
                      <FontAwesomeIcon icon={faSearch} />
                    )}
                    {params.InputProps.endAdornment}
                  </>
                )
              }}
            />
          )}
        />
      </FormControl>
    </SearchContainer>
  );
}
