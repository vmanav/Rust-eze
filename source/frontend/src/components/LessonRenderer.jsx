import React, { useCallback, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretRight, faCode } from '@fortawesome/free-solid-svg-icons'
import { Tooltip } from 'react-tooltip'

import styles from './LessonRenderer.module.css'

const LessonRenderer = ({ lesson, setCode }) => {
    const { title, content, footer, examples } = lesson;

    return (
        <div className={styles.root} >
            <h2 className={styles.title}>{title}</h2>
            <ReactMarkdown
                children={content}
            />
            {examples?.length > 0 && (
                <h4>Practice Examples</h4>
            )}
            {examples.map((example, index) => (
                <CodeDropdown
                    example={example}
                    key={index}
                    setCode={setCode}
                />
            ))}
            {footer && (<ReactMarkdown children={footer} />)}
        </div>
    )
};

export default LessonRenderer;

const CodeDropdown = ({ example, setCode }) => {
    const { title, code } = example;
    const [isOpen, setIsOpen] = useState(false);

    const copyToCodeEditor = useCallback(
        () => { setCode(code) },
        [code, setCode],
    );

    const markDownCode = `~~~` + code;

    return (
        <div className={styles.accordion}>
            <div
                className={styles.accordionHeader}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span style={{ marginRight: 10, cursor: 'pointer' }}>
                    {isOpen ? (
                        <FontAwesomeIcon icon={faCaretDown} />
                    ) : (
                        <FontAwesomeIcon icon={faCaretRight} />
                    )}
                </span>
                <span>{title}</span>
                <span
                    className={styles.copyButton}
                    title="Copy code"
                    style={{ cursor: 'pointer', marginRight: 'auto' }}
                    onClick={event => {
                        event.stopPropagation();
                        copyToCodeEditor();
                    }}
                >
                    <FontAwesomeIcon className='copy-btn' icon={faCode} />
                    <Tooltip
                        place='left'
                        anchorSelect=".copy-btn"
                    >
                        Copy to code editor
                    </Tooltip>
                </span>
            </div>
            {isOpen && (<ReactMarkdown children={markDownCode} />)}
        </div>
    );
}