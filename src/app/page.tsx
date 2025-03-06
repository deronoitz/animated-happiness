"use client";

import Item from "@/components/common/Item";
import Dashboard from "@/components/shared/Dashboard";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { GET_TICKET_LIST, GET_TICKET_SUBS } from "@/apis/schemas/ticket";
import type { ticketListType } from "@/apis/schemas/ticket";

type ticketUpdatedType = {
  subscriptionData: {
    data: {
      ticketUpdated: ticketListType;
    };
  };
};

export default function Home() {
  const router = useRouter();

  // Fetch ticket list
  const { data, subscribeToMore } = useQuery<{ getTickets: ticketListType[] }>(
    GET_TICKET_LIST,
    {
      fetchPolicy: "cache-and-network",
    }
  );

  function handleCreateTicket() {
    void router.push("/create", { scroll: true });
  }

  // Subscribe to ticket updates using Apollo Client subscription
  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: GET_TICKET_SUBS,
      updateQuery: (prev, { subscriptionData }: ticketUpdatedType) => {
        const ticketUpdated = subscriptionData.data.ticketUpdated;

        if (!ticketUpdated) return prev;

        const isNewData = !!prev.getTickets.find(
          (ticket) => ticket.id === ticketUpdated.id
        );

        if (!isNewData) {
          return {
            getTickets: [ticketUpdated, ...prev.getTickets],
          };
        }

        return {
          getTickets: prev.getTickets.map((ticket) =>
            ticket.id === ticketUpdated.id ? ticketUpdated : ticket
          ),
        };
      },
    });

    return () => unsubscribe();
  }, [subscribeToMore]);

  return (
    <>
      <Dashboard />

      <div className="gap-5 flex flex-col py-5">
        {data?.getTickets?.map((ticket) => (
          <Item ticket={ticket} key={ticket.id} />
        ))}
      </div>

      <div className="text-right mt-3 mb-12">
        <button
          className="bg-teal-green p-4 rounded-full cursor-pointer shadow-small-box"
          onClick={handleCreateTicket}
        >
          <Image
            src="/icons/plus-icon.svg"
            alt="Add Ticket"
            width={20}
            height={20}
          />
        </button>
      </div>
    </>
  );
}
