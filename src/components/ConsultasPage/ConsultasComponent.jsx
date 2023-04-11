import { Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/20/solid";
import useSeccionII from "../../hooks/useSeccionII";
import Loader from "../Loader";
import useCliente from "../../hooks/useCliente";
import useAnexoV from "../../hooks/useAnexoV";
import {
  ClipboardDocumentListIcon,
  DocumentPlusIcon,
} from "@heroicons/react/24/outline";
import { Tooltip } from "@material-tailwind/react";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const trimestres = ["1", "2", "3", "4"];

const ConsultasComponent = () => {
  const [open, setOpen] = useState(false);
  const { setEditar, editar } = useSeccionII();
  const { setEditarClient, editarClient, obtenerClientes } = useCliente();
  const [clientes, setClientes] = useState();
  const [cliente, setCliente] = useState();
  const [trimestre, setTrimestre] = useState();
  const [anexos, setAnexos] = useState();
  const { obtenerAnexos } = useAnexoV();
  const [activeTrimestre, setActiveTrimestre] = useState(false);
  const [activeCliente, setActiveCliente] = useState(true);
  const [activeAnexos, setActiveAnexos] = useState(false);

  useEffect(() => {
    if (editar || editarClient) {
      setEditar(false);
      setEditarClient(false);
    }
  }, []);

  useEffect(() => {
    const getClientes = async () => {
      const { error, data } = await obtenerClientes();
      if (error) {
      } else {
        setClientes(data.data);
      }
    };
    getClientes();
  }, []);

  useEffect(() => {
    const getAnexos = async () => {
      const { error, data } = await obtenerAnexos(cliente.clienteID, trimestre);
      if (error) {
      } else {
        setAnexos(data);
      }
    };
    getAnexos();
  }, [trimestre]);

  const activarCliente = (e) => {
    e.preventDefault();
    setActiveTrimestre(false);
    setActiveCliente(true);
    setActiveAnexos(false);
  };

  const activarTrimestre = (e) => {
    e.preventDefault();
    if (cliente) {
      setActiveTrimestre(true);
      setActiveCliente(false);
      setActiveAnexos(false);
    }
  };

  const activarAnexos = (e) => {
    e.preventDefault();
    if (cliente && trimestre) {
      setActiveTrimestre(false);
      setActiveCliente(false);
      setActiveAnexos(true);
    }
  };

  console.log(anexos);
  if (editar || editarClient) return <Loader />;
  return (
    <>
      <div className=" bg-white pb-12 sm:pb-0">
        <div className="relative">
          <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
            <section className="sm:flex sm:items-center mb-3">
              <div className="sm:flex-auto">
                <h2 className="text-base font-semibold leading-6 text-gray-900">
                  Consultas
                </h2>
                <p className="mt-2 text-sm text-gray-700">
                  Aqui puedes realizar una consulta específica.
                </p>
              </div>
            </section>
            <div className="mx-auto ">
              <dl className="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-3">
                <div
                  onClick={(e) => activarCliente(e)}
                  className="whitespace-nowrap cursor-pointer bg-[#009641de] text-center text-white py-4 px-1 border-b-2 font-medium text-sm"
                >
                  <dd className="order-1 text-3xl font-bold tracking-tight">
                    Selecciona
                  </dd>
                  <dt className="order-2 mt-2 text-lg font-medium leading-6 ">
                    el cliente
                  </dt>
                </div>
                <div
                  className="whitespace-nowrap cursor-pointer bg-[#009640] text-center text-white py-4 px-1 border-b-2 font-medium text-sm"
                  onClick={(e) => activarTrimestre(e)}
                >
                  <dd className="order-1 text-3xl font-bold tracking-tight ">
                    Selecciona
                  </dd>
                  <dt className="order-2 mt-2 text-lg font-medium leading-6 ">
                    el trimestre
                  </dt>
                </div>
                <div
                  onClick={(e) => activarAnexos(e)}
                  className="whitespace-nowrap cursor-pointer bg-black text-center py-4 text-white px-1 border-b-2 font-medium text-sm"
                >
                  <dd className="order-1 text-3xl font-bold tracking-tight ">
                    Ver
                  </dd>
                  <dt className="order-2 mt-2 text-lg font-medium leading-6 ">
                    Anexos V
                  </dt>
                </div>
              </dl>
            </div>
            {activeCliente ? (
              <Listbox value={cliente} onChange={setCliente}>
                {({ open }) => (
                  <>
                    <Listbox.Label className="block mt-3 text-sm font-medium leading-6 text-gray-900">
                      Cliente:
                    </Listbox.Label>
                    <p className="mt-2 text-sm text-gray-700">
                      Selecciona un cliente:
                    </p>
                    <div className="relative mt-2">
                      <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-[#79b8dd] focus:outline-none focus:ring-2 focus:ring-[#ADD6ED] sm:text-sm sm:leading-6">
                        <span className="block truncate">
                          {cliente ? cliente.cliente : "Selecciona una opción"}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <ChevronUpDownIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>

                      <Transition
                        show={open}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {clientes &&
                            clientes.map((cliente) => (
                              <Listbox.Option
                                key={cliente.clienteID}
                                className={({ active }) =>
                                  classNames(
                                    active
                                      ? "bg-gray-300 text-gray-900"
                                      : "text-gray-900",
                                    "relative cursor-default select-none py-2 pl-8 pr-4"
                                  )
                                }
                                value={cliente}
                              >
                                {({ selected, active }) => (
                                  <>
                                    <span
                                      className={classNames(
                                        selected
                                          ? "font-semibold"
                                          : "font-normal",
                                        "block truncate"
                                      )}
                                    >
                                      {cliente.cliente}
                                    </span>

                                    {selected ? (
                                      <span
                                        className={classNames(
                                          active
                                            ? "text-white"
                                            : "text-green-600",
                                          "absolute inset-y-0 left-0 flex items-center pl-1.5"
                                        )}
                                      >
                                        <CheckIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </>
                )}
              </Listbox>
            ) : (
              <></>
            )}

            {activeTrimestre ? (
              <Listbox value={trimestre} onChange={setTrimestre}>
                {({ open }) => (
                  <>
                    <Listbox.Label className="block text-sm mt-3 font-medium leading-6 text-gray-900">
                      Trimestre:
                    </Listbox.Label>
                    <p className="mt-2 text-sm text-gray-700">
                      Selecciona un trimestre:
                    </p>
                    <div className="relative mt-2">
                      <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-[#79b8dd] focus:outline-none focus:ring-2 focus:ring-[#ADD6ED] sm:text-sm sm:leading-6">
                        <span className="block truncate">
                          {trimestre
                            ? "Trimestre " + trimestre
                            : "Selecciona una opcion"}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <ChevronUpDownIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>

                      <Transition
                        show={open}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {trimestres &&
                            trimestres.map((trimestre) => (
                              <Listbox.Option
                                key={trimestre}
                                className={({ active }) =>
                                  classNames(
                                    active
                                      ? "bg-gray-300 text-gray-900"
                                      : "text-gray-900",
                                    "relative cursor-default select-none py-2 pl-8 pr-4"
                                  )
                                }
                                value={trimestre}
                              >
                                {({ selected, active }) => (
                                  <>
                                    <span
                                      className={classNames(
                                        selected
                                          ? "font-semibold"
                                          : "font-normal",
                                        "block truncate"
                                      )}
                                    >
                                      Trimestre {trimestre}
                                    </span>

                                    {selected ? (
                                      <span
                                        className={classNames(
                                          active
                                            ? "text-white"
                                            : "text-indigo-600",
                                          "absolute inset-y-0 left-0 flex items-center pl-1.5"
                                        )}
                                      >
                                        <CheckIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </>
                )}
              </Listbox>
            ) : (
              <> </>
            )}

            {activeAnexos ? (
              <>
                <table
                  value={anexos}
                  onChange={setAnexos}
                  className="min-w-full divide-y divide-gray-300 mt-4"
                >
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
                    <tr>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        a
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        b
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        c
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        d
                      </td>
                      <td className="flex justify-between items-center">
                        <>
                          <Tooltip
                            className="bg-slate-900"
                            content="Crear anexo"
                          >
                            <a
                              onClick={(e) =>
                                crearAnexoV(e, componente.anexoID)
                              }
                              className="text-white text-base font-semibold hover:text-slate-900 text-md border bg-green-600  px-1 mx-auto mt-1 rounded-md py-1 cursor-pointer"
                            >
                              <DocumentPlusIcon className="w-8" />
                            </a>
                          </Tooltip>
                          <Tooltip
                            className="bg-slate-900"
                            content="Crear informe"
                          >
                            <a
                              onClick={(e) =>
                                crearInforme(e, componente.anexoID)
                              }
                              className="text-white text-base font-semibold hover:text-slate-900 text-md border bg-yellow-600  px-1 mx-auto mt-1 rounded-md py-1 cursor-pointer"
                            >
                              <ClipboardDocumentListIcon className="w-8" />
                            </a>
                          </Tooltip>
                        </>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <nav
                  className="flex items-center justify-between border-t border-gray-200 bg-white py-3 "
                  aria-label="Pagination"
                >
                  <div className="hidden sm:block">
                    <p className="text-sm text-gray-700">
                      Mostrando <span className="font-medium">1</span> a{" "}
                      <span className="font-medium">10</span> de{" "}
                      <span className="font-medium">20</span> resultados
                    </p>
                  </div>
                  <div className="flex flex-1 justify-between sm:justify-end">
                    <a
                      href="#"
                      className="flex justify-between gap-x-2 relative items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:text-white ring-1 ring-inset ring-gray-300 hover:bg-[#009640] focus-visible:outline-offset-0"
                    >
                      <ArrowLeftIcon className="w-6" />
                      Anterior
                    </a>
                    <a
                      href="#"
                      className="relative ml-3 flex justify-between gap-x-2 items-center rounded-md bg-white px-3 py-2 text-sm font-semibold hover:text-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-[#009640] focus-visible:outline-offset-0"
                    >
                      Siguiente
                      <ArrowRightIcon className="w-6" />
                    </a>
                  </div>
                </nav>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ConsultasComponent;
