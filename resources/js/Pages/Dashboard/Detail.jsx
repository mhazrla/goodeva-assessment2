import React from "react";
import { Link, Head } from "@inertiajs/react";
import DefaultLayout from "@/Layouts/DefaultLayout";
import Footer from "@/Components/Footer";
import TabsRender from "@/Components/TabPanel";
import swal from "sweetalert";
import { router } from "@inertiajs/react";

export default function Detail(props) {
    const handleDelete = (id) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                router.delete(route("dashboard.destroy", id), {
                    onSuccess: () => swal("Alat berhasil dihapus"),
                });
            }
        });
    };

    return (
        <DefaultLayout
            auth={props.auth}
            errors={props.errors}
            title={props.title}
            alats={props.alats}
            sensor={props.sensor}
        >
            <div className="py-12 ">
                <div className="max-w-full mx-auto sm:px-6 lg:px-8 ">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg flex justify-between">
                        <div className="p-6  text-fontPrimary text-xl font-bold">
                            {props.sensor.nama_alat}
                        </div>

                        {/* Modal Delete Start */}
                        {props.auth.user.role === 1 ? (
                            <div className="mx-5 my-auto">
                                <div className="hidden xl:block">
                                    <button
                                        className="btn bg-red-600 text-white border-0 hover:bg-red-700"
                                        onClick={handleDelete.bind(
                                            this,
                                            props.sensor.id_alat
                                        )}
                                    >
                                        Delete
                                    </button>
                                </div>

                                <div className="block xl:hidden">
                                    <button
                                        onClick={handleDelete.bind(
                                            this,
                                            props.sensor.id_alat
                                        )}
                                    >
                                        <label
                                            htmlFor="my-modal-6"
                                            className="btn btn-circle bg-red-600 border-0 hover:bg-red-700"
                                        >
                                            <svg
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <g
                                                    id="SVGRepo_bgCarrier"
                                                    strokeWidth="0"
                                                ></g>
                                                <g
                                                    id="SVGRepo_tracerCarrier"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                ></g>
                                                <g id="SVGRepo_iconCarrier">
                                                    {" "}
                                                    <path
                                                        d="M5 6.77273H9.2M19 6.77273H14.8M9.2 6.77273V5.5C9.2 4.94772 9.64772 4.5 10.2 4.5H13.8C14.3523 4.5 14.8 4.94772 14.8 5.5V6.77273M9.2 6.77273H14.8M6.4 8.59091V15.8636C6.4 17.5778 6.4 18.4349 6.94673 18.9675C7.49347 19.5 8.37342 19.5 10.1333 19.5H13.8667C15.6266 19.5 16.5065 19.5 17.0533 18.9675C17.6 18.4349 17.6 17.5778 17.6 15.8636V8.59091M9.2 10.4091V15.8636M12 10.4091V15.8636M14.8 10.4091V15.8636"
                                                        stroke="#fff"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    ></path>{" "}
                                                </g>
                                            </svg>
                                        </label>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            ""
                        )}

                        {/* Modal Delete End */}
                    </div>
                </div>
            </div>

            {/* List Aquarium */}

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-sm sm:rounded-lg">
                        <TabsRender
                            sensor={props.sensor}
                            avg={props.data_avg}
                        />
                    </div>
                </div>
            </div>

            {/* <Footer /> */}
        </DefaultLayout>
    );
}
