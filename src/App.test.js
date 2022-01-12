import { render, screen } from '@testing-library/react';
import App from './App';
import AccountList from './components/AccountList';

test('renders learn react link', () => {
  render(
    <AccountList accounts={[]} onSuccess={() =>{}} onError={() =>{}}  />
  );
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});
