import axios from "axios";
import { useEffect, useState } from "react";

const Table = () => {
    const [lists, setLists] = useState([]);
    const [time, setTime] = useState<any>({});

    const fetchTableData = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API}Table`, {
                withCredentials: true,
            });
            setLists(data.data.lists || []);
            setTime(data.data.data || {});
        } catch (error) {
            console.error("Error fetching table data:", error);
        }
    };

    useEffect(() => {
        fetchTableData();
    }, []);

    return (
        <div className="bg-zinc-800 text-white mix-blend-difference">
            <table border={2} style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr className="border-2">
                        <th>List</th>
                        <th>Task</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Reminder</th>
                    </tr>
                </thead>
                <tbody className="border-2" style={{ width: "100%", borderCollapse: "collapse" }}>
                    {lists.length > 0 ? (
                        lists.map((list: any, listIndex: number) => (
                            list.tasks.length > 0 ? (
                                list.tasks.map((task: any, taskIndex: number) => (
                                    <tr key={`task-${listIndex}-${taskIndex}`}>
                                        {taskIndex === 0 && (
                                            <td className="border-2 text-center" rowSpan={list.tasks.length}>{list.list}</td>
                                        )}
                                        <td className="border-2 text-center">{task.title}</td>
                                        <td className="border-2 text-center">{time?.StartTime || "N/A"}</td>
                                        <td className="border-2 text-center">{time?.EndTime || "N/A"}</td>
                                        <td className="border-2 text-center">{time?.Reminder || "N/A"}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr key={`list-${listIndex}`}>
                                    <td>{list.list}</td>
                                    <td colSpan={4}>No tasks</td>
                                </tr>
                            )
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5}>No data available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
