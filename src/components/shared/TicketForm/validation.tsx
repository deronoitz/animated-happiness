import * as Yup from "yup";

export const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string(),
  status: Yup.string(),
  urgency: Yup.number().required("Urgency is required"),
});

export const initialValues = {
  urgency: null,
  status: "open",
  title: "",
  description: "",
};
