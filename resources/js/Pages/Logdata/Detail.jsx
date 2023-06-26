import React from "react";
import { Link, Head } from "@inertiajs/react";
import DefaultLayout from "@/Layouts/DefaultLayout";
import Footer from "@/Components/Footer";
import Table from "@/Components/Table";

export default function Index(props) {
    return (
        <DefaultLayout
            auth={props.auth}
            errors={props.errors}
            title={props.title}
            alats={props.alats}
            log={props.log}
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6  text-fontPrimary text-xl font-bold">
                            Log Data
                        </div>
                    </div>
                </div>
            </div>

            {/* Table */}

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-sm sm:rounded-lg">
                        <Table log={props.log} datas={props.datas} />
                    </div>
                </div>
            </div>

            {/* <Footer /> */}
        </DefaultLayout>
    );
}
