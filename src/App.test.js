import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/i18nForTests';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/investor/i);
  expect(linkElement).toBeInTheDocument();
});
