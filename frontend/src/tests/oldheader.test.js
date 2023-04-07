import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import {head, dead, Header} from "../Partials/OldHeader"

test('Returns 3', () => {
  expect(head()).toBe(3);
});

test('Returns 4', () => {
    expect(dead()).toBe(4);
});

test("Example 1 renders successfully", () => {
    render(<Header/>);

    const element = screen.getByText(/UK HEALTHCARE/i);

    expect(element).toBeInTheDocument();
})
