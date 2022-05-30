import React, { useState } from 'react';
import IconButton from '@components/common/IconButton';
import {
  Container,
  InputButton,
  Label,
  PlaceHolder
} from '@components/SearchBar/SearchInputButton.style';

function SearchInputButton({
  name,
  label,
  value = '',
  placeholder,
  hasCloseBtn = true,
  handleClick
}) {
  const [InputValue, setInputValue] = useState(value);

  return (
    <Container>
      <InputButton type="button" name={name} onClick={handleClick}>
        <Label>{label}</Label>
        <div>{InputValue || <PlaceHolder>{placeholder}</PlaceHolder>}</div>
      </InputButton>
      {hasCloseBtn && InputValue && <IconButton icon="xCircle" />}
    </Container>
  );
}

export default SearchInputButton;
