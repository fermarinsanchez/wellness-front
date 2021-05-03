import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';

export default function ModalTest(props) {

    const [edit, setEdit] = useState(false)

    useEffect(() => {
        if (props.newData.price) {
            setEdit(true)
        }
    }, [props.newData])

    console.log({edit})
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                   {props.newData ? 'Edit Data' : 'Add new data'} 
          </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Fill the inputs</h4>
                <Form onSubmit={edit ? props.handleEditData : props.handleSubmitNewData }>
                    <Form.Group>
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                            type="date"
                            placeholder="Enter a date"
                            onChange={props.handleChange}
                            name='date'
                            defaultValue={props.newData.date}
                        />
                        <Form.Label>Hours</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter hour"
                            onChange={props.handleChange}
                            name='hours'
                            step='any'
                            defaultValue={props.newData.hours}
                        />
                        <Form.Label>Cosume</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter a consume"
                            onChange={props.handleChange}
                            name='consume'
                            step='any'
                            defaultValue={props.newData.consume}
                        />
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter a price"
                            onChange={props.handleChange}
                            name='price'
                            step='any'
                            defaultValue={props.newData.price}
                        />
                        <Form.Label>Cost per hour</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter a CPH"
                            onChange={props.handleChange}
                            name='costPerHour'
                            step='any'
                            defaultValue={props.newData.costPerHour}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}
