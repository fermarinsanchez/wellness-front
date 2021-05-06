import React, { useState } from 'react'
import { deleteData } from '../../services/Api'
import ReactPaginate from 'react-paginate'
import { Table, Button } from 'react-bootstrap';
import './DataTable.css'

const PER_PAGE = 10

const DataTable = (props) => {

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
        .map((item, index) => {
            return (
                <tr key={index}>
                    <th scope="row">{item.date}</th>
                    <td>{item.hours}</td>
                    <td>{item.consume}</td>
                    <td>{item.price}</td>
                    <td>{item.costPerHour}</td>
                    <td>
                        <div style={{ width: "300px" }}>
                            <Button className='btn btn-primary' size='sm' item={item} onClick={() => handleEditClick(item)}>Edit</Button>

                            <Button className='btn btn-danger ml-2' size='sm' onClick={() => deleteItem(item.id)}>Del</Button>
                        </div>
                    </td>
                </tr>
            )
        })

    const pageCount = Math.ceil(props.items?.length / PER_PAGE)

    const deleteItem = id => {
        let confirmDelete = window.confirm('If you confirm this action, this row will be deleted. Are you sure?')
        if (confirmDelete) {
            deleteData(id)
            props.deleteItemFromState(id)
        }
    }

    return (
        <React.Fragment>
            <Table responsive='lg' striped bordered hover>
                <thead className='thead-dark'>
                    <tr>
                        <th className='w-auto'>Date</th>
                        <th className='w-auto'>Hours</th>
                        <th className='w-auto'>Consume (Wh)</th>
                        <th className='w-auto'>Price (€/kWh)</th>
                        <th className='w-auto'>Cost per hour (€)</th>
                        <th className='w-auto'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPageData}
                </tbody>
            </Table>
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
            </React.Fragment>
    )
}

export default DataTable