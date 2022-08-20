

import React, { useEffect } from 'react'
import { LoggingTypes } from '@shared/types/logging'


function TelemetryListener() {
    //TODO: update the param to include stack trace and other info
    const logException = (detail: unknown) => {
        console.log(detail, 'exception')
    }


    useEffect(() => {
        window.addEventListener(LoggingTypes.EXCEPTION, (e: CustomEventInit) => {
            logException(e?.detail)
        })
    }, [])
    return (
        <></>
    )
}

export default TelemetryListener