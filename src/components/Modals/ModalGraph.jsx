import React, { useEffect, useState } from 'react'
import { Form, Modal } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';

export default function ModalGraph(props) {

    const hoursMapped = props.oneRange.map(elem => {
        return elem?.hours
    })

    const consumeMapped = props.oneRange.map(elem => {
        return elem?.consume
    })

    const priceMapped = props.oneRange.map(elem => {
        return elem?.price
    })

    const costMapped = props.oneRange.map(elem => {
        return elem?.costPerHour
    })

    const data = {
        labels: [...hoursMapped],
        datasets: [
            {
                label: '# Consume kw/h',
                data: [...consumeMapped],
                fill: false,
                backgroundColor: [
                    '#45a940',
                    '#45a940'
                ],
                borderColor: '#45a940',
                yAxisID: 'y-axis-1',
            },
            {
                label: '# Price €/kwh',
                data: [...priceMapped],
                fill: false,
                backgroundColor: [
                    '#1187ab',
                    '#1187ab'
                ],
                borderColor: '#1187ab',
                yAxisID: 'y-axis-1',
            },
            {
                label: '# Cost per hour €',
                data: [...costMapped],
                fill: false,
                backgroundColor: [
                    '#b4cb25',
                    '#b4cb25'
                ],
                borderColor: '#b4cb25',
                yAxisID: 'y-axis-1',
            },
        ],
    };

    let delayed
    const options = {
        animation: {
            onComplete: () => {
                delayed = true;
            },
            delay: (context) => {
                let delay = 0;
                if (context.type === 'data' && context.mode === 'default' && !delayed) {
                    delay = context.dataIndex * 100 + context.datasetIndex * 100;
                }
                return delay;
            },
        },
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                    type: 'linear',
                    display: false,
                    position: 'left',
                    id: 'y-axis-1',
                },                
            ],
        },
    }

    const handleDateGraph = (e) => {
        props.setOneDate(e.target.value)
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Select a day to view graphics:
                    <Form.Control
                        type="date"
                        placeholder="Enter a date"
                        onChange={handleDateGraph}
                        name='date'
                        defaultValue={props.oneDate}
                        // min={props.oneRange[0]?.date}
                        // max={props.oneRange[props.oneRange.length-1]?.date}
                        min="2018-12-01"
                        max="2019-02-28"
                    />
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Line data={data} options={options} />
            </Modal.Body>
        </Modal>
    );
}
