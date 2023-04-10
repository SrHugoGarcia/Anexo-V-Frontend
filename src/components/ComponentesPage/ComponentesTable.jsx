import useSeccionII from "../../hooks/useSeccionII";
import useAnexoV from "../../hooks/useAnexoV";
import { useState, useEffect } from "react";
import useInforme from "../../hooks/useInforme";
import Modal from "../Modal";
import Alerta from "../Alerta";
import EditComponente from "./EditComponente";
import Loader from "../Loader";
import useCliente from "../../hooks/useCliente";
export default function ComponentesTable() {
  const { obtenerSeccionesII, editar, setEditar } = useSeccionII();
  const { generarAnexoV, cargando, setCargando } = useAnexoV();
  const { generarInforme } = useInforme();
  const [seccionesII, setSeccionesII] = useState([]);
  const [seccionesII2, setSeccionesII2] = useState([]);
  const [alerta, setAlerta] = useState();
  const [menseje, setMensaje] = useState({});
  const [msg, setMsg] = useState({});
  const [buscarIdComponente, setBuscarIdComponente] = useState("");
  const [componente, setComponente] = useState();
  const [longitudPalabraComponente, setLongitudPalabraComponente] = useState();
  const [longitudPalabraInstalacion, setLongitudPalabraInstalacion] = useState();
  const [buscarInstalacion,setBuscarInstalacion] = useState("");
  const {editarClient,setEditarClient} = useCliente()
  console.log(editar)
  useEffect(() => {
    const seccionII = async () => {
      const { error, data } = await obtenerSeccionesII();
      if (error) {

        //alerta
        const msg = { error: true, msg: "Hubo un error, no tienes internet" };
        console.log(msg)
        setMensaje(msg);
        setAlerta(true);
      } else {
        setSeccionesII(data.data);
        setSeccionesII2(data.data)
      }
    };
    seccionII();
    
  }, []);
  useEffect(()=>{
    if(editar || editarClient){
      setEditar(false)
      setEditarClient(false)
    }
  },[])

  useEffect(() => {
    setBuscarInstalacion('')
    setLongitudPalabraComponente(buscarIdComponente.length);
    if(buscarIdComponente.length==0){
      console.log("000000")
      return setSeccionesII(seccionesII2);
    }
    if (longitudPalabraComponente> buscarIdComponente.length) {
      const filter = seccionesII2.filter((el) => {
        return el.idComponente.toLowerCase().includes(buscarIdComponente.toLowerCase());
      });
      return setSeccionesII(filter);
    }
    
    console.log("PASA")
      const filter = seccionesII2.filter((el) => {
        return el.idComponente.toLowerCase().includes(buscarIdComponente.toLowerCase());
      });
      return setSeccionesII(filter);
   
  }, [buscarIdComponente]);
  
  useEffect(() => {
    setBuscarIdComponente('')
    setLongitudPalabraInstalacion(buscarInstalacion.length);
    if(buscarInstalacion.length==0){
      console.log("000000")
      return setSeccionesII(seccionesII2);
    }
    if (longitudPalabraInstalacion > buscarInstalacion.length) {
      const filter = seccionesII2.filter((el) => {
        return el.nombreInstalacion.toLowerCase().includes(buscarInstalacion.toLowerCase());
      });
      return setSeccionesII(filter);
    }
    
    console.log("PASA")
      const filter = seccionesII2.filter((el) => {
        return el.nombreInstalacion.toLowerCase().includes(buscarInstalacion.toLowerCase());
      });
      return setSeccionesII(filter);
   
  }, [buscarInstalacion]);
  const crearAnexoV = async (e, idSeccionII) => {
    e.preventDefault();
    setMsg("Generando Anexo V");
    setCargando(true);
    const { error, data } = await generarAnexoV(idSeccionII);
    if (error) {
      //alerta
      const msg = { error: true, msg: "Hubo un error al generar el anexo V." };
      setMensaje(msg);
    } else {
      const msg = { error: false, msg: "Generado Correctamente" };
      setMensaje(msg);
    }
    setAlerta(true);
  };

  const crearInforme = async (e, idSeccionII) => {
    e.preventDefault();
    setMsg("Generando informe");
    setCargando(true);
    const { error, data } = await generarInforme(idSeccionII);
    if (error) {
      //alerta
      const msg = { error: true, msg: "Hubo un error al generar el informe." };
      setMensaje(msg);
    } else {
      const msg = { error: false, msg: "Generado Correctamente" };
      setMensaje(msg);
    }
  };

  const editarComponente = async (e, componente) => {
    e.preventDefault();
    setEditar(true);
    setComponente(componente);
  };
  if(editarClient)return <Loader/>
  console.log(menseje)
  return (
    <>
      {editar ? (
                <div className="px-4 sm:px-6 lg:px-8">
        <EditComponente componente={componente}></EditComponente> </div>
      ) : (
        <div className="px-4 sm:px-6 lg:px-8">
          <Modal mensaje={msg}></Modal>
          {alerta && <Alerta alerta={menseje}></Alerta>}
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-base font-semibold leading-6 text-gray-900">
                Lista de Registros que se han realizado en el celular
              </h1>
              <p className="mt-2 text-sm text-gray-700">
                Aqui puedes editar la informacion que registraste en el celular
              </p>
            </div>
          </div>
          <div className="flex w-full justify-center py-3 pb-3">
              <div className="w-full max-w-4xl">
                <div className="grid grid-cols-6 gap-6 mt-2">
                  <div className="col-span-6  sm:col-span-6 ">
                    <label
                      htmlFor="search"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Busca unicamente por nombre
                    </label>
                    <div className="relative mt-1 flex items-center">
                      <input
                        type="text"
                        name="search"
                        id="search"
                        value={buscarIdComponente}
                        placeholder="Ingresa las iniciales de un nombre"
                        onChange={(e) => setBuscarIdComponente(e.target.value)}
                        className="block w-full rounded-md border-gray-300 pr-12 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
                      />
                      <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                        <kbd className="inline-flex items-center rounded border border-gray-200 px-2 font-sans text-sm font-medium text-gray-400">
                          ⌘K
                        </kbd>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full justify-center py-3 pb-3">
              <div className="w-full max-w-4xl">
                <div className="grid grid-cols-6 gap-6 mt-2">
                  <div className="col-span-6  sm:col-span-6 ">
                    <label
                      htmlFor="search"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Busca unicamente por Instalacion
                    </label>
                    <div className="relative mt-1 flex items-center">
                      <input
                        type="text"
                        name="search"
                        id="search"
                        value={buscarInstalacion}
                        placeholder="Ingresa las iniciales de la buscarInstalacion"
                        onChange={(e) => setBuscarInstalacion(e.target.value)}
                        className="block w-full rounded-md border-gray-300 pr-12 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
                      />
                      <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                        <kbd className="inline-flex items-center rounded border border-gray-200 px-2 font-sans text-sm font-medium text-gray-400">
                          ⌘K
                        </kbd>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                      >
                        idComponente
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Cliente
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Nombre Instalacion
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Ubicacion Instalacion
                      </th>
                      <th
                        scope="col"
                        className="relative text-sm py-3.5 pl-3 pr-4 sm:pr-0"
                      >
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {seccionesII &&
                      seccionesII.map((componente) => (
                        <tr key={componente.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                            {componente.idComponente}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {componente.clienteID}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {componente.nombreInstalacion}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {componente.ubicacionInstalacion}
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-0 flex justify-between text-center">
                            <>
                              <a
                                onClick={(e) => editarComponente(e, componente)}
                                className="text-white text-base font-semibold hover:text-slate-900 text-md border bg-blue-600 w-1/5 px-1 rounded-md py-1"
                              >
                                Editar
                              </a>
                              <a
                                onClick={(e) =>
                                  crearAnexoV(e, componente.anexoID)
                                }
                                className="text-white text-base font-semibold hover:text-slate-900 text-md border bg-green-600 w-40 rounded-md py-1"
                              >
                                Generar Anexo V
                              </a>
                              <a
                                onClick={(e) =>
                                  crearInforme(e, componente.anexoID)
                                }
                                className="text-white text-base font-semibold hover:text-slate-900 text-md border bg-yellow-600 w-1/3 rounded-md py-1"
                              >
                                Generar Reporte
                              </a>
                            </>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
