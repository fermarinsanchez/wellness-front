import { useState, useEffect } from 'react'
import { _dateFormat } from '../utils/_dateFormat'

const GetDataHook = (Fn, params) => {

    const [state, setState] = useState({
        isLoading: true,
        data: null
    })

    useEffect(() => {
        Fn(params)
            .then(async (data) => {
                data?.map(async (elem) => {
                    elem.date = await _dateFormat(elem?.date)
                    return elem
                })
                setState({
                    isLoading: false,
                    data
                }) 
            })
            .catch(e => console.log(e))
        return () => { }
    }, [Fn, params])

    return {
        isLoading: state.isLoading,
        data: state.data
    }

}

export default GetDataHook


