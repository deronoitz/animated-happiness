import { gql } from "@apollo/client";

export type ticketListType = {
  id: number;
  title: string;
  description: string;
  urgency: number;
  status: string;
  createdAt: string | number;
};

export type updateTypeInput = {
  id: number;
  status: string;
};

export type ticketInput = {
  title: string;
  urgency: number | null;
  status: string | null;
  description?: string | null;
};

export const GET_TICKET_BY_ID = gql`
  query GetTicketById($id: Int!) {
    getTicketById(id: $id) {
      id
      title
      description
      urgency
      status
      createdAt
      updatedAt
      completedAt
    }
  }
`;

export const GET_TICKET_SUBS = gql`
  subscription TicketUpdated {
    ticketUpdated {
      id
      title
      description
      urgency
      status
      createdAt
      updatedAt
      completedAt
    }
  }
`;

export const GET_TICKET_LIST = gql`
  query GetTickets {
    getTickets {
      id
      title
      description
      urgency
      status
      createdAt
    }
  }
`;

export const UPDATE_TICKET = gql`
  mutation UpdateTicket($id: Int!, $title: String, $urgency: Int, $status: String, $description: String) {
    updateTicket(id: $id, title: $title, urgency: $urgency, status: $status, description: $description) {
      id
      title
      description
      urgency
      status
      createdAt
      updatedAt
      completedAt
    }
  }
`;

export const UPDATE_TICKET_STATUS = gql`
  mutation UpdateStatus($id: Int!, $status: String!) {
    updateStatus(id: $id, status: $status) {
      id
      title
      description
      urgency
      status
      createdAt
      updatedAt
      completedAt
    }
  }
`;

export const CREATE_TICKET = gql`
  mutation CreateTicket(
    $title: String!
    $urgency: Int!
    $status: String!
    $description: String
  ) {
    createTicket(
      title: $title
      urgency: $urgency
      status: $status
      description: $description
    ) {
      id
      title
      description
      urgency
      status
      createdAt
      updatedAt
      completedAt
    }
  }
`;
