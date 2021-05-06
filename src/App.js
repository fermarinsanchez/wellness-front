import React, { useState, useEffect, useCallback } from 'react'
import { getAllData, createData, updateData } from './services/Api'
import ModalForm from './components/Modals/ModalForm'
import DataTable from './components/Tables/DataTable'
import { CSVLink } from "react-csv"
import { Button } from 'react-bootstrap'
import { _dateFormat, _onlyOneDay } from './utils/helpers'
import Spinner from './components/Spinner/Spinner'
import ModalGraph from './components/Modals/ModalGraph'

function App() {
  const [items, setItems] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [newData, setNewData] = useState({})
  const [editForm, setEditForm] = useState({})
  const [edit, setEdit] = useState(false)
  const [modalShow, setModalShow] = useState(false);
  const [modalGraphShow, setModalGraphShow] = useState(false);
  const [oneRange, setOneRange] = useState([])
  const [oneDate, setOneDate] = useState('01/12/2018')

  useEffect(() => {
    getAllData()
      .then(data => {
        data.map((elem) => {
          elem.date = _dateFormat(elem?.date)
          return elem
        })
        setItems(data)
        setOneRange(_onlyOneDay(data, oneDate))
        setIsLoading(true)
      })
  }, [setItems, oneDate]);

  const handleChangeNew = (event) => {

    const { name, value } = event.target
console.log(name, value)
    if (event.target.name === 'date') {
      setNewData(prev => {
        return {
          ...prev,
          [name]: value,
        }
      })
    } else {
      setNewData(prev => {
        return {
          ...prev,
          [name]: Number(value),
        }
      })
    }
  }

  const handleChangeEdit = (event) => {

    const { name, value } = event.target

    if (event.target.name === 'date') {
      setEditForm(prev => {
        return {
          ...prev,
          [name]: value,
        }
      })
    } else {
      setEditForm(prev => {
        return {
          ...prev,
          [name]: Number(value),
        }
      })
    }
  }

  const handleSubmitNewData = useCallback((event) => {
    event.preventDefault()
    console.log({newData})
    createData(newData)
      .then(data => {
        getAllData()
          .then(async (data) => {
            data?.map((elem) => {
              elem.date = _dateFormat(elem?.date)
              return elem
            })
            setItems(data)
            setNewData({})
            setModalShow(false)
          })
      })
      .catch(e => console.log(e))

  }, [newData])

  const editData = (data) => {
    setEditForm(data)
  }

  const handleEditData = (event) => {
    event.preventDefault()
    const formData = {}
    formData.hours = editForm.hours
    formData.consume = editForm.consume
    formData.price = editForm.price
    formData.costPerHour = editForm.costPerHour
    updateData(editForm.id, formData)
      .then(() => {
        getAllData()
          .then((data) => {
            data?.map((elem) => {
              elem.date = _dateFormat(elem?.date)
              return elem
            })
            setItems(data)
            setEdit(false)
            setEditForm({})
            setModalShow(false)
          })
      })
  }

  const deleteItemFromState = (id) => {
    const updatedItems = items.filter(item => item.id !== id)
    setItems(updatedItems)
  }

  const handleOnHideModalForm = () => {
    setEditForm({})
    setEdit(false)
    setModalShow(false)
  }

  return (
    <div className="container">
      <div className='row'>
        <div className='col-10'>
          <h1 style={{ margin: "20px 0" }}>Wellness Technical Test</h1>
        </div>
      </div>
      <div className='row'>
        <div className='col-10'>
          {isLoading && <CSVLink
            filename={"db.csv"}
            color="primary"
            style={{ float: "left", marginRight: "10px" }}
            className="btn btn-info"
            data={items}>
            Download CSV
            </CSVLink>}
          <Button variant="success" className='mb-4' onClick={() => setModalShow(true)}>
            Add new data
          </Button>

          <Button variant="info" className='mb-4 ml-2' onClick={() => setModalGraphShow(true)}>
            View Graphics
          </Button>

          <ModalForm
            show={modalShow}
            onHide={handleOnHideModalForm }
            handleChangeNew={handleChangeNew}
            handleChangeEdit={handleChangeEdit}
            handleSubmitNewData={handleSubmitNewData}
            handleEditData={handleEditData}
            editForm={editForm}
            edit={edit}
            setEdit={setEdit}
            newData={newData}
            setNewData={setNewData}
          />
          <ModalGraph
            show={modalGraphShow}
            onHide={() => setModalGraphShow(false)}
            dialogClassName="modal-100w"
            oneRange={oneRange}
            setOneRange={setOneRange}
            setOneDate={setOneDate}
            oneDate={oneDate}
          />
        </div>
      </div>
      <div className='row'>
        <div className='col-12'>
          {isLoading ?
            <DataTable
              items={items}
              deleteItemFromState={deleteItemFromState}
              editData={editData}
              setModalShow={setModalShow}
            />
            :
            <Spinner />}
        </div>
      </div>
    </div>
  )
}

export default App