import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './RepoDetail.css';

const RepoDetail = () => {
    const location = useLocation();
    const { repo } = location.state;

    const [tasks, setTasks] = useState({
        todo: [
            { id: '1', title: 'Task 1', user: 'Alice' },
            { id: '2', title: 'Task 2', user: 'Bob' },
        ],
        inProgress: [
            { id: '3', title: 'Task 3', user: 'Charlie' },
        ],
        completed: [
            { id: '4', title: 'Task 4', user: 'Alice' },
        ],
    });

    const [showModal, setShowModal] = useState(false);
    const [newTask, setNewTask] = useState({ title: '', user: '' });

    const handleDragEnd = (result) => {
        if (!result.destination) return;
    
        const { source, destination } = result;
    
        // Define valid transitions
        const validTransitions = {
            todo: ['inProgress'],
            inProgress: ['completed'],
            completed: [],
        };
    
        // Check if the transition is valid
        if (!validTransitions[source.droppableId].includes(destination.droppableId)) {
            alert(`You can only move tasks from ${source.droppableId} to the next stage.`);
            return;
        }
    
        const sourceTasks = [...tasks[source.droppableId]];
        const destinationTasks = [...tasks[destination.droppableId]];
    
        // Remove the item from the source column
        const [movedTask] = sourceTasks.splice(source.index, 1);
    
        // Add the item to the destination column
        destinationTasks.splice(destination.index, 0, movedTask);
    
        // Update the state with the new order
        setTasks((prev) => ({
            ...prev,
            [source.droppableId]: sourceTasks,
            [destination.droppableId]: destinationTasks,
        }));
    };
    
    

    const addTask = () => {
        setShowModal(true);
    };

    const handleTaskSubmit = () => {
        if (newTask.title && newTask.user) {
            setTasks((prev) => ({
                ...prev,
                todo: [...prev.todo, { id: Date.now().toString(), ...newTask }],
            }));
            setNewTask({ title: '', user: '' });
            setShowModal(false);
        } else {
            alert('Please fill out all fields.');
        }
    };

    return (
        <div className="repo-detail-container">
            <h2>{repo.name}</h2>
            <p>{repo.description || 'No description available.'}</p>

            <button className="add-task-button" onClick={addTask}>
                Add Task
            </button>

            <div className="task-board">
                <DragDropContext onDragEnd={handleDragEnd}>
                    {Object.keys(tasks).map((status) => (
                        <Droppable droppableId={status} key={status}>
                            {(provided) => (
                                <div
                                    className={`task-column ${status}`}
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    <h3>{status.toUpperCase()}</h3>
                                    {tasks[status].map((task, index) => (
    <Draggable key={task.id} draggableId={task.id} index={index}>
        {(provided) => (
            <div
                className="task-card"
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
            >
                <p><strong>{task.title}</strong></p>
                <p>Assigned to: {task.user}</p>
            </div>
        )}
    </Draggable>
))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ))}
                </DragDropContext>
            </div>

            {/* Task Modal */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Add New Task</h3>
                        <div>
                            <label>Task Title:</label>
                            <input
                                type="text"
                                value={newTask.title}
                                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>Assign to:</label>
                            <input
                                type="text"
                                value={newTask.user}
                                onChange={(e) => setNewTask({ ...newTask, user: e.target.value })}
                            />
                        </div>
                        <button onClick={handleTaskSubmit}>Submit</button>
                        <button onClick={() => setShowModal(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RepoDetail;
