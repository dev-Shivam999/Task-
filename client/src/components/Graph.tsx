import { Bar, Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import axios from "axios";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

function Graph() {
    const [barChartData, setBarChartData] = useState<{ labels: string[]; counts: number[] }>({
        labels: [],
        counts: [],
    });

    const [doughnutChartData, setDoughnutChartData] = useState<{ labels: string[]; counts: number[] }>({
        labels: [],
        counts: [],
    });

    const fetchData = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API}Graph`, {
                withCredentials: true,
            });

            console.log("API Data:", data); 
            if (!data.data.user || !Array.isArray(data.data.user)) {
                console.error("Unexpected API response format:", data);
                return;
            }

            const listData = data.data.user.map((listItem: any) => ({
                name: listItem.list || "Unnamed List",
                taskCount: listItem.tasks ? listItem.tasks.length : 0,
            }));

            setBarChartData({
                labels: listData.map((item: any) => item.name),
                counts: listData.map((item: any) => item.taskCount),
            });

            const allTasks = data.data.user.flatMap((listItem: any) => listItem.tasks || []);
            const statusCounts = allTasks.reduce(
                (acc: { [key: string]: number }, task: any) => {
                    const status = task.isComplete ? "Completed" : "Pending";
                    acc[status] = (acc[status] || 0) + 1;
                    return acc;
                },
                {}
            );

            setDoughnutChartData({
                labels: Object.keys(statusCounts),
                counts: Object.values(statusCounts),
            });
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const barData = {
        labels: barChartData.labels,
        datasets: [
            {
                label: "Number of Tasks per List",
                data: barChartData.counts,
                backgroundColor: ["#f59e0b", "#3b82f6", "#10b981", "#ef4444", "#8b5cf6"], // Custom colors
                borderWidth: 1,
            },
        ],
    };

    const doughnutData = {
        labels: doughnutChartData.labels,
        datasets: [
            {
                label: "Task Status Distribution",
                data: doughnutChartData.counts,
                backgroundColor: ["#10b981", "#f59e0b"], 
                borderWidth: 1,
            },
        ],
    };

    return (
        <>
            <h1 className="text-2xl  font-bold mb-6">Task Charts</h1>
            <div className=" flex  p-6 bg-white  mx-auto w-full justify-around items-center">

            <div className="w-[500px] mb-10">
                <h2 className="text-lg font-semibold mb-4"> Tasks per List</h2>
                <Bar data={barData} />
            </div>

            <div className="w-[400px]">
                <h2 className="text-lg font-semibold mb-4"> Task Status</h2>
                <Doughnut data={doughnutData} />
            </div>
        </div>
        </>
    );
}

export default Graph;
