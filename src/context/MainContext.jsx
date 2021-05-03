import React, { useState, createContext, useContext} from 'react'

const MainContext = createContext()

export const useMainContext = () => useContext(MainContext)

export const MainDataProvider = ({ children }) => {

    const [data, setData] = useState('hello from context')

    const value = { data, setData }

    return (
        <MainContext.Provider value={value}>
            {children}
        </MainContext.Provider>
    )
}