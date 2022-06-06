import React, { SetStateAction } from 'react';
import IconButton from '@components/common/IconButton';
import {
  Container,
  InputButton,
  Label,
  PlaceHolder
} from '@components/SearchBar/SearchInputButton.style';

interface Props {
  name: string;
  label: string;
  value?: string;
  placeholder: string;
  searchName: string;
  hasCloseBtn?: boolean;
  hasBorderLeft?: boolean;
  setSelectedModalName: SetStateAction<object>;
}

function SearchInputButton({
  name,
  label,
  value = '',
  placeholder,
  searchName,
  hasCloseBtn = true,
  hasBorderLeft = true,
  setSelectedModalName
}: Props) {
  return (
    <Container hasBorderLeft={hasBorderLeft}>
      <InputButton type="button" name={name} onClick={() => setSelectedModalName(searchName)}>
        <Label>{label}</Label>
        <div>{value || <PlaceHolder>{placeholder}</PlaceHolder>}</div>
      </InputButton>
      {hasCloseBtn && value && <IconButton icon="xCircle" />}
    </Container>
  );
}

export default SearchInputButton;
