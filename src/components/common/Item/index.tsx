import {
  ticketListType,
  UPDATE_TICKET_STATUS,
  updateTypeInput,
} from "@/apis/schemas/ticket";
import { URGENCY_STATUS } from "@/constants/urgency";

import { formatTimestamp } from "@/helpers/date";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { memo } from "react";

type ItemProps = {
  ticket: ticketListType;
};

function Item(props: ItemProps) {
  const router = useRouter();
  const { ticket } = props;
  const [updateStatus] = useMutation<ticketListType, updateTypeInput>(
    UPDATE_TICKET_STATUS
  );

  const urgencyColor =
    {
      1: "text-bright-jade",
      2: "text-royal-blue",
      3: "text-pumpkin-orange",
      4: "text-crimson-red",
    }[ticket.urgency] || "";

  function handleMarkAsResolved(e: React.MouseEvent) {
    e.stopPropagation();

    void updateStatus({
      variables: {
        id: ticket.id,
        status: "resolved",
      },
    });
  }

  function handleEdit(){
    void router.push(`/edit/${ticket.id}`);
  }

  return (
    <div
      className="flex flex-col bg-white p-4 rounded-xl backdrop-blur-md shadow-large-box"
      data-testid="qa-ticket-item"
      onClick={handleEdit}
    >
      <div className="flex justify-between items-center w-full mb-2.5">
        <p className="text-base font-medium">{ticket.title}</p>
        <p className="text-cadet-blue text-xs">
          {formatTimestamp(ticket.createdAt)}
        </p>
      </div>
      <div className="flex justify-between items-center w-full">
        <p
          className={`text-base font-light ${urgencyColor}`}
          data-testid="qa-ticket-priority"
        >
          {URGENCY_STATUS[ticket.urgency]}
        </p>
        {ticket.status !== "resolved" ? (
          <button
            className="bg-teal-green text-white rounded-full px-2 py-0.5 text-xs cursor-pointer"
            data-testid="qa-resolve-button"
            onClick={handleMarkAsResolved}
          >
            Mark as Resolved
          </button>
        ) : (
          <div className="bg-cadet-blue text-white rounded-full px-2 py-0.5 text-xs cursor-default" data-testid="qa-resolved-tag">
            Resolved
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(Item);
