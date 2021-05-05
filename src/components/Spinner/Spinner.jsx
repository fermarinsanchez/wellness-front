import React from 'react'
import './Spinner.css'

export default function Spinner() {
    return (
        <div className='container-spinner'>
            <img src='https://res.cloudinary.com/difhe4gl3/image/upload/v1620128136/assets/wellness_logo_gw87zp.png' className='wellness-logo' alt='Wellness logo'/>
            <h6 className='loading'>Loading...</h6>
        </div>
    )
}
