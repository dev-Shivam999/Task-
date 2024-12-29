import { useEffect, useState } from "react";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";
import Template from "../components/Template";
import Nav from "../components/Nav";
import AddUser from "../components/AddUser";

const Home = () => {
    const [user, setUser] = useState<UserType>();
    const [Time, setTime] = useState<number | undefined>();
    const [sideShow, setSideShow] = useState<boolean>(false);
    const [inShowSettings, setInShowSettings] = useState({
        Calendar: false,
        Dashboard: true,
        Graph: false,
        Table: false,
    });

    const [ShowSettings, setShowSettings] = useState<boolean>(false);
    const navigate = useNavigate();

    const Api = async () => {
        try {
            const { data } = await axios.get(
                `${import.meta.env.VITE_API}Dashboard1`,
                {
                    withCredentials: true,
                }
            );

            if (!data.success) {
                if (data.message !== "Time Over" || data.message == "Please log in") {
                    navigate("/Login");
                } else {
                    alert(data.message);
                    navigate("/Payment");
                }
            }

            setUser(data.data.user);
            setTime(data.data.Time);
            setInShowSettings(data.data.show)
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        Api();
    }, []);

    const ShowApi = async () => {

        await axios.post(`${import.meta.env.VITE_API}ShowSettings`, {
            Calendar: inShowSettings.Calendar,
            Dashboard: inShowSettings.Dashboard,
            Graph: inShowSettings.Graph,
            Table: inShowSettings.Table,
        }, {
            withCredentials: true
        })
    }



    return (
        <div
            className="bg-zinc-800 text-white ">


            <div className="flex py-5 gap-3 items-center">
                <Template setUser={setUser} />
                <AddUser />
            </div>


            <div
                style={{
                    backgroundImage: `url("${user?.CoverImg}")`,
                    width: "100%",
                    minHeight: "100vh",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundColor: `${user?.Color}`
                }}
                className="flex"
            >
                <div>
                    <div className="relative">
                        {sideShow && (
                            <div className="w-72 h-screen bg-zinc-900 text-white border-r-2 absolute top-0 left-0 z-40 shadow-lg">
                                <div className="p-4">
                                    <h2 className="text-lg font-bold">Sidebar</h2>
                                    <p className="text-sm mt-2">Add your sidebar content here.</p>
                                    <div className="flex flex-col gap-4">
                                        <Nav Time={Time || 0} inShowSettings={inShowSettings} user={user} />

                                    </div> </div>
                            </div>
                        )}
                        <button
                            className={`text-white cursor-pointer absolute z-50 top-3 transition-transform ${sideShow ? "translate-x-[300px]" : "translate-x-0"
                                }`}
                            onClick={() => setSideShow((prev) => !prev)}>
                            {sideShow ? ">" : "<"}
                        </button>
                    </div>
                </div>

                <div className="flex-grow">
                    <div className=" px-0 text-gray-900">

                        <div className="flex py-7 justify-between items-center bg-[#00000078] text-white px-4">
                            <div className="text-lg">
                                <span className="font-semibold">Name:</span> {user?.name}
                            </div>

                            <div className="flex gap-5">
                                <Nav Time={Time || 0} inShowSettings={inShowSettings} user={user} />
                                <div
                                    onClick={() => setShowSettings((p) => !p)}
                                    className="bg-transparent cursor-pointer">
                                    {ShowSettings ? ">" : "<"}
                                </div>
                            </div>
                        </div>
                    </div>
                    {ShowSettings && (
                        <div className="flex items-end text-white px-6 flex-col gap-4">
                            <div>
                                <label htmlFor="DashBoard">DasBoard</label>
                                <input type="checkbox" checked={inShowSettings.Dashboard} name="DashBoard" defaultChecked />
                            </div>
                            <div>
                                <label htmlFor="Table">Table</label>
                                <input type="checkbox" checked={inShowSettings.Table} onChange={async () => { setInShowSettings(p => ({ ...p, Table: !inShowSettings.Table })), await ShowApi() }} name="Table" />
                            </div>
                            <div>
                                <label htmlFor="Graph">Graph</label>
                                <input type="checkbox" checked={inShowSettings.Graph} onChange={async () => { setInShowSettings(p => ({ ...p, Graph: !inShowSettings.Graph })), await ShowApi() }} name="Graph" />
                            </div>
                            <div>
                                <label htmlFor="Calender">Calender</label>
                                <input type="checkbox" checked={inShowSettings.Calendar} onChange={async () => { setInShowSettings(p => ({ ...p, Calendar: !inShowSettings.Calendar })), await ShowApi() }} name="Calender" />
                            </div>
                        </div>
                    )}

                    <div className=" h-svh w-[99vw] overflow-auto ">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
