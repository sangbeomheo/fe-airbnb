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

interface SearchInputButtonProps {
  name: string;
  label: string;
  value?: string | null;
  placeholder: string;
  searchName: string;
}

function SearchInputButton({
  name,
  label,
  value = '',
  placeholder,
  searchName
}: SearchInputButtonProps) {
  const { selectedModalName, showSearchModal } = useContext(SelectedModalNameContext);
  const { reservationInfo, setReservationInfo, setReservationInfoByPeriod } =
    useContext(ReservationInfoContext);
  const [focus, setFocus] = useState(false);

  const resetValue = (searchName: string) => {
    const { checkin, checkout } = reservationInfo.period;

    switch (searchName) {
      case 'checkin':
        setReservationInfoByPeriod(null, checkout);
        break;

      case 'checkout':
        setReservationInfoByPeriod(checkin, null);
        break;

      case 'price':
        setReservationInfoByPeriod(checkin, checkout);
        break;

      case 'personal':
        setReservationInfo({
          ...reservationInfo,
          persons: {
            adult: 2,
            child: 0,
            infant: 0
          }
        });
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
