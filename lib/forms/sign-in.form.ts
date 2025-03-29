import * as yup from "yup";

export type SignInFormData = yup.InferType<typeof signInFormSchema>;

export const signInFormSchema = yup
  .object({
    email: yup.string().email("Email invalide").required("Email requis"),
    password: yup.string().required("Mot de passe requis"),
  })
  .required();
