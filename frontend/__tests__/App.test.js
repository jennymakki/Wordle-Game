import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders the Wordle heading", () => {
    render(<App />);
    const headingElement = screen.getByText(/Wordle/i);
    expect(headingElement).toBeInTheDocument();
});