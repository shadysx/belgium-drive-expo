import * as yup from "yup";

export const customQuizSettingsFormSchema = yup
  .object({
    questionCount: yup.object({
      value: yup.string().required("Nombre de questions requis"),
      label: yup.string().required(),
    }),
    theme: yup.object({
      value: yup.string().required("Thème requis"),
      label: yup.string().required(),
    }),
  })
  .required();

export type CustomQuizSettingsFormData = yup.InferType<
  typeof customQuizSettingsFormSchema
>;
