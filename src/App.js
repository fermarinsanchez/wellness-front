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
  const [modalShow, setModalShow] = useState(false);
  const [modalGraphShow, setModalGraphShow] = useState(false);
  const [oneRange, setOneRange] = useState([])
  const [oneDate, setOneDate] = useState('2018-12-01')

  useEffect(() => {
    getAllData()
      .then(async (data) => {
        await data.map((elem) => {
          elem.date = _dateFormat(elem?.date)
          return elem
        })
        setItems(data)
        setOneRange(_onlyOneDay(data, oneDate))
        setIsLoading(true)
      })
  }, [setItems, oneDate]);

  const handleChange = (event) => {

    const { name, value } = event.target

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

  const handleSubmitNewData = useCallback((event) => {
    event.preventDefault()
    console.log('From Modal Form', newData)
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
    console.log('newData form handler: ', data)
    setNewData(data)
  }

  const handleEditData = (event) => {
    event.preventDefault()
    const formData = {}
    formData.date = newData.date
    formData.hours = newData.hours
    formData.consume = newData.consume
    formData.price = newData.price
    formData.costPerHour = newData.costPerHour
    updateData(newData.id, formData)
      .then(() => {
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
  }

  const updateState = (item) => {
    const itemIndex = items.findIndex(data => data.id === item.id)
    const newArray = [...items.slice(0, itemIndex), item, ...items.slice(itemIndex + 1)]
    setItems(newArray)
  }

  const deleteItemFromState = (id) => {
    const updatedItems = items.filter(item => item.id !== id)
    setItems(updatedItems)
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
          { isLoading && <CSVLink
              filename={"db.csv"}
              color="primary"
              style={{float: "left", marginRight: "10px"}}
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
            onHide={() => setModalShow(false)}
            handleChange={handleChange}
            handleSubmitNewData={handleSubmitNewData}
            handleEditData={handleEditData}
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
          />
        </div>
      </div>
      <div className='row'>
        <div className='col-12'>
          {isLoading ?
            <DataTable
              items={items}
              updateState={updateState}
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