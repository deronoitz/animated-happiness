"use client";

import { useFormik } from "formik";
import { useMutation } from "@apollo/client";
import {
  CREATE_TICKET,
  ticketInput,
  ticketListType,
} from "@/apis/schemas/ticket";
import {
  initialValues,
  validationSchema,
} from "../../components/shared/TicketForm/validation";
import { useRouter } from "next/navigation";
import TicketForm from "@/components/shared/TicketForm";

export default function CreateTicket() {
  const router = useRouter();
  const [createTicket] = useMutation<ticketListType, ticketInput>(
    CREATE_TICKET
  );

  function handleCreateTicket(values: ticketInput) {
    createTicket({ variables: values });
    void router.push("/", { scroll: true });
  }

  const formik = useFormik<ticketInput>({
    initialValues,
    validationSchema,
    onSubmit: handleCreateTicket,
  });

  return (
    <>
      <TicketForm formik={formik} />
    </>
  );
}
