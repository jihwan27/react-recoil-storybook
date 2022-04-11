import './App.css';
import React from 'react';
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import ToDoList from './todo-list-component/todo-list';

function App() {
  const textState = atom({
    key: 'textState',
    default: ''
  });
  
  function CharacterCounter() {
    return (
      <div>
        <h2>CHARACTER COUNTER</h2>
        <TextInput />
        <CharacterCount />
        <div>==========================================================================</div>
      </div>
    );
  }
  
  function TextInput() {
    const [text, setText] = useRecoilState(textState);
  
    const onChange = (event) => {
      setText(event.target.value);
    };
  
    return (
      <div>
        <input type="text" value={text} onChange={onChange} />
        <br />
        Echo: {text}
      </div>
    );
  }
  
  const charCountState = selector({
    key: 'charCountState',
    get: ({get}) => {
      const text = get(textState);
  
      return text.length;
    },
  });
  
  function CharacterCount() {
    const count = useRecoilValue(charCountState);
  
    return <>Character Count: {count}</>;
  }

  return (
    <RecoilRoot>
      <CharacterCounter />
      <ToDoList />
    </RecoilRoot>
  );
}

export default App;
