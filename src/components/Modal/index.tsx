import React from 'react';
import { Container } from '@components/Modal/index.style';

interface Props {
  children: JSX.Element[] | JSX.Element;
}

export default function Modal({ children }: Props) {
  return <Container>{children}</Container>;
}
