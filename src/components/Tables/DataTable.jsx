import React, { useState } from 'react'
import { deleteData } from '../../services/Api'
import ReactPaginate from 'react-paginate'
import { Table, Button } from 'react-bootstrap';
import './DataTable.css'

const PER_PAGE = 10

function DataTable(props) {

    const handleEditClick = (item) => {
        props.editData(item)
        props.setModalShow(true)
    }

    const [currentPage, setCurrentPage] = useState(0)

    const handlePageClick = ({ selected: selectedPage }) => {
        setCurrentPage(selectedPage)
    }

    const offset = currentPage * PER_PAGE

    const currentPageData = props.items?.slice(offset, offset + PER_PAGE)
        .map(item => {
            return (
                <tr key={item.id}>
                    <th scope="row">{item.date}</th>
                    <td>{item.hours}</td>
                    <td>{item.consume}</td>
                    <td>{item.price}</td>
                    <td>{item.costPerHour}</td>
                    <td>
                        <div style={{ width: "110px" }}>
                            <Button className='btn btn-primary' size='sm' item={item} onClick={() => handleEditClick(item)}>Edit</Button>

                            <Button className='btn btn-danger ml-2' size='sm' onClick={() => deleteItem(item.id)}>Del</Button>
                        </div>
                    </td>
                </tr>
            )
        })

    const pageCount = Math.ceil(props.items?.length / PER_PAGE)

    const deleteItem = id => {
        let confirmDelete = window.confirm('Delete item forever?')
        if (confirmDelete) {
            deleteData(id)
            props.deleteItemFromState(id)
        }
    }

    return (
        <Table responsive striped bordered hover>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Hours</th>
                    <th>Consume (Wh)</th>
                    <th>Price (€/kWh)</th>
                    <th>Cost per hour (€)</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {currentPageData}
            </tbody>
            <div className='mt-4'>
                <ReactPaginate
                    previousLabel={'<'}
                    nextLabel={'>'}
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination'}
                    previousLinkClassName={'pagination__link'}
                    nextLinkClassName={'pagination__link'}
                    disabledClassName={'pagination__link--disabled'}
                    activeClassName={'pagination__link--active'}
                />
            </div>
        </Table>
    )
}

export default DataTable