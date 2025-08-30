import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'

import styles from './LessonNavigator.module.css'

const LessonNavigator = ({
    nextLesson,
    prevLesson,
    nextPresent = true,
    prevPresent = true
}) => (
    <div className={styles.navRoot}>
        <button
            className={classnames(styles.button, styles.borderRight)}
            onClick={prevLesson}
            disabled={!prevPresent}
        >
            <FontAwesomeIcon icon={faAngleDoubleLeft} />
            <span>Previous</span>
        </button>
        <button
            className={classnames(styles.button, styles.borderLeft)}
            onClick={nextLesson}
            disabled={!nextPresent}
        >
            <span>Next</span>
            <FontAwesomeIcon icon={faAngleDoubleRight} />
        </button>
    </div>
);

export default LessonNavigator;
