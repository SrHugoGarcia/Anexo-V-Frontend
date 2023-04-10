import { useContext  } from "react";
import AnexoVContext from "../context/AnexoVProvider";

const useAnexoV = ()=>{
        //Extrae los valores del context para utilizarlos
        return  useContext(AnexoVContext)
}

export default useAnexoV;