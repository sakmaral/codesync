import { LanguageSelector } from '@/features/change-language';
import { Editor } from '@monaco-editor/react';
import { useRef, useState } from 'react';
import io from 'socket.io-client';
import { Button } from './shared/ui/button';

const socket = io('http://localhost:3000');

function App() {
  const editorRef = useRef(null);

  const [code, setCode] = useState('// Start coding here...');

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
    editor.focus();

    socket.on('code-change', (data) => {
      if (editorRef.current && data.code !== editorRef.current.getValue()) {
        editorRef.current.setValue(data.code);
      }
    });
  };

  const handleEditorChange = (value: string | undefined) => {
    console.log('here is the current model value:', value);

    if (value) {
      setCode(value);

      // Emit the new code content to the server
      socket.emit('code-change', { code: value });
    }
  };

  return (
    <div className="h-screen w-screen">
      <LanguageSelector />
      <Editor
        options={{ minimap: { enabled: false } }}
        height="90%"
        defaultLanguage="javascript"
        value={code}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        theme="vs-dark"
      />
      <Button>Share</Button>
    </div>
  );
}

export default App;

//1. Пользователь заходит на страницу
//2. Открывается главная страница без каких либо id
//3. На странице на экране будет кнопка сохранить
//4. Когда пользователь  жмет кнопку сохранить уже присваивается id и начинается слежка на автосохранением
// 5. После того как пользователь
