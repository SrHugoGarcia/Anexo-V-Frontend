import { useState } from "react";
import { createContext } from "react";
import servidorAxios from "../../config/servidorAxios";

//Se utiliza en los hooks
const ClienteContext = createContext();

//Children son todos los componentes para que este disponible
//El provider rodea toda la aplicacion en donde vienen los datos
//Toda la informacion que este dentro de return estara disponible en todos los componentes
const ClienteProvider = ({children}) =>{
    const [cargando, setCargando] = useState(true);
    const [editarClient,setEditarClient] = useState(false)

    const obtenerClientes =async(paginate)=>{
        try {
          let respuesta
            if(paginate){
               respuesta = await servidorAxios({
                method: "GET",
                url: `/cliente?page=${paginate}`,
                withCredentials: true,
              });
            }else{
               respuesta = await servidorAxios({
                method: "GET",
                url: `/cliente`,
                withCredentials: true,
              });
            }
           
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

    const updateCliente =async(data)=>{
      console.log(data)
      try {
          const respuesta = await servidorAxios({
            method: "PATCH",
            url: `/cliente`,
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
        <ClienteContext.Provider
            value={{
                obtenerClientes,
                editarClient,
                setEditarClient,
                updateCliente
            }}
        >
            {children}
        </ClienteContext.Provider>
    )
}

export {ClienteProvider}

export default ClienteContext;