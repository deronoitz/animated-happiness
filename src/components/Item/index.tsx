import { memo } from "react";

type ItemProps = {
  ticket: {
    title: string;
    date: string;
    priority: string;
    status: string;
  };
};

function Item(props: ItemProps) {
  const { ticket } = props;

  const priorityColor =
    {
      "⚡ Urgent": "text-pumpkin-orange",
      "😊 Non Urgent": "text-bright-jade",
      "🔥 Emergency": "text-crimson-red",
      "🔨 Less Urgent": "text-royal-blue",
    }[ticket.priority] || "";

  return (
    <div className="flex flex-col bg-white p-4 rounded-xl backdrop-blur-md shadow-large-box" data-testid="qa-ticket-item">
      <div className="flex justify-between items-center w-full mb-2.5">
        <p className="text-base font-medium">{ticket.title}</p>
        <p className="text-cadet-blue text-xs">{ticket.date}</p>
      </div>
      <div className="flex justify-between items-center w-full">
        <p className={`text-base font-light ${priorityColor}`} data-testid="qa-ticket-priority">
          {ticket.priority}
        </p>
        {ticket.status !== "Resolved" ? (
          <button className="bg-teal-green text-white rounded-full px-2 py-0.5 text-xs cursor-pointer">
            Mark as Resolved
          </button>
        ) : (
          <div className="bg-cadet-blue text-white rounded-full px-2 py-0.5 text-xs cursor-default">
            Resolved
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(Item);
