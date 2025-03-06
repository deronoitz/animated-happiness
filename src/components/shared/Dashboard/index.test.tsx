import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import Dashboard from "./"
import {
  GET_DASHBOARD_DATA,
} from "@/apis/schemas/dashboard";

const mockData = {
  getDashboard: {
    openTickets: 10,
    urgentTickets: 5,
    averageTicketAge: 3,
  },
};

const mockSubscriptionData = {
  updatedDashboard: {
    openTickets: 15,
    urgentTickets: 7,
    averageTicketAge: 4,
  },
};

// Mock the Apollo query
const mocks = [
  {
    request: { query: GET_DASHBOARD_DATA },
    result: { data: mockData },
  },
];

// Mock the subscription function
jest.mock("@apollo/client", () => {
  const actual = jest.requireActual("@apollo/client");
  return {
    ...actual,
    useQuery: jest.fn(() => ({
      data: mockData,
      subscribeToMore: jest.fn(({ updateQuery }) => {
        updateQuery(mockData, { subscriptionData: { data: mockSubscriptionData } });
        return jest.fn(); // Mock unsubscribe function
      }),
    })),
  };
});

describe("Dashboard Component", () => {
  it("renders MetricBox components with correct data", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Dashboard />
      </MockedProvider>
    );

    // Check initial render values
    expect(await screen.findByText("Open Requests")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("Urgent Requests")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("Average time (days) to resolve")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });
});
