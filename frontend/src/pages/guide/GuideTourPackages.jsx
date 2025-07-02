// import React from 'react'

import { FaMagnifyingGlass } from "react-icons/fa6"
import Main from "../../components/Main"
import Card from "./guideComponents/Card"
import { useState } from "react"
import { Edit, Trash2 } from "lucide-react"

import Galle from './assets/featured-img2.jpg'
import Arugambay from './assets/post-img-arugam-bay-beach-01-scaled.jpg'
import Nuwaraeliya from './assets/images.jpeg'

const GuideTourPackages = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState("Select an option");

    const options = ["Sort By", "Latest", "Oldest", "Option 3"];

    return (
        <Main>
            <div>
                <Card>
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 bg-white">
                            <FaMagnifyingGlass className="text-gray-500 mr-2" />
                            <input
                                type="search"
                                name="packageSearch"
                                placeholder="Search"
                                className="outline-none flex-1 bg-white"
                            />
                        </div>

                        <div className="relative">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="inline-flex justify-between w-48 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50"
                            >
                                {selected}
                                <svg
                                    className={`w-4 h-4 ml-2 mt-0.5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {/* Dropdown items */}
                            {isOpen && (
                                <div className="absolute z-10 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                                    {options.map((option, index) => (
                                        <div
                                            key={index}
                                            onClick={() => {
                                                setSelected(option);
                                                setIsOpen(false);
                                            }}
                                            className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 cursor-pointer first:rounded-t-lg last:rounded-b-lg"
                                        >
                                            {option}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </Card>
            </div>
            <div className="grid grid-cols-3 h-80 gap-4">
                <Card>
                    <div className="flex flex-col gap-4 w-full">
                        <div className="h-40 overflow-hidden rounded-lg">
                            <img src={Arugambay} alt="" className="w-full" />
                        </div>

                        <div>
                            <h3 className="font-bold text-lg">Arugambay Tropical Trip</h3>
                            <div className="flex flex-row justify-between">
                                <p className="text-blue-600 font-bold">Price: Rs. 24000</p>
                                <p>Days: 1</p>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                <Edit className="w-4 h-4" />
                                <span>Edit Package</span>
                            </button>
                            <button>
                                <Trash2 className="w-5 h-5 text-red-600" />
                            </button>
                        </div>
                    </div>
                </Card>
                <Card>
                    <div className="flex flex-col gap-4 w-full">
                        <div className="h-40 overflow-hidden rounded-lg">
                            <img src={Galle} alt="" className="w-full" />
                        </div>

                        <div>
                            <h3 className="font-bold text-lg">A Day in Galle Fort</h3>
                            <div className="flex flex-row justify-between">
                                <p className="text-blue-600 font-bold">Price: Rs. 24000</p>
                                <p>Days: 1</p>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                <Edit className="w-4 h-4" />
                                <span>Edit Package</span>
                            </button>
                            <button>
                                <Trash2 className="w-5 h-5 text-red-600" />
                            </button>
                        </div>
                    </div>
                </Card>
                <Card>
                    <div className="flex flex-col gap-4 w-full">
                        <div className="h-40 overflow-hidden rounded-lg">
                            <img src={Nuwaraeliya} alt="" className="w-full" />
                        </div>

                        <div>
                            <h3 className="font-bold text-lg">Adventures of Nuwaraeliya</h3>
                            <div className="flex flex-row justify-between">
                                <p className="text-blue-600 font-bold">Price: Rs. 24000</p>
                                <p>Days: 1</p>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                <Edit className="w-4 h-4" />
                                <span>Edit Package</span>
                            </button>
                            <button>
                                <Trash2 className="w-5 h-5 text-red-600" />
                            </button>
                        </div>
                    </div>
                </Card>
            </div>
        </Main>
    )
}

export default GuideTourPackages