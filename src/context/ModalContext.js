import React from 'react';

export const modalContext = React.createContext({});
export const { Provider: ModalProvider, Consumer: ModalConsumer } = modalContext;