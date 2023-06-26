import React, { useState } from "react";
import { Link, Head, router } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import DefaultLayout from "@/Layouts/DefaultLayout";
import Footer from "@/Components/Footer";
import swal from "sweetalert";
import AlatList from "@/Components/AlatList";

export default function Index(props) {
    const [values, setValues] = useState({
        nama_alat: "",
    });

    const errors = props.errors;

    const handleChange = (e) => {
        const key = e.target.id;
        const value = e.target.value;
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        for (let key in values) {
            formData.append(key, values[key]);
        }

        router.post(route("dashboard.store"), formData, {
            forceFormData: true,
            onSuccess: () => {
                swal("Good Job!", "Alat baru berhasil ditambahkan", "success");
            },
            onError: (errors) => {
                swal("Failed!", "Alat gagal ditambahkan", "error");
            },
        });
    };

    return (
        <DefaultLayout
            auth={props.auth}
            errors={props.errors}
            title={props.title}
            alats={props.alats}
        >
            <div className="py-12 ">
                <div className="max-w-full mx-auto sm:px-6 lg:px-8 ">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg flex justify-between">
                        <div className="p-6  text-fontPrimary text-xl font-bold">
                            List Aquarium
                        </div>

                        {/* Modal Add Start */}
                        {props.auth.user.role === 1 ? (
                            <div className="mx-5 my-auto">
                                <div className="hidden xl:block">
                                    <label
                                        htmlFor="my-modal-6"
                                        className="btn btn-info text-white"
                                    >
                                        Tambah Aquarium
                                    </label>
                                </div>

                                <div className="block xl:hidden">
                                    <label
                                        htmlFor="my-modal-6"
                                        className="btn btn-circle btn-info"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="32"
                                            height="32"
                                            fill="currentColor"
                                            className="bi bi-plus"
                                            viewBox="0 0 16 16"
                                        >
                                            {" "}
                                            <path
                                                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
                                                fill="white"
                                            ></path>{" "}
                                        </svg>
                                    </label>
                                </div>

                                <input
                                    type="checkbox"
                                    id="my-modal-6"
                                    className="modal-toggle"
                                />
                                <div className="modal modal-bottom sm:modal-middle ">
                                    <div className="modal-box bg-white">
                                        <label
                                            htmlFor="my-modal-6"
                                            className="btn btn-sm btn-circle absolute right-2 top-2"
                                        >
                                            ✕
                                        </label>
                                        <h3 className="text-lg font-bold text-fontPrimary pb-4">
                                            Tambah Aquarium Baru
                                        </h3>

                                        {/* Form Add Start */}
                                        <form
                                            onSubmit={handleSubmit}
                                            action="post"
                                            encType="multipart/form-data"
                                        >
                                            <div className="form-control">
                                                <div className="input-group">
                                                    <input
                                                        type="text"
                                                        placeholder="Nama Aquarium"
                                                        className="input input-bordered bg-white border-gray-400"
                                                        id="nama_alat"
                                                        name="nama_alat"
                                                        onChange={handleChange}
                                                        value={values.title}
                                                    />

                                                    <button className="btn btn-square">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="32"
                                                            height="32"
                                                            fill="currentColor"
                                                            className="bi bi-plus"
                                                            viewBox="0 0 16 16"
                                                        >
                                                            {" "}
                                                            <path
                                                                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
                                                                fill="white"
                                                            ></path>{" "}
                                                        </svg>
                                                    </button>
                                                </div>
                                                {errors.nama_alat && (
                                                    <div className="text-sm text-red-600">
                                                        {errors.nama_alat}
                                                    </div>
                                                )}
                                            </div>
                                        </form>
                                        {/* Form Add End */}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            ""
                        )}

                        {/* Modal Add End */}
                    </div>
                </div>
            </div>
            {/* List Aquarium */}
            <div className="container my-12 mx-auto px-4 md:px-12">
                <div className="flex flex-wrap -mx-1 lg:-mx-4">
                    <AlatList alats={props.alats} />
                </div>
            </div>
            {/* <Footer /> */}
        </DefaultLayout>
    );
}
