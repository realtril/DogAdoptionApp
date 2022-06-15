import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import App from './App';

const typeIntoForm = ({ email, password, confirmPassword }) => {
  const emailInputElement = screen.getByRole("textbox", { name: /email/i });
  const passwordInputElement = screen.getByLabelText("Password");
  const confirmPasswordInputElement = screen.getByLabelText(/confirm password/i);
  if (email) {
    userEvent.type(emailInputElement, email);
  }
  if (password) {
    userEvent.type(passwordInputElement, password);
  }
  if (confirmPassword) {
    userEvent.type(confirmPasswordInputElement, confirmPassword);
  }
  return {
    emailInputElement, passwordInputElement, confirmPasswordInputElement
  };
};

const submitAction = () => {
  const submitBtnElement = screen.getByRole("button", { name: /submit/i });
  userEvent.click(submitBtnElement);
};

describe("App", () => {
  beforeEach(() => {
    // This will run before each test
    render(<App />);
  });

  test("inputs should be initially empty", () => {
    expect(screen.getByRole("textbox", { name: /email/i }).value).toBe("");
    expect(screen.getByLabelText("Password").value).toBe("");
    expect(screen.getByLabelText(/confirm password/i).value).toBe("");
  });

  test("should be able to type an email", () => {
    const { emailInputElement } = typeIntoForm({ email: "selena@gmail.com" });
    expect(emailInputElement.value).toBe("selena@gmail.com");
  });

  test("should be able to type a password", () => {
    const { passwordInputElement } = typeIntoForm({ password: "12345" });
    expect(passwordInputElement.value).toBe("12345");
  });

  test("should be able to type a confirm password", () => {
    const { confirmPasswordInputElement } = typeIntoForm({ confirmPassword: "12345" });
    expect(confirmPasswordInputElement.value).toBe("12345");
  });

  describe("Error Handling", () => {
    test("should show email error message on invalid email", () => {
      expect(screen.queryByText(/the email you input is invalid/i)).not.toBeInTheDocument();
      typeIntoForm({ email: "selenagmail.com" });
      submitAction();
      expect(screen.queryByText(/the email you input is invalid/i)).toBeInTheDocument();
    });

    test("should show password error message on short password", () => {
      typeIntoForm({ email: "selena@gmail.com" });
      expect(screen.queryByText(/the password you entered should contain 5 or more characters/i)).not.toBeInTheDocument();
      typeIntoForm({ password: "123" });
      submitAction();
      expect(screen.queryByText(/the password you entered should contain 5 or more characters/i)).toBeInTheDocument();
    });

    test("should show password error message on short password", () => {
      typeIntoForm({ email: "selena@gmail.com" });
      expect(screen.queryByText(/the password you entered should contain 5 or more characters/i)).not.toBeInTheDocument();
      typeIntoForm({ password: "1234" });
      submitAction();
      expect(screen.queryByText(/the password you entered should contain 5 or more characters/i)).toBeInTheDocument();
    });

    test("should show confirm password error if passwords don't match", () => {
      typeIntoForm({ email: "selena@gmail.com", password: "123456", });
      expect(screen.queryByText(/passwords don't match. try again/i)).not.toBeInTheDocument();
      typeIntoForm({ confirmPassword: "144424" });
      submitAction();
      expect(screen.queryByText(/passwords don't match. try again/i)).toBeInTheDocument();
    });

    test("should show no error message if every input is valid", () => {
      typeIntoForm({ email: "selena@gmail.com", password: "123456", confirmPassword: "123456" });
      submitAction();
      expect(screen.queryByText(/the email you input is invalid/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/the password you entered should contain 5 or more characters/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/passwords don't match. try again/i)).not.toBeInTheDocument();
    });
  });
});