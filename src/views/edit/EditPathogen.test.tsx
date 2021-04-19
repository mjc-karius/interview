import React from 'react';
import {render, screen} from '@testing-library/react';
import {EditPathogen} from './EditPathogen';

test('renders viral factor form', () =>
{
  render(<EditPathogen pathogen={null}/>);
  const linkElement = screen.getByText(/Viral Factor/i);
  expect(linkElement).toBeInTheDocument();
});


