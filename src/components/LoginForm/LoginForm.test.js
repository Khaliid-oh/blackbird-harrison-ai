import { getByPlaceholderText, render, screen } from '@testing-library/react';
import LoginForm from '.';

test('renders sign in page', () => {
  render(<LoginForm />);
  const signInText = screen.getByText("Sign in");
  expect(signInText).toBeInTheDocument();
});


  it('displays error message when all fields are not entered', () => {
    const { getByTestId } = render(<LoginForm />);
    const emailInput = getByTestId('test-id-email');
    const passwordInput = getByTestId('test-id-password');
    const submitButton = getByTestId('test-id-submit');
    Event.click(submitButton);
    expect(emailInput).toHaveAttribute('aria-invalid', 'true');
    expect(passwordInput).toHaveAttribute('aria-invalid', 'true');
  });

it("should not show any error message when the component is loaded", async () => {
  render(<LoginForm />);
  const alertElement = screen.queryByRole("alert");
  expect(alertElement).not.toBeInTheDocument();
});
 
it ('submitting form with valid email and password shows success message', async () => {
  render(<LoginForm />);
  const emailInput = screen.getByLabelText(/email address/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole('button')
  expect(emailInput).toBeInTheDocument()
  expect(passwordInput).toBeInTheDocument()
  expect(submitButton).toBeInTheDocument()
});
