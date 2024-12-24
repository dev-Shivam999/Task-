import axios from "axios";
import { useEffect, useState } from "react";
import TableAdd from "../components/TableAdd";
import { format } from "date-fns";



const Table = () => {
    const [lists, setLists] = useState<List[]>([]);
    const [time, setTime] = useState<Time | null>(null);

    const fetchTableData = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API}Table`, {
                withCredentials: true,
            });
            setLists(data.data.lists || []);
            setTime(data.data.time || null);
        } catch (error) {
            console.error("Error fetching table data:", error);
        }
    };

    useEffect(() => {
        fetchTableData();
    }, []);

    const formattedDate = (dateString: string) =>
        format(new Date(dateString), "dd/MM/yyyy");

    return (
        <div className="min-h-[500px] relative">
            <div className="bg-zinc-800 text-white">
                <table className="w-full border-collapse border-2">
                    <thead>
                        <tr>
                            <th>List</th>
                            <th>Task</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Reminder</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lists.length > 0 ? (
                            lists.map((list, listIndex) =>
                                list.tasks.length > 0 ? (
                                    list.tasks.map((task, taskIndex) => (
                                        <tr key={`task-${listIndex}-${taskIndex}`}>
                                            {taskIndex === 0 && (
                                                <td
                                                    className="border-2 text-center"
                                                    rowSpan={list.tasks.length}
                                                >
                                                    {list.list}
                                                </td>
                                            )}
                                            <td className="border-2 text-center">{task.title}</td>
                                            <td className="border-2 text-center">
                                                {time && time.TaskId === task._id
                                                    ? formattedDate(time.StartTime)
                                                    : "N/A"}
                                            </td>
                                            <td className="border-2 text-center">
                                                {time?.EndTime ? formattedDate(time.EndTime) : "N/A"}
                                            </td>
                                            <td className="border-2 text-center">
                                                {time?.Reminder || "N/A"}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr key={`list-${listIndex}`}>
                                        <td className="border-2">{list.list}</td>
                                        <td className="border-2" colSpan={4}>
                                            No tasks
                                        </td>
                                    </tr>
                                )
                            )
                        ) : (
                            <tr>
                                <td colSpan={5} className="text-center">
                                    No data available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <TableAdd />
        </div>
    );
};

export default Table;
