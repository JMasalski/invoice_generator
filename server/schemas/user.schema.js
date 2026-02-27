import { z } from 'zod';

export const updateUserSchema = z.object({
    companyName: z.string().max(100, "Nazwa firmy musi zawierać co najwyżej 100 znaków").optional().nullable(),
    taxId: z.string().regex(/^\d{10}$/, "NIP musi składać się z 10 cyfr").optional().nullable().or(z.literal('')),
    address: z.object({
        street: z.string().optional().nullable(),
        city: z.string().optional().nullable(),
        postalCode: z.string().optional().nullable(),
        country: z.string().optional().nullable(),
    }).optional().nullable(),
    bankAccount: z.string().regex(/^\d{26}$/, "Numer konta składa się z 26 cyfr").optional().nullable().or(z.literal('')),
});
