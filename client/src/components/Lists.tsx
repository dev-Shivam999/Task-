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
    const [dotVisibility, setDotVisibility] = useState<string>();

  

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
            <div className="flex gap-5 justify-start p-4">
                {lists.map((list, listIndex) => (
                    <Droppable droppableId={`${listIndex}`} key={listIndex}>
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={{ backgroundColor: list.Color }}
                                className="rounded-lg shadow-lg py-4 px-3 text-white w-72 border border-gray-200"
                            >
                                <div className="flex relative items-center justify-between mb-3">
                                    <h2 className="text-lg font-bold">{list.list.toUpperCase()}</h2>
                                    <button
                                        onClick={() => setDotVisibility(list._id)}
                                        className="text-xl font-bold cursor-pointer"
                                    >
                                        ...
                                    </button>
                                    {dotVisibility==list._id && (
                                        <Dot id={list._id} key={list._id} type="Task" />
                                    )}
                                </div>
                                <ul className="space-y-2">
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
                                                    className="p-3 rounded-lg flex justify-between items-center shadow-md cursor-pointer"
                                                >
                                                    <LI task={task} />
                                                    <button
                                                        onClick={() =>
                                                            setDotVisibility(task._id)
                                                        }
                                                        className="text-xl font-bold cursor-pointer"
                                                    >
                                                        ...
                                                    </button>
                                                    {dotVisibility==task._id&& (
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
