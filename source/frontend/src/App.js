import React, {
  useState, useRef, useEffect, useCallback
} from 'react';

import CodeEditor from './components/CodeEditor';
import CodeOutput from './components/CodeOutput';
import LessonRenderer from './components/LessonRenderer';
import LessonNavigator from './components/LessonNavigator';
import { createSocket } from './utils/socket';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { lessonData } from './constants/lessonData';
import './App.css';
import IndexTable from './components/IndexTable';

function App() {
  const [output, setOutput] = useState("");
  const [lessonIdx, setLessonIdx] = useState(0);
  const [code, setCode] = useState(lessonData[0].baseCode || "");
  const [inputRequired, setInputRequired] = useState(false);
  const [input, setInput] = useState("");
  const [hasError, setHasError] = useState(false);

  const socketReference = useRef(null);

  useEffect(() => {
    return () => {
      if (socketReference.current) {
        socketReference.current.close();
      }
    };
  }, []);

  const handleRunClick = () => {
    setInputRequired(false);
    setOutput("");

    socketReference.current = createSocket(
      code,
      (content) => setOutput(prev => prev + content),
      (prompt) => setInputRequired(prompt),
      () => setInputRequired(false),
      (err) => {
        setOutput(prev => prev + "\n[err]: " + err);
        setHasError(true);
      },
      setHasError
    )
  };

  const sendInput = () => {
    if (socketReference.current && input !== "") {
      socketReference.current.send(JSON.stringify({ value: input }));
      setInput("");
      setInputRequired(false);
    }
  };

  const setLessonContent = useCallback((index) => {
    setCode(lessonData[index].baseCode || "");
    setOutput("");
    setInputRequired(false);
    setInput("");
    setHasError(false);
  }, [setCode])

  const nextLesson = useCallback(() => {
    if (lessonIdx < lessonData.length - 1) {
      setLessonIdx(lessonIdx + 1);
      setLessonContent(lessonIdx + 1);
    }
  }, [lessonIdx, setLessonContent]);

  const prevLesson = useCallback(() => {
    if (lessonIdx > 0) {
      setLessonIdx(lessonIdx - 1);
      setLessonContent(lessonIdx - 1)
    }
  }, [lessonIdx, setLessonContent]);

  const handleJumpToLesson = useCallback((index) => {
    setLessonIdx(index);
    setLessonContent(index);
  }, [setLessonIdx, setLessonContent])

  return (
    <div className="root">
      <div className="left-container">
        <IndexTable
          lessons={lessonData}
          openIndex={lessonIdx}
          onClick={handleJumpToLesson}
        />
        <LessonRenderer
          lesson={lessonData[lessonIdx]}
          setCode={setCode}
        />
        <LessonNavigator
          prevLesson={prevLesson}
          nextLesson={nextLesson}
        />
      </div>
      <div className="right-container">
        <div className="code-editor">
          <CodeEditor
            code={code}
            setCode={setCode}
          />
        </div>
        <div className="actions">
          <button
            className='run-btn'
            onClick={handleRunClick}>
            <FontAwesomeIcon icon={faPlay} />
            <span style={{ marginLeft: 10 }}>
              Run Code
            </span>
          </button>
        </div>
        <CodeOutput
          inputRequired={inputRequired}
          input={input}
          sendInput={sendInput}
          setInput={setInput}
          output={output}
          className="code-output"
          hasError={hasError}
        />
      </div>
    </div>
  );
}

export default App;
