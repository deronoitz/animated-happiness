import { render, screen } from "@testing-library/react";
import Item from ".";
import TICKET_DATA from "@/mocks/ticket";

describe("Item Component", () => {
  const ticket = {
    title: "Test Ticket",
    date: "2025-03-04",
    priority: "⚡ Urgent",
    status: "Open",
  };

  test("renders ticket details correctly", () => {
    render(<Item ticket={ticket} />);

    expect(screen.getByText(ticket.title)).toBeInTheDocument();
    expect(screen.getByText(ticket.date)).toBeInTheDocument();
    expect(screen.getByText(ticket.priority)).toBeInTheDocument();
  });

  test("applies correct priority color class", () => {
    render(
      <>
        <Item ticket={TICKET_DATA[0]} />
        <Item ticket={TICKET_DATA[1]} />
        <Item ticket={TICKET_DATA[2]} />
        <Item ticket={TICKET_DATA[3]} />
        <Item ticket={{...ticket, priority: ""}} />
      </>
    );
    const priorityElements = screen.getAllByTestId("qa-ticket-priority")

    expect(priorityElements[0]).toHaveClass("text-pumpkin-orange");
    expect(priorityElements[1]).toHaveClass("text-bright-jade");
    expect(priorityElements[2]).toHaveClass("text-crimson-red");
    expect(priorityElements[3]).toHaveClass("text-royal-blue");
    expect(priorityElements[4]).toHaveClass("text-base font-light");
  });

  test("shows 'Mark as Resolved' button when status is not resolved", async () => {
    render(<Item ticket={ticket} />);
    expect(screen.getByText("Mark as Resolved")).toBeInTheDocument();
  });

  test("shows 'Resolved' badge when status is resolved", () => {
    const resolvedTicket = { ...ticket, status: "Resolved" };
    render(<Item ticket={resolvedTicket} />);

    expect(screen.queryByText("Mark as Resolved")).not.toBeInTheDocument();
    expect(screen.getByText("Resolved")).toBeInTheDocument();
  });
});
