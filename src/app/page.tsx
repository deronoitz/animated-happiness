"use client";

import Item from "@/components/common/Item";

import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";

import { GET_TICKET_LIST, GET_TICKET_SUBS } from "@/apis/schemas/ticket";

import type { ticketListType } from "@/apis/schemas/ticket";

import { useEffect } from "react";
import Dashboard from "@/components/shared/Dashboard";

export default function Home() {
  const router = useRouter();

  const { data, subscribeToMore } = useQuery<{ getTickets: ticketListType[] }>(
    GET_TICKET_LIST,
    {
      fetchPolicy: "cache-and-network",
    }
  );

  function handleCreateTicket() {
    void router.push("/create", { scroll: true });
  }

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: GET_TICKET_SUBS,
      updateQuery: (
        prev,
        {
          subscriptionData,
        }: { subscriptionData: { data: { ticketUpdated: ticketListType } } }
      ) => {
        if (!subscriptionData.data.ticketUpdated) return prev;

        const isNewData = !!prev.getTickets.find(
          (ticket) => ticket.id === subscriptionData.data.ticketUpdated.id
        );

        if (!isNewData) {
          return {
            getTickets: [
              subscriptionData.data.ticketUpdated,
              ...prev.getTickets,
            ],
          };
        } else {
          return {
            getTickets: prev.getTickets.map((ticket) =>
              ticket.id === subscriptionData.data.ticketUpdated.id
                ? subscriptionData.data.ticketUpdated
                : ticket
            ),
          };
        }
      },
    });

    return () => unsubscribe();
  }, [subscribeToMore]);

  return (
    <>
      <Dashboard />

      <div className="gap-5 flex flex-col py-5">
        {data?.getTickets?.map((ticket, index: number) => (
          <Item ticket={ticket} key={index} />
        ))}
      </div>

      <div className="text-right mt-3 mb-12">
        <button
          className="bg-teal-green p-4 rounded-full cursor-pointer shadow-small-box"
          onClick={handleCreateTicket}
        >
          <svg
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.5 10H10.5M19.5 10H10.5M10.5 10V1M10.5 10V19"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </>
  );
}
