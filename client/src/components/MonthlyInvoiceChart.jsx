import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import dayjs from 'dayjs';
import 'dayjs/locale/pl';

const MonthlyInvoiceChart = ({ invoices }) => {
    // Grupowanie faktur po miesiącach i sumowanie kwot
    const monthlyTotals = invoices.reduce((acc, invoice) => {
        const month = dayjs(invoice.issueDate).format('YYYY-MM');
        const existing = acc.find(item => item.month === month);

        if (existing) {
            existing.total += invoice.totalGrossAmount;
        } else {
            acc.push({ month, total: invoice.totalGrossAmount });
        }

        return acc;
    }, []);

    // Sortowanie rosnąco po miesiącu
    monthlyTotals.sort((a, b) => a.month.localeCompare(b.month));

    return (
        <div className="w-full h-96">
            <ResponsiveContainer width="50%" height="50%">
                <BarChart data={monthlyTotals}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="month"
                        tickFormatter={(month) =>
                            dayjs(month).locale('pl').format('MMM YYYY')
                        }
                    />
                    <YAxis />
                    <Tooltip
                        labelFormatter={(label) =>
                            dayjs(label).locale('pl').format('MMMM YYYY')
                        }
                        formatter={(value) => `${value.toFixed(2)} zł`}
                    />
                    <Bar dataKey="total" fill="#4f46e5" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default MonthlyInvoiceChart;
