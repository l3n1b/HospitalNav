import Homepage from '../Pages/Homepage';
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

test("Homepage renders successfully", () => {
    render(<Homepage/>);

    const element = screen.getByText(/Choose start location/i);

    expect(element).toBeInTheDocument();
})