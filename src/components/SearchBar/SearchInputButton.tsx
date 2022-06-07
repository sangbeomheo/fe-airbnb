import React, { useContext, useEffect, useState } from 'react';
import IconButton from '@components/common/IconButton';
import {
  Container,
  InputButton,
  Label,
  PlaceHolder
} from '@components/SearchBar/SearchInputButton.style';
import { SelectedModalNameContext } from '@contexts/SelectedModalNameProvider';
import { ReservationInfoContext } from '@contexts/ReservationInfoProvider';
import { getStringDate } from '@/utils/util';

interface Props {
  name: string;
  label: string;
  value?: string | null;
  placeholder: string;
  searchName: string;
}

function SearchInputButton({ name, label, value = '', placeholder, searchName }: Props) {
  const { selectedModalName, showSearchModal } = useContext(SelectedModalNameContext);
  const { reservationInfo, setReservationInfo } = useContext(ReservationInfoContext);
  const [focus, setFocus] = useState(false);

  const resetValue = (searchName: string) => {
    switch (searchName) {
      case 'checkin':
        setReservationInfo({
          ...reservationInfo,
          period: {
            checkin: null,
            checkout: reservationInfo.period.checkout
          }
        });
        break;

      case 'checkout':
        setReservationInfo({
          ...reservationInfo,
          period: {
            checkin: reservationInfo.period.checkin,
            checkout: null
          }
        });
        break;

      case 'price':
        console.log('price');
        break;

      case 'personal':
        console.log('personal');
        break;

      default:
    }
  };

  useEffect(() => {
    if (selectedModalName === searchName) setFocus(true);
    else setFocus(false);
  }, [selectedModalName]);

  return (
    <Container focus={focus}>
      <InputButton type="button" name={name} onClick={() => showSearchModal(searchName)}>
        <Label focus={focus}>{label}</Label>
        <div>{value || <PlaceHolder>{placeholder}</PlaceHolder>}</div>
      </InputButton>
      {value && <IconButton icon="xCircle" handleClick={() => resetValue(searchName)} />}
    </Container>
  );
}

export default SearchInputButton;
