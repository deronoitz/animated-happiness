"use client";

import Item from "@/components/Item";
import MetricBox from "@/components/MetricBox";

import TICKET_DATA from "@/mocks/ticket";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  function handleCreateTicket() {
    void router.push("/create", { scroll: true });
  }

  return (
    <>
      {/* Meta */}
      <div className="flex gap-5 justify-center mt-6 mb-6">
        <MetricBox count={2} title="Open Requests" />
        <MetricBox count={3} title="Urgent Requests" />
        <MetricBox count={3} title="Average time (days) to resolve" />
      </div>
      {/* End of Meta */}

      {/* List of Tickets */}
      <div className="gap-5 flex flex-col py-5">
        {TICKET_DATA.map((ticket, index) => (
          <Item ticket={ticket} key={index} />
        ))}
      </div>
      {/* End of List of Tickets */}

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
