import React from 'react'
import { useMainContext } from './context/MainContext'
import { Pagination } from 'react-bootstrap'

export default function TablePagination(props) {

    const { data } = useMainContext()

    let items = []
    let active = 1
    for (let number = 1; number <= props.data; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active}>
                {number}
            </Pagination.Item>)
    }


    return (
        <div>
            <Pagination>{items}</Pagination>
        </div>
    )
}
