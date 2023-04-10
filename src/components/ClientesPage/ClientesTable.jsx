import useClientes from "../../hooks/useCliente";
import { useState, useEffect } from "react";
import Modal from "../Modal";
import Alerta from "../Alerta";
import EditCliente from "./EditCliente";
import Loader from "../Loader";
import useSeccionII from "../../hooks/useSeccionII";

export default function clientesTable() {
  const { obtenerClientes, editarClient, setEditarClient } = useClientes();
  const [clientes, setClientes] = useState([]);
  const [clientes2, setClientes2] = useState([]);
  const [alerta, setAlerta] = useState();
  const [menseje, setMensaje] = useState({});
  const [msg, setMsg] = useState({});
  const [buscarCiudad, setBuscarCiudad] = useState("");
  const [cliente, setCliente] = useState();
  const [longitudPalabraCiudad, setLongitudPalabraCiudad] = useState();
  const [longitudPalabraCliente, setLongitudPalabraCliente] = useState();
  const [buscarCliente,setBuscarCliente] = useState("");
  const {editar,setEditar} = useSeccionII()
  useEffect(() => {
    const Clientes = async () => {
      const { error, data } = await obtenerClientes();
      if (error) {
        //alerta
        const msg = { error: true, msg: "Hubo un error, no tienes internet" };
        console.log(msg)
        setMensaje(msg);
        setAlerta(true);
      } else {
        setClientes(data.data);
        setClientes2(data.data)
      }
    };
    Clientes();
   
  }, []);
  useEffect(()=>{
    if(editar || editarClient ){
      setEditar(false)
      setEditarClient(false)
    }
  },[])
  useEffect(() => {
    setBuscarCliente('')
    setLongitudPalabraCiudad(buscarCiudad.length);
    if(buscarCiudad.length==0){
      return setClientes(clientes2);
    }
    if (longitudPalabraCiudad> buscarCiudad.length) {
      const filter = clientes2.filter((el) => {
        return el.ciudad.toLowerCase().includes(buscarCiudad.toLowerCase());
      });
      return setClientes(filter);
    }
    
      const filter = clientes2.filter((el) => {
        return el.ciudad.toLowerCase().includes(buscarCiudad.toLowerCase());
      });
      return setClientes(filter);
   
  }, [buscarCiudad]);
  
  useEffect(() => {
    setBuscarCiudad('')
    setLongitudPalabraCliente(buscarCliente.length);
    if(buscarCliente.length==0){
      return setClientes(clientes2);
    }
    if (longitudPalabraCliente > buscarCliente.length) {
      const filter = clientes2.filter((el) => {
        return el.cliente.toLowerCase().includes(buscarCliente.toLowerCase());
      });
      return setClientes(filter);
    }
    
      const filter = clientes2.filter((el) => {
        return el.cliente.toLowerCase().includes(buscarCliente.toLowerCase());
      });
      return setClientes(filter);
   
  }, [buscarCliente]);

//if(editar) return <Loader/>
  const editarCliente = async (e, cliente) => {
    e.preventDefault();
    setEditarClient(true);
    setCliente(cliente);
  };
  console.log(clientes)
  return (
    <>
      {  editarClient ? (
                <div className="px-4 sm:px-6 lg:px-8">
        <EditCliente cliente={cliente}></EditCliente> </div>
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
                      Busca Unicamente por Ciudad
                    </label>
                    <div className="relative mt-1 flex items-center">
                      <input
                        type="text"
                        name="search"
                        id="search"
                        value={buscarCiudad}
                        placeholder="Ingresa las iniciales de un nombre"
                        onChange={(e) => setBuscarCiudad(e.target.value)}
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
                      Busca unicamente por Cliente
                    </label>
                    <div className="relative mt-1 flex items-center">
                      <input
                        type="text"
                        name="search"
                        id="search"
                        value={buscarCliente}
                        placeholder="Ingresa las iniciales de la buscarCliente"
                        onChange={(e) => setBuscarCliente(e.target.value)}
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
                        ClienteID
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
                        Ciudad
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
                  { clientes &&
                      clientes.map((cliente) => (
                        <tr key={cliente.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                            {cliente.clienteID}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {cliente.cliente}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {cliente.ciudad}
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-0 flex justify-between text-center">
                          <a
                          onClick={e=>editarCliente(e,cliente)}
                                className="text-white text-base font-semibold hover:text-slate-900 text-md border bg-green-600 w-40 rounded-md py-1"
                              >
                                Editar
                              </a>
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
