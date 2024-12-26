import { useEffect, useState } from "react";
import axios from "axios";
import { Link, Outlet, useNavigate } from "react-router-dom";

const Home = () => {
    const [user, setUser] = useState<UserType>();
    const [Time, setTime] = useState<number | undefined>();
    const [sideShow, setSideShow] = useState<boolean>(false);

    const navigate = useNavigate();

    const Api = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API}Dashboard1`, {
                withCredentials: true,
            });

            if (!data.success) {
                if (data.message !== "Time Over") {
                    navigate("/Login");
                } else {
                    alert(data.message);
                    navigate("/Payment");
                }
            }

            setUser(data.data.user);
            setTime(data.data.Time);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        Api();
    }, []);

    return (
        <div
            style={{ backgroundColor: `${user?.Color || "#f4f4f4"}` }}
            className="flex min-h-screen "
        >
            <div>
                <div className="relative">
                    {sideShow && (
                        <div className="w-72 h-screen bg-zinc-900 text-white border-r-2 absolute top-0 left-0 z-40 shadow-lg">
                            <div className="p-4">
                                <h2 className="text-lg font-bold">Sidebar</h2>
                                <p className="text-sm mt-2">Add your sidebar content here.</p>
                            </div>
                        </div>
                    )}
                    <button
                        className={`text-white cursor-pointer absolute z-50 top-3 transition-transform ${sideShow ? "translate-x-[300px]" : "translate-x-0"
                            }`}
                        onClick={() => setSideShow((prev) => !prev)}
                    >
                        {sideShow ? ">" : "<"}
                    </button>
                </div>
            </div>

            <div className="flex-grow">
                <div className="p-4 px-0 text-gray-900">
                    <h1 className="font-bold text-5xl text-center my-4 text-white">
                         Trello Dashboard
                    </h1>
                    <div className="flex py-7 justify-between items-center bg-[#00000078] text-white px-4">
                        <div className="text-lg">
                            <span className="font-semibold">Name:</span> {user?.name}
                        </div>
                        <div className="flex items-center gap-3">
                            <Link
                                to={"Graph"}
                                className="bg-white text-black px-3 py-1 rounded-md hover:bg-gray-200 transition"
                            >
                                Graph
                            </Link>
                            <Link
                                to={"Table"}
                                className="bg-white text-black px-3 py-1 rounded-md hover:bg-gray-200 transition"
                            >
                                Table
                            </Link>
                            <Link
                                to={"/"}
                                className="bg-white text-black px-3 py-1 rounded-md hover:bg-gray-200 transition"
                            >
                                {Time} days
                            </Link>
                            <Link
                                to={"/Profile"}
                                className="bg-white text-black w-10 h-10 flex justify-center items-center rounded-full font-bold hover:bg-gray-200 transition"
                            >
                                {user?.name?.[0]?.toUpperCase()}
                            </Link>
                        </div>
                    </div>
                </div>

                <div className=" h-svh w-[99vw] overflow-auto ">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Home;
