import React, { useState } from 'react'
import { deleteData } from '../../services/Api'
import ReactPaginate from 'react-paginate'
import { Table, Button } from 'reactstrap';
import ModalForm from '../Modals/ModalForm'
import './DataTable.css'

const PER_PAGE = 6

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
                            <Button color='primary' item={item} onClick={() => handleEditClick(item)}>Edit</Button>

                            <Button color="danger" onClick={() => deleteItem(item.id)}>Del</Button>
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

    // const items = props.items?.map(item => {
    //     return (
    //         <tr key={item.id}>
    //             <th scope="row">{item.date}</th>
    //             <td>{item.hours}</td>
    //             <td>{item.consume}</td>
    //             <td>{item.price}</td>
    //             <td>{item.costPerHour}</td>
    //             <td>
    //                 <div style={{ width: "110px" }}>
    //                     <ModalForm buttonLabel="Edit" item={item} updateState={props.updateState} />

    //                     <Button color="danger" onClick={() => deleteItem(item.id)}>Del</Button>
    //                 </div>
    //             </td>
    //         </tr>
    //     )
    // })

    return (
        <Table responsive hover>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Hours</th>
                    <th>Consume</th>
                    <th>Price</th>
                    <th>Cost per hour</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {currentPageData}
            </tbody>
            <div>
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