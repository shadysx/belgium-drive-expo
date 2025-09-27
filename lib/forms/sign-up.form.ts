import * as yup from "yup";

export type SignUpFormData = yup.InferType<typeof signUpFormSchema>;

export const signUpFormSchema = yup
  .object({
    email: yup.string().email("Email invalide").required("Email requis"),
    password: yup
      .string()
      .min(8, "Mot de passe doit contenir au moins 8 caractères")
      .required("Mot de passe requis"),
    name: yup
      .string()
      .required("Nom requis")
      .min(4, "Doit contenir au moins 4 caractères")
      .max(32, "Peut contenir au plus 32 caractères")
      .matches(
        /^[a-zA-Z0-9]+$/,
        "Ne doit contenir que des lettres et des chiffres"
      ),
  })
  .required();
