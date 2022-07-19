import React, { createContext, useContext, useEffect, useState } from "react";

const CountContext = createContext([2, (int: number) => { }]);

export function CountProvider({ children }: any) {
    return (
        <CountContext.Provider value={useState(0)}>
            {children}
        </CountContext.Provider>
    );
}

export function useCount() {
    return useContext(CountContext);
}