import React from 'react'
import Animate from 'rc-animate'

import styles from './style.css'

const BULLETIN_DEFAULT_TITLE = 'BREAKING NEWS'
const BULLETIN_DEFAULT_OK_TEXT = 'OK'

/**
 * Bulletin Stateless Component
 */
export function StatelessBulletin ({ icon, title = BULLETIN_DEFAULT_TITLE, message, okText = BULLETIN_DEFAULT_OK_TEXT, className, onOk = () => {}, visible = true }) {
  return <Animate
    transitionName={styles}
    transitionAppear>
    { visible ? (<div className={styles.bulletin}>
      <div className={styles.modal}>
        { icon ? <div className={styles.icon}><img src={icon} /></div> : null }
        <div className={styles.title}>{title}</div>
        <div className={styles.message}>{message}</div>
        <div className={styles.close}><button className={styles.ok} onClick={(e) => onOk(e)}>{okText}</button></div>
      </div>
    </div>) : null }
  </Animate>
}
