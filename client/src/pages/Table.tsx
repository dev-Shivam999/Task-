import axios from "axios";
import { useEffect, useState } from "react";
import TableAdd from "../components/TableAdd";

const Table = () => {
    const [lists, setLists] = useState([]);

    const fetchTableData = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API}Table`, {
                withCredentials: true,
            });

            if (data.success) {
                setLists(data.data.lists || []);
            } else {
                console.error("Error:", data.message);
            }
        } catch (error) {
            console.error("Error fetching table data:", error);
        }
    };

    const [Call,SetCall]=useState(false)
    useEffect(() => {
        fetchTableData();
    }, [Call]);
    
    return (
        <div className="min-h-[500px] relative">
            <div className="bg-zinc-800 text-white">
                <table border={2} style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr className="border-2">
                            <th>List</th>
                            <th>Task</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Reminder</th>
                            <th>Attachment</th>
                        </tr>
                    </thead>
                    <tbody className="border-2" style={{ width: "100%", borderCollapse: "collapse" }}>
                        {lists.length > 0 ? (
                            lists.map((list: any, listIndex: number) => (
                                list.tasks.length > 0 ? (
                                    list.tasks.map((task: any, taskIndex: number) => (
                                        <tr key={`task-${listIndex}-${taskIndex}`}>
                                            {taskIndex === 0 && (
                                                <td className="border-2 text-center" rowSpan={list.tasks.length}>
                                                    {list.list}
                                                </td>
                                            )}
                                            <td className="border-2 text-center">{task.title}</td>
                                            <td className="border-2 text-center">
                                                {task.timer ? <>
                                                    {new Date(task.timer.StartTime).getDate()}/
                                                    {new Date(task.timer.StartTime).getMonth()}/
                                                    {new Date(task.timer.StartTime).getFullYear()}
                                                </>: "N/A"}
                                            </td>
                                            <td className="border-2 text-center">
                                                {task.timer ? <>
                                                    {new Date(task.timer.EndTime).getDate()}/
                                                    {new Date(task.timer.EndTime).getMonth()}/
                                                    {new Date(task.timer.EndTime).getFullYear()}
                                                </> : "N/A"}
                                            </td>
                                            <td className="border-2 text-center">
                                                {task.timer ? task.timer.Reminder : "N/A"}
                                            </td>
                                            <td className="border-2 text-center">
                                                  
                                                {task.attachment ? (
                                                    <a href={task.attachment.
                                                        FileLink} target="_blank" rel="noopener noreferrer">
                                                        View File
                                                    </a>
                                                  
                                                ) : (
                                                    "N/A"
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr key={`list-${listIndex}`}>
                                        <td className="border-2 text-center">{list.list}</td>
                                        <td className="border-2 text-center" colSpan={5}>
                                            No tasks
                                        </td>
                                    </tr>
                                )
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="text-center">
                                    No data available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <TableAdd SetCall={SetCall} />
        </div>
    );
};

export default Table;
