import * as yup from "yup";

export type SignUpFormData = yup.InferType<typeof signUpFormSchema>;

export const signUpFormSchema = yup
  .object({
    email: yup.string().email("Email invalide").required("Email requis"),
    password: yup
      .string()
      .min(8, "Mot de passe doit contenir au moins 8 caractères")
      .required("Mot de passe requis"),
    name: yup.string().required("Nom requis"),
  })
  .required();
