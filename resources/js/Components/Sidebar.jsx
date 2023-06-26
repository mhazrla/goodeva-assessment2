import { Link } from "@inertiajs/react";
import { React, useState } from "react";
import simonair from "../../assets/simonair.png";
import NavLink from "./NavLink";

export default function Sidebar({ alats }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Navigation Toggle */}
            <div
                className={` ${
                    open ? "" : ""
                }drawer-side border-r  duration-300 hs-accordion-group`}
            >
                <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 bg-primary text-fontPrimary ">
                    <li className="my-2">
                        <a
                            className="flex justify-center pl-2.5"
                            href="#"
                            aria-label="Brand"
                        >
                            <img
                                src={simonair}
                                className="h-52 mr-3 my-[-4rem]"
                                alt="Flowbite Logo"
                            />
                            {/* <span className="self-center text-2xl whitespace-nowrap font-bold tracking-wide">
                                SIMONAIR
                            </span> */}
                        </a>
                    </li>

                    <li className="my-2">
                        <Link
                            href={route("/")}
                            className="  rounded-md hover:bg-light-blue"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                />
                            </svg>
                            <span className="ml-3">Dashboard</span>
                        </Link>
                    </li>

                    <li className="hs-accordion my-2" id="bu-account-accordion">
                        <a
                            className="hs-accordion-toggle hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent text-slate-700 rounded-md hover:bg-light-blue bg-transparent"
                            href="#"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                />
                            </svg>
                            <span className="ml-3">Log Data</span>

                            <svg
                                className="hs-accordion-active:block ml-auto hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                                width={16}
                                height={16}
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                />
                            </svg>
                            <svg
                                className="hs-accordion-active:hidden ml-auto block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                                width={16}
                                height={16}
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                />
                            </svg>
                        </a>
                        <div
                            id="bu-account-accordion"
                            className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden bg-transparent"
                        >
                            <ul className="pt-2 pl-2">
                                {alats.map((data, i) => {
                                    return (
                                        <li key={i}>
                                            <Link
                                                href={route(
                                                    "log",
                                                    data.id_alat
                                                )}
                                                className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-md hover:bg-light-blue"
                                            >
                                                {data.nama_alat}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </>
    );
}
