import React, { FunctionComponent } from 'react';
import { Container } from '@components/Modal/index.style';

type Props = {
  children: FunctionComponent;
};

export default function Modal({ children }: Props) {
  return <Container>{children}</Container>;
}
