import MainHeader from '../Partials/MainHeader';
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

test("Main header renders successfully", () => {
    render(<MainHeader/>);

    const element = screen.getByText(/UK HEALTHCARE/i);

    expect(element).toBeInTheDocument();
})