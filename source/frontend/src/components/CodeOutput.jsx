import classNames from "classnames";

const CodeOutput = ({
    output,
    inputRequired,
    input,
    sendInput,
    setInput,
    className,
    hasError
}) => (
    <div className={className}>
        <pre
            className={classNames(
                'output-container',
                { 'output-container--error': hasError, }
            )}
        >
            {output}
            {inputRequired && (
                <div className="input-box-container">
                    <input
                        className="input-box"
                        value={input}
                        onChange={event => setInput(event.target.value)}
                        onKeyDown={event => { if (event.key === 'Enter') sendInput(); }}
                        autoFocus
                    />
                </div>
            )}
        </pre>
    </div >
);

export default CodeOutput;
