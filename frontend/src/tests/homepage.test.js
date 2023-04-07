import Homepage from '../Pages/Homepage';
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

test("Main header renders successfully", () => {
    render(<Homepage/>);

    const element = screen.getByText(/Choose start location/i);
    // const element2 = screen.getAllByTestId

    expect(element).toBeInTheDocument();
})