import * as React from 'react'
import {Field} from 'redux-form'

const cx = require('classnames/bind').bind(require('./styles/LabeledItem.scss'))

interface Props {
    label: string,
    text: string,
    editable?: boolean,
    editMode?: boolean,
    className?: string,
    name?: string
}

export default class LabeledItem extends React.Component<Props, {}> {
    render() {
        const  { label, text, editable, editMode, className, name } = this.props
        return (
            <div className={cx('item', className)}>
                <span className={cx('title')}>{label}</span>
                {
                    !editMode && <p>{text}</p>
                }
                {
                    editable && editMode && <input defaultValue={text} name={name} />
                }
            </div>
        )
    }
}