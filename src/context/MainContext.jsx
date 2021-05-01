import React, { useState, createContext, useCallback, useContext } from 'react'

const MainContext = createContext()

export const useMainContext = () => useContext(useMainContext)

export const MainDataProvider = ({ children }) => {
    const [data, setData] = useState(null)

    const value = { data, setData }

    return (
        <MainContext.Provider value={value}>
            {children}
        </MainContext.Provider>
    )
}