import { getByTestId } from '@testing-library/react';
import React, { useState, useEffect } from 'react';
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

const todoListState = atom({
  key: 'todoListState',
  default: []
});

function ToDoList() {
  const todoList = useRecoilValue(todoListState);

  return (
    <>
      <h2>TODO LIST</h2>
      {/* <TodoListStats />
      <TodoListFilters /> */}
      <TodoItemCreator />

      {todoList.map((todoItem) => (<TodoItem key={todoItem.id} item={todoItem} />))}
    </>
  );
}

function TodoItemCreator() {
  const [inputValue, setInputValue] = useState('');
  const setTodoList = useSetRecoilState(todoListState);

  const addItem = () => {
    setTodoList((oldTodoList) => [ ...oldTodoList, { id: getId(), text: inputValue, isComplete: false }]);
    setInputValue('');
  }

  const onChange = ({ target: {value} }) => {
    setInputValue(value);
  }

  return (
    <div>
      <input type="text" value={inputValue} onChange={onChange} />
      <button onClick={addItem}>Add</button>
    </div>
  );
}

function TodoItem({item}) {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const index = todoList.findIndex((listItem) => listItem === item);

  const editItemText = ({ target: {value} }) => {
    const newList = replaceItemAtIndex(todoList, index, { ...item, text: value });
    setTodoList(newList);
  }

  const toggleItemCompletion = () => {
    const newList = replaceItemAtIndex(todoList, index, { ...item, isComplete: !item.isComplete });

    setTodoList(newList);
  }

  const deleteItem = () => {
    const newList = removeItenAtIndex(todoList, index);

    setTodoList(newList);
  }

  return (
    <div>
      <input type="text" value={item.text} onChange={editItemText} />
      <input type="checkbox" checked={item.isComplete} onChange={toggleItemCompletion} />
      <button onClick={deleteItem}>X</button>
    </div>
  );
}


// ID generate utility.
let id = 0;
function getId() {
  return id++;
}

// item replace utility.
function replaceItemAtIndex(arr, index, newValue) {
  return [ ...arr.slice(0, index), newValue, ...arr.slice(index + 1) ];
}

function removeItenAtIndex(arr, index) {
  return [ ...arr.slice(0, index), ...arr.slice(index + 1) ];
}

export default ToDoList;