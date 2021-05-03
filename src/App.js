import React, { useState, useEffect, useCallback } from 'react'
import { Container, Row, Col, Form } from 'reactstrap'
import { getAllData, createData, updateData } from './services/Api'
import GetDataHook from './hooks/GetDataHook'
import ModalTest from './components/Modals/ModalTest'
import DataTable from './components/Tables/DataTable'
import { CSVLink } from "react-csv"
import { Button } from 'react-bootstrap'
import { _dateFormat } from './utils/_dateFormat'

function App() {

  const { data, isLoading } = GetDataHook(getAllData)
  const [items, setItems] = useState()
  const [newData, SetNewData] = useState({})
  const [tempData, setTempData] = useState({})
  const [modalShow, setModalShow] = React.useState(false);


  useEffect(() => {
    getAllData()
      .then(async (data) => {
        data?.map((elem) => {
          elem.date = _dateFormat(elem?.date)
          return elem
        })
        setItems(data)
      })
  }, [setItems]);


  const handleChange = (event) => {

    const { name, value } = event.target

    if (event.target.name === 'date') {
      SetNewData(prev => {
        return {
          ...prev,
          [name]: value,
        }
      })
    } else {
      SetNewData(prev => {
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
          })
      })
      .catch(e => console.log(e))

  }, [newData])

  const editData = (data) => {
    SetNewData(data)
  }

  const handleEditData = (event) => {
    event.preventDefault()
    const formData = {}
    formData.date = newData.date
    formData.hours = newData.hours
    formData.consume = newData.consume
    formData.price = newData.price
    formData.costPerHour = newData.costPerHour
    console.log(newData.id)
    console.log(formData)
    updateData(newData.id, formData)
      .then(() => {
        getAllData()
          .then(async (data) => {
            data?.map((elem) => {
              elem.date = _dateFormat(elem?.date)
              return elem
            })
            setItems(data)
            
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
    <Container className="App">
      <Row>
        <Col>
          <h1 style={{ margin: "20px 0" }}>CRUD Database</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          {/* <CSVLink
              filename={"db.csv"}
              color="primary"
              style={{float: "left", marginRight: "10px"}}
              className="btn btn-primary"
              data={items}>
              Download CSV
            </CSVLink> */}
          {/* <ModalForm buttonLabel="Add Item" addItemToState={addItemToState}/> */}
          <Button variant="success" onClick={() => setModalShow(true)}>
            Add new data
      </Button>

          <ModalTest
            show={modalShow}
            onHide={() => setModalShow(false)}
            handleChange={handleChange}
            handleSubmitNewData={handleSubmitNewData}
            handleEditData={handleEditData}
            newData={newData}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          {!isLoading ?
            <DataTable
              items={items}
              updateState={updateState}
              deleteItemFromState={deleteItemFromState}
              editData={editData}
              setModalShow={setModalShow}
            /> : null}
        </Col>
      </Row>

    </Container>
  )
}

export default App