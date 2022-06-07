import React, { useContext, useEffect, useState } from 'react';
import IconButton from '@components/common/IconButton';
import {
  Container,
  InputButton,
  Label,
  PlaceHolder
} from '@components/SearchBar/SearchInputButton.style';
import { SelectedModalNameContext } from '@contexts/SelectedModalNameProvider';

interface Props {
  name: string;
  label: string;
  value?: string;
  placeholder: string;
  searchName: string;
  hasCloseBtn?: boolean;
  hasBorderLeft?: boolean;
}

function SearchInputButton({
  name,
  label,
  value = '',
  placeholder,
  searchName,
  hasCloseBtn = true,
  hasBorderLeft = true
}: Props) {
  const { selectedModalName, showSearchModal } = useContext(SelectedModalNameContext);
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    if (selectedModalName === searchName) setFocus(true);
    else setFocus(false);
  }, [selectedModalName]);

  return (
    <Container hasBorderLeft={hasBorderLeft}>
      <InputButton type="button" name={name} onClick={() => showSearchModal(searchName)}>
        <Label focus={focus}>{label}</Label>
        <div>{value || <PlaceHolder>{placeholder}</PlaceHolder>}</div>
      </InputButton>
      {hasCloseBtn && value && <IconButton icon="xCircle" />}
    </Container>
  );
}

export default SearchInputButton;
