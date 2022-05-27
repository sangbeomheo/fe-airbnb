import React, { useState } from 'react';
import styled from 'styled-components';
import { COLOR, FONT } from '@/constants';
import IconButton from '@/components/common/IconButton';

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
const Container = styled.div`
  display: flex;
  flex-grow: 1;
  gap: 16px;
  border-radius: 40px;
  svg {
    padding: 0;
  }
`;

const InputButton = styled.button`
  border-radius: 40px;
  text-align: left;
  min-width: 120px;
`;

const Label = styled.p`
  margin: 0 0 8px;
  font-size: ${FONT.SIZE.X_SMALL};
  font-weight: ${FONT.WEIGHT.MEDIUM};
`;

const PlaceHolder = styled.p`
  color: ${COLOR.GREY[300]};
`;

export default SearchInputButton;
