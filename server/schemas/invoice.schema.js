import { z } from 'zod';

const productSchema = z.object({
    productName: z.string({
        required_error: "Nazwa przedmiotu jest wymagana",
    }),
    quantity: z.number({
        required_error: "Ilość jest wymagana",
    }).min(0, "Ilość nie może być ujemna"),
    price: z.number({
        required_error: "Cena jest wymagana",
    }).min(0, "Cena nie może być ujemna"),
    taxRate: z.number({
        required_error: "Stawka VAT jest wymagana",
    }).min(0, "Stawka VAT nie może być mniejsza od 0").max(100, "Stawka VAT nie może być większa od 100"),
    unit: z.string().optional().nullable(),
});

export const createInvoiceSchema = z.object({
    client: z.string({
        required_error: "ID klienta jest wymagane",
    }),
    products: z.array(productSchema).min(1, "Faktura musi zawierać co najmniej jeden produkt"),
    dueDate: z.string({
        required_error: "Data płatności jest wymagana",
    }).or(z.date()),
    paymentType: z.string({
        required_error: "Sposób zapłaty jest wymagany",
    }),
});
