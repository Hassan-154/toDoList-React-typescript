import {  useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { DataType } from "../Interfaces/DataType";
import { Delete, Edit, MoveToNext, Save } from "../components/icons";

function Home() {
  const [newTask, setNewTask] = useState<string>("");
  const [toDoList, setTodoList] = useState<DataType[]>([]);
  const [editId, setEditId] = useState<number>();
  const [editSelectedTask, setEditSelectedTask] = useState<string>('');

  //to keep eye on user typing
  const handleInputChange = (value: string) => {
    setNewTask(value);
  };

  //to add task
  function addTask() {
    // console.log("current input: " + newTask);
    if (newTask !== "") {
      const newTaskItems: DataType = {
        id: Date.now(),
        task: newTask,
        taskAdded: true,
        taskInProcess: false,
        taskComplete: false,
      };
      setTodoList([...toDoList, newTaskItems]);
      setNewTask("");
    }
  }

  //to delete task
  function deleteTask(id: number) {
    const updatedTodoList = toDoList.filter((task) => task.id !== id);
    setTodoList(updatedTodoList);
  }

  //to move task to inProcess
  function taskInProcess(id: number) {
    const updateTaskInProcess = toDoList.map((task) => {
      if (task.id === id) {
        return { ...task, taskInProcess: true, taskAdded: false };
      }
      return task;
    });
    setTodoList(updateTaskInProcess);
  }

  // to move task back to added
  function taskBackToAdded(id: number) {
    const sendTaskBackToAdded = toDoList.map((task) => {
      if (task.id === id) {
        return { ...task, taskAdded: true, taskInProcess: false };
      }
      return task;
    });
    setTodoList(sendTaskBackToAdded);
  }

  // to make the task complete
  function taskComplete(id: number) {
    const makeTheTaskComplete = toDoList.map((task) => {
      if (task.id === id) {
        return { ...task, taskComplete: true, taskInProcess: false };
      }
      return task;
    });
    setTodoList(makeTheTaskComplete);
  }

  //to edit task
  function editTask(id: number, task: string) {
    setEditId(id);
    setEditSelectedTask(task);
  }
  // render component to get the edit task value
  // useEffect(() =>  {}, [editSelectedTask]);

  //to keep eye on edit typing
  const handleForEditMode = (value: string) => {
    setEditSelectedTask(value);
  };

  //to save the edit task
  function SaveEditTask() {
    const finalizeTheEditTask = toDoList.map((task) => {
      if (task.id === editId && editSelectedTask !== "") {
        return { ...task, task: editSelectedTask };
      }
      return task;
    });
    setTodoList(finalizeTheEditTask);
    setEditId(undefined);
  }

  const SaveTaskByPressEnter = () => {
    if (editId === undefined) {
      addTask();
    }
    // if (editId !== undefined) {
    // }
    else{
      SaveEditTask();
    }
  };

  return (
    <div className="">
      <div className="bg-black py-2.5 text-white text-center text-xl">
        Todo List
      </div>
      {/* add task.? */}
      <div className="max-w-6xl mx-auto">
        <div className="max-w-sm flex gap-1.5 mx-auto items-center justify-center mt-9">
          <Input
            customClass="border border-black py-1.5 px-1.5"
            placeholder="Add Task..."
            value={newTask}
            onChange={handleInputChange}
            onEnterPress={SaveTaskByPressEnter}
          />
          <Button customClass="w-32" name="Add Task" onClick={addTask} />
        </div>
        <hr className="mt-7 border-t border-black"></hr>
        {/* task added. */}
        <div className="flex flex-row gap-4 mt-5 text-center">
          <div className="w-full">
            <span className="font-semibold pb-2">Task Added.</span>
            {toDoList.map(
              (task) =>
                task.taskAdded && (
                  <div key={task.id} className="w-full">
                    {editId !== task.id ? (
                      <div className="flex items-center justify-between border border-black bg-gray-100 py-1.5 px-1.5 mt-1.5">
                        <p>{task.task}</p>
                        <div className="flex items-center gap-2.5">
                          <Edit
                            className=""
                            onClick={() => editTask(task.id, task.task)}
                          />
                          <Delete
                            className=""
                            onClick={() => deleteTask(task.id)}
                          />
                          <MoveToNext
                            className=""
                            onClick={() => taskInProcess(task.id)}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="flex py-1 mt-1.5 items-center border border-black">
                        <Input
                          customClass=" py-1.5 px-1.5"
                          placeholder="Edit Task..."
                          value={editSelectedTask ?? ""}
                          onChange={handleForEditMode}
                          onEnterPress={SaveTaskByPressEnter}
                        />
                        <div>
                          <Save className="mr-1.5" onClick={SaveEditTask} />
                        </div>
                      </div>
                    )}
                  </div>
                )
            )}
          </div>
          {/* task in process */}
          <div className="w-full">
            <span className="font-semibold pb-2">Task in Process.</span>
            {toDoList.map(
              (task) =>
                task.taskInProcess && (
                  <div key={task.id} className="w-full">
                    <div className="flex items-center justify-between border border-black bg-gray-100 py-1.5 px-1.5 mt-1.5">
                      <p>{task.task}</p>
                      <div className="flex items-center gap-2.5">
                        <MoveToNext
                          className="rotate-180"
                          onClick={() => taskBackToAdded(task.id)}
                        />
                        <MoveToNext
                          className=""
                          onClick={() => taskComplete(task.id)}
                        />
                      </div>
                    </div>
                  </div>
                )
            )}
          </div>
          {/* task is completed */}
          <div className="w-full">
            <span className="font-semibold pb-2">Task Completed.</span>
            {toDoList.map(
              (task) =>
                task.taskComplete && (
                  <div key={task.id} className="w-full">
                    <div className="flex items-center justify-between border border-black bg-gray-100 py-1.5 px-1.5 mt-1.5">
                      <p>{task.task}</p>
                      <div className="flex items-center gap-2.5"></div>
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
