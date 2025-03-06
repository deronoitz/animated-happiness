import MetricBox from "@/components/common/MetricBox";
import { memo, useEffect } from "react";
import {
  GET_DASHBOARD_DATA,
  GET_DASHBOARD_SUBS,
} from "@/apis/schemas/dashboard";
import type { dashboardType } from "@/apis/schemas/dashboard";
import { useQuery } from "@apollo/client";

function Dashboard() {
  const { data: dashboardData, subscribeToMore } = useQuery<{
    getDashboard: dashboardType;
  }>(GET_DASHBOARD_DATA, {
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: GET_DASHBOARD_SUBS,
      updateQuery: (
        prev,
        {
          subscriptionData,
        }: { subscriptionData: { data: { updatedDashboard: dashboardType } } }
      ) => {
        if (!subscriptionData.data.updatedDashboard) return prev;

        return {
          getDashboard: subscriptionData.data.updatedDashboard,
        };
      },
    });

    return () => unsubscribe();
  });

  return (
    <div className="flex gap-5 justify-center mt-6 mb-6">
      <MetricBox
        count={dashboardData?.getDashboard?.openTickets}
        title="Open Requests"
      />
      <MetricBox
        count={dashboardData?.getDashboard?.urgentTickets}
        title="Urgent Requests"
      />
      <MetricBox
        count={dashboardData?.getDashboard?.averageTicketAge}
        title="Average time (days) to resolve"
      />
    </div>
  );
}

export default memo(Dashboard);
