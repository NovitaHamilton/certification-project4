import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../components/Home';
import { Provider } from 'react-redux'; // Import Provider
import store from '../store';

// Mocking react-router-dom's useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn,
}));

describe('Testing Home component', () => {
  test('If it renders correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
    expect(getByText('My Task Lists')).toBeInTheDocument();
  });
});
