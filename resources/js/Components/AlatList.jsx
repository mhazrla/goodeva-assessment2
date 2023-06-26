import React, { useEffect, useState } from "react";
import { Link } from "@inertiajs/react";
import moment from "moment/moment";

const isAlat = (alats) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetchData();
        const interval = setInterval(() => {
            fetchData(); // Fetch updated data at regular intervals
        }, 5000);
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`/api/datas/`);
            const responseData = await response.json();
            setData(responseData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    var counting = 1;
    return data.map((item, i) => {
        var date = moment(item.updated_at).format("YYYY-MM-DD HH:mm:ss");
        return (
            <div
                className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3 "
                key={i}
            >
                <Link href={route("dashboard.detail", item.id_alat)}>
                    <div className="card shadow-xl bg-dark-blue">
                        <div className="grid grid-rows-3 grid-flow-col rounded-lg">
                            <div className="row-span-3 bg-light-blue grid place-items-center rounded-l-lg text-white text-3xl font-bold ">
                                {counting++}
                            </div>
                            <div className="grid place-items-center row-span-2 col-span-2">
                                <p className="text-center text-2xl font-bold text-white drop-shadow-xl">
                                    {item.nama_alat}
                                </p>
                            </div>
                            <div className=" col-span-2 mb-2">
                                <div className="flex justify-between mx-4 font-light">
                                    <p className="text-white">Status :</p>
                                    <p className="text-white font-semibold">
                                        {item.status == 0
                                            ? "Kualitas air buruk"
                                            : "Kualitas air baik"}
                                    </p>
                                </div>
                                <div className="flex justify-between mx-4 font-light">
                                    <p className="text-white">Time :</p>
                                    <p className="text-white font-semibold">
                                        {date}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        );
    });
};

const noAlat = () => {
    return <div>Saat ini belum ada alat yang tersedia</div>;
};

const AlatList = ({ alats }) => {
    return alats ? isAlat(alats) : noAlat();
};

export default AlatList;
