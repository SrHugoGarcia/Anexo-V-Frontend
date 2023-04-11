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
            console.log(respuesta)
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

    const obtenerAnexos =async(clienteID,trimestre,paginate)=>{
        try {
          console.log(clienteID+ " " + trimestre+ paginate)
            const respuesta = await servidorAxios({
              method: "GET",
              url: `/seccionII?trimestre=${trimestre}&clienteID=${clienteID}&page=${paginate}`,
              withCredentials: true,
              
            });
            if(respuesta.status == 200){
                console.log(respuesta)

            return {
                error:false,
                data:respuesta.data.data
                }
            }
          } catch (err) {
            console.log(err)
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
                setCargando,
                obtenerAnexos
            }}
        >
            {children}
        </AnexoVContext.Provider>
    )
}

export {AnexoVProvider}

export default AnexoVContext;