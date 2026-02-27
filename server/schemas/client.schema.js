import { z } from 'zod';

export const createClientSchema = z.object({
    name: z.string({
        required_error: "Nazwa klienta jest wymagana",
    }).min(3, "Nazwa musi zawierać co najmniej 3 znaki").max(50, "Nazwa musi zawierać co najwyżej 50 znaków"),
    companyName: z.string().max(100, "Nazwa firmy musi zawierać co najwyżej 100 znaków").optional().nullable(),
    taxId: z.string().optional().nullable(),
    address: z.object({
        street: z.string().optional().nullable(),
        city: z.string().optional().nullable(),
        postalCode: z.string().optional().nullable(),
        country: z.string().optional().nullable(),
    }).optional().nullable(),
    bankAccount: z.string().regex(/^\d{26}$/, "Numer konta składa się z 26 cyfr").optional().nullable().or(z.literal('')),
});

export const updateClientSchema = createClientSchema.partial();
