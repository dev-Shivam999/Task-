import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import AddTask from "./AddTask";
import Dot from "./Dot";
import axios from "axios";
import LI from "./LI";
import { useState } from "react";

const Lists = ({
    lists,
    setLists,
}: {
    lists: any[];
    setLists: (updatedLists: any[]) => void;
}) => {
    const [dotVisibility, setDotVisibility] = useState<Record<string, boolean>>({});

    const toggleDotVisibility = (id: string) => {
        setDotVisibility((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const handleDragEnd = (result: any) => {
        const { source, destination } = result;

        if (!destination) return;

        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) {
            return;
        }

        const sourceListIndex = parseInt(source.droppableId);
        const destinationListIndex = parseInt(destination.droppableId);

        const sourceList = lists[sourceListIndex];
        const destinationList = lists[destinationListIndex];

        const taskId = sourceList.tasks[source.index]._id;
        const sourceListId = sourceList._id;
        const destinationListId = destinationList._id;

        const updatedLists = [...lists];

        const [movedTask] = sourceList.tasks.splice(source.index, 1);
        destinationList.tasks.splice(destination.index, 0, movedTask);

        updatedLists[sourceListIndex] = sourceList;
        updatedLists[destinationListIndex] = destinationList;

        setLists(updatedLists);

        axios.post(`${import.meta.env.VITE_API}Drag`, {
            TaskID: taskId,
            ListID1: sourceListId,
            ListID2: destinationListId,
        });
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className="flex gap-3 flex-wrap">
                {lists.map((list, listIndex) => (
                    <Droppable droppableId={`${listIndex}`} key={listIndex}>
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={{ backgroundColor: list.Color }}
                                className="rounded-md py-3 text-black w-[300px] mx-2 border-2"
                            >
                                <div className="flex items-baseline justify-between px-3 relative">
                                    <h1 className="font-bold py-3 text-center">
                                        {String(list.list).toLocaleUpperCase()}
                                    </h1>
                                    <div
                                        onClick={() => toggleDotVisibility(`list-${list._id}`)}
                                        className="text-3xl cursor-pointer"
                                    >
                                        ...
                                    </div>
                                    {dotVisibility[`list-${list._id}`] && (
                                        <Dot id={list._id} key={list._id} type="Task" />
                                    )}
                                </div>
                                <ul>
                                    {list.tasks.map((task: any, taskIndex: number) => (
                                        <Draggable
                                            draggableId={`${task._id}`}
                                            index={taskIndex}
                                            key={task._id}
                                        >
                                            {(provided) => (
                                                <li
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    ref={provided.innerRef}
                                                    style={{
                                                        ...provided.draggableProps.style,
                                                        backgroundColor: task.Color,
                                                    }}
                                                    className={` my-1 flex relative font-bold items-end justify-between px-3 text-white`}
                                                >
                                                    <LI task={task} />
                                                    <div
                                                        onClick={() =>
                                                            toggleDotVisibility(`task-${task._id}`)
                                                        }
                                                        className="text-3xl cursor-pointer"
                                                    >
                                                        ...
                                                    </div>
                                                    {dotVisibility[`task-${task._id}`] && (
                                                        <Dot
                                                            key={task._id}
                                                            id={task._id}
                                                            color={task.Color}
                                                            name={task.title}
                                                            type="List"
                                                        />
                                                    )}
                                                </li>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </ul>
                                <AddTask p={list} />
                            </div>
                        )}
                    </Droppable>
                ))}
            </div>
        </DragDropContext>
    );
};

export default Lists;
