import { render, screen } from "@testing-library/react";
import TicketForm from "./";
import { Formik } from "formik";

const mockFormikProps = {
  initialValues: {
    title: "",
    urgency: 1,
    status: "",
    description: "",
  },
  onSubmit: jest.fn(),
  handleChange: jest.fn(),
  setFieldValue: jest.fn(),
  errors: {},
  values: {
    title: "",
    urgency: 1,
    status: "",
    description: "",
  },
};

describe("TicketForm Component", () => {
  it("renders form fields correctly", () => {
    render(
      <Formik initialValues={mockFormikProps.initialValues} onSubmit={mockFormikProps.onSubmit}>
        {(formikProps) => <TicketForm formik={{ ...formikProps, ...mockFormikProps }} />}
      </Formik>
    );

    expect(screen.getByText("Urgency *")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Title *")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
  });

  it("disables the save button when required fields are empty", () => {
    render(
      <Formik initialValues={mockFormikProps.initialValues} onSubmit={mockFormikProps.onSubmit}>
        {(formikProps) => <TicketForm formik={{ ...formikProps, ...mockFormikProps }} />}
      </Formik>
    );

    const saveButton = screen.getByRole("button", { name: /save/i });
    expect(saveButton).toHaveClass("opacity-30");
  });
});
