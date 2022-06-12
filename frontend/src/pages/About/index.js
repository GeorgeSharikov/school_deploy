import React from 'react';
import styles from './styles.module.css'
import lyceumIcon from '../../shared/assets/lyceum.jpg'

export const About = (props) => {
    document.title = `О Нас`
    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                <div className={styles.titleQuestion}>Кто мы?</div>
                <div className={styles.titleText}>Команда «Лицей Days» МОУ «Лицей 1» - это юные авторы, журналисты, писатели, а также дизайнеры аудио/видео-материалов.</div>
            </div>
            <div className={styles.members}>
                <div className={`${styles.redactor} ${styles.member}`}>
                    <div className={styles.redactorHeader}>Редактор газеты:</div>
                    <span><span className={styles.name}><i>Наталья Усова</i></span>, учитель русского языка и литературы</span>
                </div>
                <div className={styles.iconWrapper}>
                    <img src={lyceumIcon}  alt='ЛицейDays лого'/>
                </div>
                <div className={`${styles.journalists} ${styles.member}`}>
                    <div className={styles.redactorHeader}>Журналисты:</div>
                    <div className={styles.list}>
                        <span className={styles.name}><i>Морозова Ксения, 8Б</i></span>
                        <span className={styles.name}><i>Петунова Нонна, 7В</i></span>
                        <span className={styles.name}><i>Мотова Виктория, 5Д</i></span>
                        <span className={styles.name}><i>Ирицян Мелянья, 9В</i></span>
                    </div>
                </div>
            </div>
        </div>
    );
}
