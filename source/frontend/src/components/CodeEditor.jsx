import Editor from '@monaco-editor/react';

const CodeEditor = ({ code, setCode }) => (
    <Editor
        height="100%"
        defaultLanguage="rust"
        value={code}
        onChange={(val) => setCode(val)}
    />
);

export default CodeEditor;
