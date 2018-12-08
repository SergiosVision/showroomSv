import React from 'react'

const styles = require('./styles/.module.sass')

const cx = require('classnames/bind').bind(styles)

interface OwnProps {
    text?: string
    disableLoader?: boolean
    absolute?: boolean
    absoluteCenter?: boolean
}

class Loader extends React.Component<OwnProps, {}> {
  render() {
    const { text, disableLoader, absolute, absoluteCenter } = this.props

    return (
      <div className={cx('loader', {absolute, 'absolute-center': absoluteCenter})}>
        {text && <div className={cx('text')}>{text}</div>}
        {!disableLoader && 
          <div className={cx('preloader-wrapper small active', 'spinner')}>
            <div className={cx('spinner-layer spinner-green-only', 'layer')}>
              <div className='circle-clipper left'>
                <div className='circle'></div>
              </div><div className='gap-patch'>
                <div className='circle'></div>
              </div><div className='circle-clipper right'>
                <div className='circle'></div>
              </div>
            </div>
          </div>}
      </div>
    )
  }
}

export default Loader