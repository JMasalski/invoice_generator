import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import dayjs from 'dayjs';
import 'dayjs/locale/pl';

const MonthlyInvoiceChart = ({ invoices }) => {

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

    monthlyTotals.sort((a, b) => a.month.localeCompare(b.month));
    const lastThreeMonths = monthlyTotals.slice(-3);
    return (
        <div className="w-full h-96 ">
            <ResponsiveContainer width="90%" height="100%">
                <BarChart data={lastThreeMonths}>
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
