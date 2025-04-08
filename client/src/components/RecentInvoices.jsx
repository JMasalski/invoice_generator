import dayjs from 'dayjs';
import 'dayjs/locale/pl';

const RecentInvoicesList = ({ invoices }) => {
    const sorted = [...invoices].sort((a, b) =>
        dayjs(b.issueDate).diff(dayjs(a.issueDate))
    );

    const recent = sorted.slice(0, 5);

    // helper do znalezienia klienta po ID


    return (
        <div className="bg-slate-700 text-white p-4 rounded-xl shadow-lg w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-4">Ostatnie wystawione faktury</h2>
            <ul className="divide-y divide-slate-600">
                {recent.map((invoice) => (
                    <li key={invoice._id} className="py-3 flex justify-between items-center">
                        <div>
                            <p className="font-semibold">{invoice.client.companyName}</p>
                            <p className="text-sm text-slate-300">
                                {dayjs(invoice.issueDate).locale('pl').format('DD MMMM YYYY')}
                            </p>
                        </div>
                        <p className="text-lg font-medium">
                            {invoice.totalGrossAmount?.toFixed(2)} zł
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecentInvoicesList;
