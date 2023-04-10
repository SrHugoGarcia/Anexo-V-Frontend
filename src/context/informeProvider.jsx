import { useState } from "react";
import { createContext } from "react";
import servidorAxios from "../../config/servidorAxios";
import useAnexoV from "../hooks/useAnexoV";

//Se utiliza en los hooks
const InformeContext = createContext();

//Children son todos los componentes para que este disponible
//El provider rodea toda la aplicacion en donde vienen los datos
//Toda la informacion que este dentro de return estara disponible en todos los componentes
const InformeProvider = ({children}) =>{
    const { setCargando } = useAnexoV()
    const generarInforme =async(idSeccionII)=>{
        try {
            const respuesta = await servidorAxios({
              method: "POST",
              url: `/anexoV/informe`,
              withCredentials: true,
              data:{idSeccionII}
            });
            console.log(respuesta)
            if(respuesta.data.status === 'successful'){
                setCargando(false)
            return {
                error:false,
                data:respuesta.data
                }
            }
          } catch (err) {
            console.log(err)
            setCargando(false)
              return{
                msg: "Hay un error con el internet",
                error: true,
              };
          }
    }

   
    
    return(
        <InformeContext.Provider
            value={{
                generarInforme,
                
            }}
        >
            {children}
        </InformeContext.Provider>
    )
}

export {InformeProvider}

export default InformeContext;