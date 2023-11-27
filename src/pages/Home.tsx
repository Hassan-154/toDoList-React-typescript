import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import { Delete, Edit, MoveToNext } from '../components/icons';

function Home() {

  interface DataType {
    id: number;
    task: string;
    taskAdded: boolean;
    inProcess: boolean;
    taskComplete: boolean;
  }
  const [newTask, setNewTask] = useState<string>('');
  const [toDoList, setTodoList] = useState<DataType[]>([]);

  const handleInputChange = (value: string) => {
    console.log('typing.. .' + value)
    setNewTask(value);
  };

  const addTask = () => {
    if(newTask !==''){
        const newTaskItems: DataType = {
            id: Date.now(),
            task: newTask,
            taskAdded: true,
            inProcess: false,
            taskComplete: false,
        }
        setTodoList([...toDoList, newTaskItems])
        setNewTask('');
        console.log('task added.')
    }
  };
  return (
    <div className='overflow-x-hidden'>
      <div className='bg-black py-2.5 text-white text-center text-xl'>Todo List</div>
      {/* add task.? */}
      <div className='max-w-6xl mx-auto'>
        <div className='flex gap-1.5 mx-auto items-center justify-center mt-9'>
          <div>
            <Input customClass=' py-1.5 px-1.5' placeholder='Add Task...'  onChange={handleInputChange}  />
          </div>
          <div>
            <Button customClass='' name='Add Task'  onClick={addTask}  />
          </div>
        </div>
        {/* task added. */}
        <div className='flex flex-row gap-4 mt-6'>
         <div className='w-full'>
         {toDoList.map((task) => (
            <div key={task.id} className='w-full bg-green-100'>
                <div className='flex justify-between border border-black bg-gray-200 py-1.5 px-1.5 mt-1.5'><p>{task.task}</p> <div className='flex gap-2.5'><Edit/><Delete/><MoveToNext/></div> </div>
            </div>
          ))}
          </div>
          {/* task in process */}
          <div className='w-full'></div>
          {/* task is complete */}
          <div className='w-full'></div>
        </div>
      </div>
    </div>
  );
}

export default Home;
