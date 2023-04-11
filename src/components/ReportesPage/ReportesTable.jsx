import useSeccionII from "../../hooks/useSeccionII";
import { useState, useEffect } from "react";
import Modal from "../Modal";
import Alerta from "../Alerta";
import Loader from "../Loader";
import useCliente from "../../hooks/useCliente";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  DocumentArrowDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { DocumentMinusIcon } from "@heroicons/react/24/outline";
import { Tooltip } from "@material-tailwind/react";

export default function ReportesTable() {
  const { obtenerSeccionesII, editar, setEditar } = useSeccionII();
  const [seccionesII, setSeccionesII] = useState([]);
  const [seccionesII2, setSeccionesII2] = useState([]);
  const [alerta, setAlerta] = useState();
  const [menseje, setMensaje] = useState({});
  const [msg, setMsg] = useState({});
  const [buscarIdComponente, setBuscarIdComponente] = useState("");
  const [longitudPalabraComponente, setLongitudPalabraComponente] = useState();
  const [longitudPalabraInstalacion, setLongitudPalabraInstalacion] =
    useState();
  const [buscarInstalacion, setBuscarInstalacion] = useState("");
  const { editarClient, setEditarClient } = useCliente();
  const [paginate, setPaginate] = useState(1)

  useEffect(() => {
    const seccionII = async () => {
      const { error, data } = await obtenerSeccionesII(paginate);
      if (error) {
        //alerta
        const msg = { error: true, msg: "Hubo un error, no tienes internet" };
        console.log(msg);
        setMensaje(msg);
        setAlerta(true);
      } else {
        setSeccionesII(data.data.data);
        setSeccionesII2(data.data.data);
      }
    };
    if(paginate==0){
      setPaginate(1)
    }else{
      console.log(paginate)
      seccionII(paginate);
    }
  }, [paginate]);
  useEffect(() => {
    if (editar || editarClient) {
      setEditar(false);
      setEditarClient(false);
    }
  }, []);

  useEffect(() => {
    setBuscarInstalacion("");
    setLongitudPalabraComponente(buscarIdComponente.length);
    if (buscarIdComponente.length == 0) {
      return setSeccionesII(seccionesII2);
    }
    if (longitudPalabraComponente > buscarIdComponente.length) {
      const filter = seccionesII2.filter((el) => {
        return el.idComponente
          .toLowerCase()
          .includes(buscarIdComponente.toLowerCase());
      });
      return setSeccionesII(filter);
    }
    const filter = seccionesII2.filter((el) => {
      return el.idComponente
        .toLowerCase()
        .includes(buscarIdComponente.toLowerCase());
    });
    return setSeccionesII(filter);
  }, [buscarIdComponente]);

  useEffect(() => {
    setBuscarIdComponente("");
    setLongitudPalabraInstalacion(buscarInstalacion.length);
    if (buscarInstalacion.length == 0) {
      return setSeccionesII(seccionesII2);
    }
    if (longitudPalabraInstalacion > buscarInstalacion.length) {
      const filter = seccionesII2.filter((el) => {
        return el.nombreInstalacion
          .toLowerCase()
          .includes(buscarInstalacion.toLowerCase());
      });
      return setSeccionesII(filter);
    }

    const filter = seccionesII2.filter((el) => {
      return el.nombreInstalacion
        .toLowerCase()
        .includes(buscarInstalacion.toLowerCase());
    });
    return setSeccionesII(filter);
  }, [buscarInstalacion]);
  const aumentarPaginate=(e)=>{
    e.preventDefault()
    if(seccionesII[0]){
      setPaginate(paginate+1)
    }
  }

  const disminuirPaginate=(e)=>{
    e.preventDefault()
    setPaginate(paginate-1)
  }
  if (editar || editarClient) {
    return <Loader />;
  }
  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <Modal mensaje={msg}></Modal>
        {alerta && <Alerta alerta={menseje}></Alerta>}
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Reportes
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              Aqui puedes descargar cualquier informe que requieras.
            </p>
          </div>
        </div>
        <section className="flex justify-between gap-5">
          <div className="flex w-full justify-center py-3 pb-3">
            <div className="w-full ">
              <div className="grid grid-cols-6 gap-6 mt-2">
                <div className="col-span-6  sm:col-span-6 ">
                  <label
                    htmlFor="search"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Busca unicamente por IdComponente:
                  </label>
                  <div className="relative mt-1 flex items-center">
                    <input
                      type="text"
                      name="search"
                      id="search"
                      value={buscarIdComponente}
                      placeholder="Ingresa las iniciales de un IdComponente:"
                      onChange={(e) => setBuscarIdComponente(e.target.value)}
                      className="block w-full  py-2 rounded-md pl-9 shadow-sm border border-[#79b8dd] focus:outline-none focus:ring-2 focus:ring-[#ADD6ED] sm:text-sm"
                    />
                    <div className="absolute inset-y-0 text-gray-500 left-0 flex py-1.5 pl-1.5">
                      <MagnifyingGlassIcon />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full justify-center py-3 pb-3">
            <div className="w-full ">
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
                      placeholder="Ingresa las iniciales de la instalación"
                      onChange={(e) => setBuscarInstalacion(e.target.value)}
                      className="block w-full  py-2 rounded-md pl-9 shadow-sm border border-[#79b8dd] focus:outline-none focus:ring-2 focus:ring-[#ADD6ED] sm:text-sm"
                    />
                    <div className="absolute inset-y-0 text-gray-500 left-0 flex py-1.5 pl-1.5">
                      <MagnifyingGlassIcon />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

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
                      Nombre Instalación
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Ubicacion Instalación
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
                            {componente.informeURL ? (
                              <Tooltip
                                className="bg-slate-900"
                                content="Descargar informe"
                              >
                                <a
                                  href={componente.url}
                                  className="text-white text-base font-semibold hover:text-slate-900 text-md border bg-green-600  px-1 mx-auto mt-1 rounded-md py-1 cursor-pointer"
                                >
                                  <DocumentArrowDownIcon className="w-8" />
                                </a>
                              </Tooltip>
                            ) : (
                              <Tooltip
                                className="bg-slate-900"
                                content="El informe no se ha generado"
                              >
                                <a className="text-white text-base font-semibold hover:text-slate-900 text-md border bg-red-700  px-1 mx-auto mt-1 rounded-md py-1 ">
                                  <DocumentMinusIcon className="w-8" />
                                </a>
                              </Tooltip>
                            )}
                          </>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <nav
                className="flex items-center justify-between border-t border-gray-200 bg-white py-3 "
                aria-label="Pagination"
              >
                <div className="hidden sm:block">
                  <p className="text-sm text-gray-700">
                    Mostrando <span className="font-medium">1</span> {" "}
                    de{" "}
                    <span className="font-medium">{seccionesII.length}</span> resultados
                  </p>
                </div>
                <div className="flex flex-1 justify-between sm:justify-end">
                  <a
                   onClick={e=>disminuirPaginate(e)}
                    className="flex justify-between gap-x-2 relative items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:text-white ring-1 ring-inset ring-gray-300 hover:bg-[#009640] focus-visible:outline-offset-0"
                  >
                    <ArrowLeftIcon className="w-6"/>
                    Anterior
                  </a>
                  <a
                  onClick={e=>aumentarPaginate(e)}
                    className="relative ml-3 flex justify-between gap-x-2 items-center rounded-md bg-white px-3 py-2 text-sm font-semibold hover:text-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-[#009640] focus-visible:outline-offset-0"
                  >
                    Siguiente
                    <ArrowRightIcon className="w-6"/>
                  </a>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
