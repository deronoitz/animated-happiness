import Dropdown from "@/components/common/Dropdown";
import Field from "@/components/common/Field";
import { STATUS_OPTIONS, URGENCY_OPTIONS } from "@/constants/options";
import { FormikProps } from "formik";
import { ticketInput } from "@/apis/schemas/ticket";
import clsx from "clsx";

type TicketFormProps = {
  formik: FormikProps<ticketInput>;
};

export default function TicketForm(props: TicketFormProps) {
  const { formik } = props;
  const { values, handleChange, setFieldValue, handleSubmit, errors } = formik;

  const isButtonDisabled = values.title === "" || values.urgency === null;

  return (
    <div className="px-5 py-7 sm:px-0 sm:max-w-[447px] flex flex-col justify-center mx-auto">
      <div className="mb-6">
        <label className="block text-cadet-blue text-xs mb-2">Urgency *</label>
        <Dropdown
          options={URGENCY_OPTIONS}
          placeholder="Select Urgency"
          value={URGENCY_OPTIONS.find(
            (option) => option.value === values.urgency
          )}
          onChange={(selected) => setFieldValue("urgency", selected.value)}
        />
        {errors.urgency && (
          <p className="text-crimson-red text-xs mt-2">{errors.urgency}</p>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-cadet-blue text-xs mb-2">Status</label>
        <Dropdown
          options={STATUS_OPTIONS}
          placeholder="Select Status"
          value={STATUS_OPTIONS.find(
            (option) => option.value === values.status
          )}
          onChange={(selected) => setFieldValue("status", selected.value)}
        />
      </div>

      <div className="mb-6">
        <label className="block text-cadet-blue text-xs mb-2">Title *</label>
        <Field
          name="title"
          placeholder="eg. Crack in plasterboard"
          as="input"
          onChange={handleChange}
          value={values.title}
        />
        {errors.title && (
          <p className="text-crimson-red text-xs mt-2">{errors.title}</p>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-cadet-blue text-xs mb-2">
          Description
        </label>
        <Field
          as="textarea"
          rows={5}
          placeholder="Description of your request"
          name="description"
          value={values.description || ""}
          onChange={handleChange}
        />
      </div>

      <div className="px-4 mt-9 text-center">
        <button
          className={clsx(
            "bg-teal-green w-full sm:max-w-[268px] text-white rounded-lg py-3 px-6 text-lg transition-all font-medium",
            isButtonDisabled && "opacity-30"
          )}
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}
