import { gql } from "@apollo/client";

export type dashboardType = {
  openTickets: number;
  urgentTickets: number;
  averageTicketAge: number;
};

export const GET_DASHBOARD_DATA = gql`
  query GetDashboard {
    getDashboard {
      openTickets
      urgentTickets
      averageTicketAge
    }
  }
`;

export const GET_DASHBOARD_SUBS = gql`
  subscription UpdatedDashboard {
    updatedDashboard {
      openTickets
      urgentTickets
      averageTicketAge
    }
  }
`;
