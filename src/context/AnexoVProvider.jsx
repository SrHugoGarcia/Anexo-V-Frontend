import { useState } from "react";
import { createContext } from "react";
import servidorAxios from "../../config/servidorAxios";

//Se utiliza en los hooks
const AnexoVContext = createContext();

//Children son todos los componentes para que este disponible
//El provider rodea toda la aplicacion en donde vienen los datos
//Toda la informacion que este dentro de return estara disponible en todos los componentes
const AnexoVProvider = ({children}) =>{
    const [cargando, setCargando] = useState(false);

    const generarAnexoV =async(idSeccionII)=>{
        try {
            const respuesta = await servidorAxios({
              method: "POST",
              url: `/anexoV`,
              withCredentials: true,
              data:{idSeccionII}
            });
            if(respuesta.data.status === 'successful'){
                setCargando(false)
            return {
                error:false,
                data:respuesta.data
                }
            }
          } catch (err) {
            setCargando(false)
              return{
                msg: "Hay un error con el internet",
                error: true,
              };
          }
    }

   
    
    return(
        <AnexoVContext.Provider
            value={{
                generarAnexoV,
                cargando,
                setCargando
            }}
        >
            {children}
        </AnexoVContext.Provider>
    )
}

export {AnexoVProvider}

export default AnexoVContext;