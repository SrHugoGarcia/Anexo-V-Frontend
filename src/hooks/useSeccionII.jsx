import { useContext  } from "react";
import SeccionIIContext from "../context/SeccionIIProvider";

const useSeccionII = ()=>{
        //Extrae los valores del context para utilizarlos
        return  useContext(SeccionIIContext)
}

export default useSeccionII;