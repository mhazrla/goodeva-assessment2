import React, { useEffect, useState } from "react";
import Gauge from "./Gauge";
import moment from "moment";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
} from "recharts";
const data01 = [
    { name: "pH", value: 7.8 },
    { name: "Suhu", value: 28 },
    { name: "Amonia", value: 0.01 },
    { name: "TSS", value: 4 },
    { name: "TDS", value: 5 },
    { name: "Salinitas", value: 0 },
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const Tabs = ({ color, sensor, avg }) => {
    const sensorId = sensor.id_alat;
    const [data, setData] = useState([]);
    const average = [];
    avg.map((item) => {
        average.push({
            name: moment(data.date).format("DD/MM/YYYY"),
            pH: data.ph,
            Suhu: data.suhu,
            Amonia: data.amonia,
            TSS: data.tss,
            TDS: data.tds,
            Salinitas: data.salinitas,
        });
    });

    useEffect(() => {
        fetchData();
        const interval = setInterval(() => {
            fetchData(); // Fetch updated data at regular intervals
        }, 7000);
    }, [sensor]);

    const fetchData = async () => {
        try {
            const response = await fetch(`/api/data/${sensorId}`);
            const responseData = await response.json();
            setData(responseData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const [openTab, setOpenTab] = React.useState(1);
    return (
        <>
            <div className="flex flex-wrap">
                <div className="w-full">
                    <ul
                        className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row mx-4 lg:mx-0 -mt-3"
                        role="tablist"
                    >
                        <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                            <a
                                className={
                                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                                    (openTab === 1
                                        ? "text-white bg-" + color + "-600"
                                        : "text-" + color + "-600 bg-white")
                                }
                                onClick={(e) => {
                                    e.preventDefault();
                                    setOpenTab(1);
                                }}
                                data-toggle="tab"
                                href="#link1"
                                role="tablist"
                            >
                                Data
                            </a>
                        </li>
                        <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                            <a
                                className={
                                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                                    (openTab === 2
                                        ? "text-white bg-" + color + "-600"
                                        : "text-" + color + "-600 bg-white")
                                }
                                onClick={(e) => {
                                    e.preventDefault();
                                    setOpenTab(2);
                                }}
                                data-toggle="tab"
                                href="#link2"
                                role="tablist"
                            >
                                Graph
                            </a>
                        </li>
                    </ul>
                    <div className="relative flex flex-col min-w-0 break-words  w-full shadow-lg rounded">
                        <div className="px-4 flex-auto">
                            <div className="tab-content tab-space">
                                <div
                                    className={
                                        openTab === 1 ? "block" : "hidden"
                                    }
                                    id="link1"
                                >
                                    {/* Render the fetched data */}
                                    <div
                                        id={data.id_alat}
                                        className="container my-12 mx-auto px-4 md:px-12"
                                    >
                                        <div className="flex flex-wrap -mx-1 lg:-mx-4">
                                            <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3 ">
                                                <article className="overflow-hidden rounded-lg shadow-lg bg-cyan-100 ">
                                                    <div className="card-body items-center text-center">
                                                        <h2 className="card-title font-bold text-2xl">
                                                            pH {data.ph}
                                                        </h2>
                                                        <div className="mt-4">
                                                            <Gauge
                                                                value={data.ph}
                                                                min={0}
                                                                max={8.5}
                                                                label="pH"
                                                            />
                                                        </div>
                                                    </div>
                                                </article>
                                            </div>

                                            <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3 ">
                                                <article className="overflow-hidden rounded-lg shadow-lg bg-cyan-100 ">
                                                    <div className="card-body items-center text-center">
                                                        <h2 className="card-title font-bold text-2xl">
                                                            Suhu
                                                        </h2>
                                                        <div className="mt-4">
                                                            <Gauge
                                                                value={
                                                                    data.suhu
                                                                }
                                                                min={0}
                                                                label="°C"
                                                                max={32}
                                                            />
                                                        </div>
                                                    </div>
                                                </article>
                                            </div>

                                            <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3 ">
                                                <article className="overflow-hidden rounded-lg shadow-lg bg-cyan-100 ">
                                                    <div className="card-body items-center text-center">
                                                        <h2 className="card-title font-bold text-2xl">
                                                            Amonia
                                                        </h2>
                                                        <div className="mt-4">
                                                            <Gauge
                                                                value={
                                                                    data.amonia
                                                                }
                                                                min={0}
                                                                label="g/L"
                                                                max={0.1}
                                                            />
                                                        </div>
                                                    </div>
                                                </article>
                                            </div>

                                            <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3 ">
                                                <article className="overflow-hidden rounded-lg shadow-lg bg-cyan-100 ">
                                                    <div className="card-body items-center text-center">
                                                        <h2 className="card-title font-bold text-2xl">
                                                            TSS
                                                        </h2>
                                                        <div className="mt-4">
                                                            <Gauge
                                                                value={data.tss}
                                                                min={0}
                                                                label="Volt"
                                                                max={3.8}
                                                            />
                                                        </div>
                                                    </div>
                                                </article>
                                            </div>

                                            <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3 ">
                                                <article className="overflow-hidden rounded-lg shadow-lg bg-cyan-100 ">
                                                    <div className="card-body items-center text-center">
                                                        <h2 className="card-title font-bold text-2xl">
                                                            TDS
                                                        </h2>
                                                        <div className="mt-4">
                                                            <Gauge
                                                                value={data.tds}
                                                                min={0}
                                                                label="PPM"
                                                                max={135}
                                                            />
                                                        </div>
                                                    </div>
                                                </article>
                                            </div>

                                            <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3 ">
                                                <article className="overflow-hidden rounded-lg shadow-lg bg-cyan-100 ">
                                                    <div className="card-body items-center text-center">
                                                        <h2 className="card-title font-bold text-2xl">
                                                            Salinitas
                                                        </h2>
                                                        <div className="mt-4">
                                                            <Gauge
                                                                value={
                                                                    data.salinitas
                                                                }
                                                                min={0}
                                                                label="PPM"
                                                                max={1}
                                                            />
                                                        </div>
                                                    </div>
                                                </article>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className={
                                        openTab === 2 ? "block" : "hidden"
                                    }
                                    id="link2"
                                >
                                    <div className="py-12">
                                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                                <div className="p-6  text-fontPrimary ">
                                                    {/* Mobile Graph Start */}
                                                    <LineChart
                                                        className="block sm:hidden"
                                                        width={290}
                                                        height={290}
                                                        data={average}
                                                        margin={{
                                                            top: 5,
                                                            right: 30,
                                                            left: 20,
                                                            bottom: 5,
                                                        }}
                                                    >
                                                        <CartesianGrid strokeDasharray="3 3" />
                                                        <XAxis dataKey="name" />
                                                        <YAxis />
                                                        <Tooltip />
                                                        <Legend />
                                                        <Line
                                                            type="monotone"
                                                            dataKey="pH"
                                                            stroke="#8884d8"
                                                            activeDot={{ r: 8 }}
                                                        />
                                                        <Line
                                                            type="monotone"
                                                            dataKey="Suhu"
                                                            stroke="#82ca9d"
                                                        />
                                                        <Line
                                                            type="monotone"
                                                            dataKey="Amonia"
                                                            stroke="#025464"
                                                        />
                                                        <Line
                                                            type="monotone"
                                                            dataKey="TSS"
                                                            stroke="#E57C23"
                                                        />
                                                        <Line
                                                            type="monotone"
                                                            dataKey="TDS"
                                                            stroke="#4C4C6D"
                                                        />
                                                        <Line
                                                            type="monotone"
                                                            dataKey="Salinitas"
                                                            stroke="#8B1874"
                                                        />
                                                    </LineChart>
                                                    {/* Mobile Graph End */}

                                                    {/* Desktop Graph Start */}
                                                    <LineChart
                                                        className="hidden sm:block"
                                                        width={800}
                                                        height={400}
                                                        data={average}
                                                        margin={{
                                                            top: 5,
                                                            right: 30,
                                                            left: 20,
                                                            bottom: 5,
                                                        }}
                                                    >
                                                        <CartesianGrid strokeDasharray="3 3" />
                                                        <XAxis dataKey="name" />
                                                        <YAxis />
                                                        <Tooltip />
                                                        <Legend />
                                                        <Line
                                                            type="monotone"
                                                            dataKey="pH"
                                                            stroke="#8884d8"
                                                            activeDot={{ r: 8 }}
                                                        />
                                                        <Line
                                                            type="monotone"
                                                            dataKey="Suhu"
                                                            stroke="#82ca9d"
                                                        />
                                                        <Line
                                                            type="monotone"
                                                            dataKey="Amonia"
                                                            stroke="#025464"
                                                        />
                                                        <Line
                                                            type="monotone"
                                                            dataKey="TSS"
                                                            stroke="#E57C23"
                                                        />
                                                        <Line
                                                            type="monotone"
                                                            dataKey="TDS"
                                                            stroke="#4C4C6D"
                                                        />
                                                        <Line
                                                            type="monotone"
                                                            dataKey="Salinitas"
                                                            stroke="#8B1874"
                                                        />
                                                    </LineChart>
                                                    {/* Desktop Graph End */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Bar */}
                                    <div className="py-12">
                                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                                <div className="p-6  text-fontPrimary ">
                                                    <ResponsiveContainer
                                                        width="99%"
                                                        aspect={3}
                                                    >
                                                        <BarChart
                                                            width={500}
                                                            height={300}
                                                            data={average}
                                                            margin={{
                                                                top: 5,
                                                                right: 30,
                                                                left: 20,
                                                                bottom: 5,
                                                            }}
                                                        >
                                                            <CartesianGrid strokeDasharray="3 3" />
                                                            <XAxis dataKey="name" />
                                                            <YAxis />
                                                            <Tooltip />
                                                            <Legend />
                                                            <Bar
                                                                dataKey="pH"
                                                                fill="#8884d8"
                                                            />
                                                            <Bar
                                                                dataKey="Suhu"
                                                                fill="#82ca9d"
                                                            />
                                                            <Bar
                                                                dataKey="Amonia"
                                                                fill="#FFBB28"
                                                            />
                                                            <Bar
                                                                dataKey="TSS"
                                                                fill="pink"
                                                            />
                                                            <Bar
                                                                dataKey="TDS"
                                                                fill="red"
                                                            />
                                                            <Bar
                                                                dataKey="Salinitas"
                                                                fill="#0088FE"
                                                            />
                                                        </BarChart>
                                                    </ResponsiveContainer>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Pie */}
                                    <div className="py-12">
                                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                                <div className="p-6  text-fontPrimary ">
                                                    <ResponsiveContainer
                                                        width="100%"
                                                        height="100%"
                                                        aspect={3}
                                                    >
                                                        <PieChart
                                                            width={400}
                                                            height={400}
                                                        >
                                                            <Pie
                                                                dataKey="value"
                                                                isAnimationActive={
                                                                    false
                                                                }
                                                                data={data01}
                                                                cx="50%"
                                                                cy="50%"
                                                                outerRadius={80}
                                                                fill="#8884d8"
                                                                label
                                                            />

                                                            <Tooltip />
                                                        </PieChart>
                                                    </ResponsiveContainer>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Circle */}
                                    <div className="py-12">
                                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                                <div className="p-6  text-fontPrimary ">
                                                    <ResponsiveContainer
                                                        width="100%"
                                                        height="100%"
                                                        aspect={2}
                                                    >
                                                        <PieChart
                                                            width={800}
                                                            height={400}
                                                        >
                                                            <Pie
                                                                data={data01}
                                                                cx={120}
                                                                cy={200}
                                                                innerRadius={60}
                                                                outerRadius={80}
                                                                fill="#8884d8"
                                                                paddingAngle={5}
                                                                dataKey="value"
                                                            >
                                                                {data01.map(
                                                                    (
                                                                        entry,
                                                                        index
                                                                    ) => (
                                                                        <Cell
                                                                            key={`cell-${index}`}
                                                                            fill={
                                                                                COLORS[
                                                                                    index %
                                                                                        COLORS.length
                                                                                ]
                                                                            }
                                                                        />
                                                                    )
                                                                )}
                                                            </Pie>

                                                            <Pie
                                                                data={data01}
                                                                cx={420}
                                                                cy={200}
                                                                startAngle={0}
                                                                endAngle={180}
                                                                innerRadius={60}
                                                                outerRadius={80}
                                                                fill="#8884d8"
                                                                paddingAngle={5}
                                                                dataKey="value"
                                                            >
                                                                {data01.map(
                                                                    (
                                                                        entry,
                                                                        index
                                                                    ) => (
                                                                        <Cell
                                                                            key={`cell-${index}`}
                                                                            fill={
                                                                                COLORS[
                                                                                    index %
                                                                                        COLORS.length
                                                                                ]
                                                                            }
                                                                        />
                                                                    )
                                                                )}
                                                            </Pie>

                                                            <Tooltip />
                                                        </PieChart>
                                                    </ResponsiveContainer>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default function TabsRender(props) {
    return (
        <>
            <Tabs color="red" sensor={props.sensor} avg={props.avg} />
        </>
    );
}
