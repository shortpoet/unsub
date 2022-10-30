import React from 'react';
import styled from 'styled-components';
import { Autocomplete, TextField } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0 1rem 0;
  width: 10rem;
`;

export function LocationAutoComplete({
  onChange,
  value,
  placeholder
}: {
  options?: any[];
  loading?: boolean;
  onChange?: (value: any) => void;
  value?: any;
  placeholder?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<any[]>([]);
  const loading = open && options.length === 0;
  const handlePlaceChange = (event: any, newValue: any) => {
    if (newValue) {
      onChange?.(newValue);
    }
  };
  const handlePlaceOpen = () => {
    setOpen(true);
  };
  const handlePlaceClose = () => {
    setOpen(false);
  };

  return (
    <SearchContainer>
      {loading ? (
        <FontAwesomeIcon icon={faSpinner} spin />
      ) : (
        <Autocomplete
          options={options}
          loading={loading}
          loadingText="Loading..."
          onChange={handlePlaceChange}
          onOpen={handlePlaceOpen}
          onClose={handlePlaceClose}
          isOptionEqualToValue={(option, value) => option.name === value.name}
          getOptionLabel={option => option.name}
          renderInput={params => (
            <TextField
              {...params}
              label="Search"
              variant="outlined"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : null}
                    {params.InputProps.endAdornment}
                  </>
                )
              }}
            />
          )}
        />
      )}
    </SearchContainer>
  );
}
