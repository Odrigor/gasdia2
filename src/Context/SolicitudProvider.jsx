import { useState } from "react"
import { SolicitudContext } from "./SolicitudContext"

export const SolicitudProvider = ({ children }) => {

    const [solicitud, setSolicitud] = useState(1);

    return (
        <SolicitudContext.Provider value={{ solicitud, setSolicitud }}>
            { children }
        </SolicitudContext.Provider>
    )
}