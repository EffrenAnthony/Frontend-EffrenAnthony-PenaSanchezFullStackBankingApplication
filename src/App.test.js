import { render } from '@testing-library/react';
import AccountList from './components/AccountList';

test('renders learn react link', () => {
  render(
    <AccountList accounts={[]} onSuccess={() =>{}} onError={() =>{}}  />
  );
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});
