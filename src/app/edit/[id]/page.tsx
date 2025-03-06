"use client";

import TicketForm from "@/components/shared/TicketForm";
import { useFormik } from "formik";
import { validationSchema } from "@/components/shared/TicketForm/validation";
import {
  GET_TICKET_BY_ID,
  ticketInput,
  UPDATE_TICKET,
} from "@/apis/schemas/ticket";
import { useMutation, useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Edit() {
  const router = useRouter();
  const { id } = useParams();

  const { data, loading } = useQuery(GET_TICKET_BY_ID, {
    variables: { id: Number(id) },
  });
  const [updateTicket] = useMutation<ticketInput, ticketInput & { id: number }>(
    UPDATE_TICKET
  );

  const ticketData = data?.getTicketById;

  function handleEditTicket(values: ticketInput) {
    updateTicket({ variables: { ...values, id: Number(id) } });
    void router.push("/", { scroll: true });
  }

  const formik = useFormik<ticketInput>({
    initialValues: {
      title: ticketData?.title || "",
      urgency: ticketData?.urgency,
      status: ticketData?.status,
      description: ticketData?.description || "",
    },
    validationSchema,
    onSubmit: handleEditTicket,
    enableReinitialize: true,
  });

  useEffect(() => {
    if (!data?.getTicketById && !loading) {
      void router.push("/", { scroll: true });
    }
  }, [data?.getTicketById, loading]);

  return (
    <>
      <TicketForm formik={formik} />
    </>
  );
}
