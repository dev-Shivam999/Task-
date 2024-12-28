import { Link } from "react-router-dom";


const Nav = ({ inShowSettings, Time, user }: {
    inShowSettings: {
        Calendar: boolean;
        Dashboard: boolean;
        Graph: boolean;
        Table: boolean;
    }, Time: number, user: UserType | undefined
}) => {
    return (
        <>
            {inShowSettings.Graph && <Link
                to={"Graph"}
                className="bg-white text-black px-3 py-1 rounded-md hover:bg-gray-200 transition">
                Graph
            </Link>}
            {inShowSettings.Calendar && <Link
                to={"Calender"}
                className="bg-white text-black px-3 py-1 rounded-md hover:bg-gray-200 transition">
                Calender
            </Link>}
            {inShowSettings.Table && <Link
                to={"Table"}
                className="bg-white text-black px-3 py-1 rounded-md hover:bg-gray-200 transition">
                Table
            </Link>}
            <Link
                to={"/"}
                className="bg-white text-black px-3 py-1 rounded-md hover:bg-gray-200 transition">
                {Time} days
            </Link>
            <Link
                to={"/Profile"}
                className="bg-white text-black w-10 h-10 flex justify-center items-center rounded-full font-bold hover:bg-gray-200 transition">
                {user?.name?.[0]?.toUpperCase()}
            </Link>


        </>
    );
};

export default Nav;