import classnames from 'classnames';
import React, { useCallback, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'

import styles from './IndexTable.module.css'

const fakeLessons = [
    { title: 'Introduction' },
    { title: 'Variables and Mutability' },
    { title: 'Handling User Inputs' },
    { title: 'Control Flow' },
    { title: 'Functions' },
    { title: 'Ownership in Rust' },
    { title: 'Errors and Error Handling' },
    { title: 'Lifetimes in Rust' }
]

const IndexTable = ({ lessons, openIndex, onClick }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = useCallback((index) => {
        onClick(index);
        setIsOpen(false);
    }, [onClick]);

    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <span className={styles.headerBtn}>
                    <FontAwesomeIcon
                        icon={isOpen ? faXmark : faBars}
                        onClick={() => setIsOpen(!isOpen)}
                    />
                </span>
                <div className={styles.title}>
                    Rust-Eze
                </div>
            </div>
            <div
                className={classnames(
                    styles.container,
                    { [styles.openContainer]: isOpen })}
            >
                <h2 className={styles.indexTitle}>Index</h2>
                <ol className={styles.list}>
                    {lessons.map((lesson, index) => (
                        <li
                            key={index}
                            onClick={() => handleClick(index)}
                        >
                            {lesson.title}
                        </li>
                    ))}
                    {fakeLessons.map((lesson, index) => (
                        <li
                            key={`${index}_f`}
                            className={styles.dummyLesson}
                        >
                            {lesson.title}
                        </li>
                    ))}
                </ol>
            </div>
        </div >
    );
}

export default IndexTable;