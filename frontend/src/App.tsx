import { LanguageSelector } from '@/features/change-language';
import { Editor } from '@monaco-editor/react';
import { useUnit } from 'effector-react';
import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { $currentSnippet, $lang } from './features/change-language/model';
import { Button } from './shared/ui/button';

const socket = io('http://localhost:3000');

function App() {
  const editorRef = useRef(null);
  const [currentSnippet, lang] = useUnit([$currentSnippet, $lang]);

  console.log('Current snippet: ' + currentSnippet);

  // Обновляем состояние code при изменении currentSnippet
  useEffect(() => {
    setCode(currentSnippet);
  }, [currentSnippet]);

  const [code, setCode] = useState(currentSnippet);

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
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
        language={lang}
        defaultLanguage={lang}
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
