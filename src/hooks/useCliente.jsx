import { useContext  } from "react";
import ClienteContext from "../context/ClienteProvider";

const useCliente = ()=>{
        //Extrae los valores del context para utilizarlos
        return  useContext(ClienteContext)
}

export default useCliente;