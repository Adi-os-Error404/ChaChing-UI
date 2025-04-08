import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { getCoinMarketChart } from "../../../api";
import dayjs from "dayjs";
import Spinner from "../Spinner/Spinner";

interface CoinChartProps {
    coinId: string;
    vsCurrency?: string;
}

interface ChartDataPoint {
    date: string;
    price: number;
}

const CoinChart: React.FC<CoinChartProps> = ({ coinId, vsCurrency = "usd" }) => {
    const [data, setData] = useState<ChartDataPoint[]>([]);
    const [loading, setLoading] = useState(true);
    const [days, setDays] = useState("30");
    const [lineColor, setLineColor] = useState("#8884d8");

    const dayOptions: { label: string; value: string }[] = [
        { label: "7D", value: "7" },
        { label: "30D", value: "30" },
        { label: "1Y", value: "365" },
    ];

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const chartData = await getCoinMarketChart(coinId, vsCurrency, days);

            if (Array.isArray(chartData)) {
                const formatted = chartData.map(point => ({
                    date: dayjs(point.timestamp).format(days === "1" ? "HH:mm" : "MMM D"),
                    price: point.price
                }));
                setData(formatted);

                if (formatted.length > 1) {
                    const first = formatted[0].price;
                    const last = formatted[formatted.length - 1].price;
                    setLineColor(first > last ? "#ff637e" : "#05df72");
                }
            }
            setLoading(false);
        };

        fetchData();
    }, [coinId, vsCurrency, days]);

    return (
        <div>
            <div className="flex gap-2 mb-10">
                {dayOptions.map(option => (
                    <button
                        key={option.value}
                        onClick={() => setDays(option.value)}
                        className={`px-3 py-1 rounded-md border font-bold ${
                            days === option.value ? "bg-blue-400 text-white" : "bg-white text-blue-500"
                        }`}
                    >
                        {option.label}
                    </button>
                ))}
            </div>

            {loading ? (
                <Spinner />
            ) : !data.length ? (
                <div>No chart data available.</div>
            ) : (
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="date"
                            interval="preserveStartEnd"
                            tick={{ fontSize: 12 }}
                            angle={-45}
                            textAnchor="end"
                            height={60}
                        />
                        <YAxis dataKey="price" tick={{ fontSize: 12 }} domain={['auto', 'auto']} />
                        <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
                        <Line
                            type="linear"
                            dataKey="price"
                            stroke={lineColor}
                            strokeWidth={2.5}
                            dot={false}
                            isAnimationActive={true}
                        />
                    </LineChart>
                </ResponsiveContainer>
            )}
        </div>
    );
};

export default CoinChart
