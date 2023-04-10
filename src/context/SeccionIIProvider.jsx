import { useState } from "react";
import { createContext } from "react";
import servidorAxios from "../../config/servidorAxios";

//Se utiliza en los hooks
const SeccionIIContext = createContext();

//Children son todos los componentes para que este disponible
//El provider rodea toda la aplicacion en donde vienen los datos
//Toda la informacion que este dentro de return estara disponible en todos los componentes
const SeccionIIProvider = ({children}) =>{
    const [cargando, setCargando] = useState(true);
    const [editar,setEditar] = useState(false)

    const obtenerSeccionesII =async()=>{
        try {
            const respuesta = await servidorAxios({
              method: "GET",
              url: `/seccionII`,
              withCredentials: true,
            });
            console.log(respuesta)
            if(respuesta.data.status === 'successful'){
            return {
                error:false,
                data:respuesta.data
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

    const updateSeccionII =async(data)=>{
      console.log(data)
      try {
          const respuesta = await servidorAxios({
            method: "PATCH",
            url: `/seccionII`,
            withCredentials: true,
            data
          });
          console.log(respuesta)

          if(respuesta.data.status === 'successful'){
          return {
              error:false,
              data:respuesta.data
              }
          }
        } catch (err) {
            return{
              msg: err.response.data.message,
              error: true,
            };
        }
  }

   
    
    return(
        <SeccionIIContext.Provider
            value={{
                obtenerSeccionesII,
                editar,
                setEditar,
                updateSeccionII
            }}
        >
            {children}
        </SeccionIIContext.Provider>
    )
}

export {SeccionIIProvider}

export default SeccionIIContext;