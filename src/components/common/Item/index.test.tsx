import { render, screen, fireEvent } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { useRouter } from "next/navigation";
import Item from "./";
import { UPDATE_TICKET_STATUS } from "@/apis/schemas/ticket";
import { URGENCY_STATUS } from "@/constants/urgency";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Item Component", () => {
  const mockRouterPush = jest.fn();
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
  });

  const mockTicket = {
    id: 1,
    title: "Sample Ticket",
    urgency: 2,
    createdAt: "2025-03-06T12:00:00Z",
    status: "open",
    description: "Sample Description",
  };

  const mocks = [
    {
      request: {
        query: UPDATE_TICKET_STATUS,
        variables: { id: "1", status: "resolved" },
      },
      result: { data: { updateTicketStatus: { ...mockTicket, status: "resolved" } } },
    },
  ];

  it("renders ticket details correctly", () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Item ticket={mockTicket} />
      </MockedProvider>
    );

    expect(screen.getByText("Sample Ticket")).toBeInTheDocument();
    expect(screen.getByText(URGENCY_STATUS[2])).toBeInTheDocument();
    expect(screen.getByTestId("qa-resolve-button")).toBeInTheDocument();
  });

  it.skip("calls mutation when Mark as Resolved is clicked", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Item ticket={mockTicket} />
      </MockedProvider>
    );

    const resolveButton = screen.getByTestId("qa-resolve-button");
    fireEvent.click(resolveButton);

    expect(screen.getByTestId("qa-resolve-tag")).toBeInTheDocument(); // Simulating optimistic UI behavior
  });

  it("navigates to edit page on click", () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Item ticket={mockTicket} />
      </MockedProvider>
    );

    const ticketItem = screen.getByTestId("qa-ticket-item");
    fireEvent.click(ticketItem);
    expect(mockRouterPush).toHaveBeenCalledWith("/edit/1");
  });
});
