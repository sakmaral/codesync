import { Editor } from '@monaco-editor/react';
import { useEffect } from 'react';
import io from 'socket.io-client';

function App() {
  const socket = io('http://localhost:3000');

  useEffect(() => {
    socket.on('connect', () => {
      console.log(`Connected to server with id: ${socket.id}`);
    });

    socket.on('connect_error', (err) => {
      console.log('Connection error: ', err);
    });

    return () => {
      // Clean up the socket connection when the component unmounts
      socket.disconnect();
    };
  }, []);

  return (
    <div className="h-screen w-screen">
      <Editor height="100vh" defaultLanguage="javascript" defaultValue="// some comment" />
    </div>
  );
}

export default App;
