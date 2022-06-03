import React from 'react';
import styles from './styles.module.css'

export const PageNotFound = (props) => {
    return (
        <div>
            <div className={styles.pageWrapper}>
                <div className={styles.errorWrapper}>
                    <div className={styles.error}>
                        <div className={styles.errorTitle}>
                            Ошибка 404
                        </div>
                        <div className={styles.errorMessage}>
                            К сожалению, запрашиваемая страница не найдена.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
