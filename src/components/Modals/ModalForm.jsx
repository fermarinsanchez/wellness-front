import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { _changeUSDate } from '../../utils/helpers'

export default function ModalForm(props) {



    useEffect(() => {
        if (props.editForm.price) {
            props.setEdit(true)
        }
    }, [props.editForm])

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.edit ? 'Edit Data' : 'Add new data'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Fill the inputs</h4>
                {props.edit && <p><b>Current date: {props.editForm.date}</b></p>}
                <Form onSubmit={props.edit ? props.handleEditData : props.handleSubmitNewData}>
                    <Form.Group>
                        {( !props.edit &&
                            <React.Fragment>
                                <Form.Label>Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    placeholder="Enter a date"
                                    onChange={props.edit ? props.handleChangeEdit : props.handleChangeNew}
                                    name='date'
                                />
                            </React.Fragment>
                        )}
                        <Form.Label>Hours</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter hour"
                            onChange={props.edit ? props.handleChangeEdit : props.handleChangeNew}
                            name='hours'
                            step='any'
                            defaultValue={props.editForm.hours}
                        />
                        <Form.Label>Cosume (Wh)</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter a consume"
                            onChange={props.edit ? props.handleChangeEdit : props.handleChangeNew}
                            name='consume'
                            step='any'
                            defaultValue={props.editForm.consume}
                        />
                        <Form.Label>Price (€/KWh)</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter a price"
                            onChange={props.edit ? props.handleChangeEdit : props.handleChangeNew}
                            name='price'
                            step='any'
                            defaultValue={props.editForm.price}
                        />
                        <Form.Label>Cost per hour (€)</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter a CPH"
                            onChange={props.edit ? props.handleChangeEdit : props.handleChangeNew}
                            name='costPerHour'
                            step='any'
                            defaultValue={props.editForm.costPerHour}
                        />
                    </Form.Group>
                    <div className='d-flex flex-row-reverse'>
                        <Button className='btn btn-primary btn-lg mt-3' type="submit">
                            Submit
                    </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
