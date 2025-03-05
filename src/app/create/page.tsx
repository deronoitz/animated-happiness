import Dropdown from "@/components/Dropdown";
import Field from "@/components/Field";
import { URGENCY_OPTIONS, STATUS_OPTIONS } from "@/mocks/options";

export default function CreateTicket() {
  return (
    <div className="px-5 py-7 sm:px-0">
      <div className="mb-6">
        <label className="block text-cadet-blue text-xs mb-2">Urgency *</label>
        <Dropdown options={URGENCY_OPTIONS} placeholder="Select Urgency" />
      </div>

      <div className="mb-6">
        <label className="block text-cadet-blue text-xs mb-2">Status</label>
        <Dropdown options={STATUS_OPTIONS} placeholder="Select Status" />
      </div>

      <div className="mb-6">
        <label className="block text-cadet-blue text-xs mb-2">Title *</label>
        <Field placeholder="eg. Crack in plasterboard" as="input" />
      </div>

      <div className="mb-6">
        <label className="block text-cadet-blue text-xs mb-2">
          Description
        </label>
        <Field
          as="textarea"
          rows={5}
          placeholder="Description of your request"
        />
      </div>

      <div className="px-4 mt-9">
        <button className="bg-teal-green w-full text-white rounded-lg py-3 px-6 text-lg font-medium opacity-30">
          Save
        </button>
      </div>
    </div>
  );
}
