import React, { Component } from 'react'

import styles from './styles/.module.sass'
import Column from './Column'

const cx = require('classnames/bind').bind(styles)

class Table extends Component {
    componentWillMount() {
        React.Children.forEach(this.props.children, child => {
            if (child && child.type === Column) {
                this.columns.push({
                    data: child.props.data,
                    className: child.props.className
                })
            }
        })
    }

    render() {
        const { children, source, rowClass } = this.props

        return <table>
            <thead>
                <tr className={cx('table-row', rowClass)}>
                    {React.Children.map(children, child => child && React.cloneElement(child))}
                </tr>
            </thead>
            <tbody>
                {this.columns && source.map((row, rowIndex) => (
                    <tr key={rowIndex} className={cx('table-row', rowClass)}>
                        {this.columns.map((column, columnIndex) => (
                            <td key={`${rowIndex}-${columnIndex}`} 
                                className={cx('table-column', column.className)}>
                                {this.renderColumn(column, row)}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    }

    renderColumn = (column, row) => {
        const dataKey = column.data

        return typeof dataKey === 'function'
            ? dataKey(row)
            : row[column.data]
    }

    columns = []
}

export default Table