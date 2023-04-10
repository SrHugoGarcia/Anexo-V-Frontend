import { useContext  } from "react";
import InformeContext from "../context/informeProvider";

const useInforme = ()=>{
        //Extrae los valores del context para utilizarlos
        return  useContext(InformeContext)
}

export default useInforme;