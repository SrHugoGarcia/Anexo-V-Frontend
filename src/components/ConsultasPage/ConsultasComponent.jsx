
import { Fragment, useState,useEffect } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import useSeccionII from "../../hooks/useSeccionII"
import Loader from "../Loader"
import useCliente from "../../hooks/useCliente";
import useAnexoV from "../../hooks/useAnexoV"
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const trimestres =[
  "1","2","3","4"
]

const ConsultasComponent = () => {
  const [open, setOpen] = useState(false);
  const {setEditar, editar} =   useSeccionII()
  const {setEditarClient, editarClient,obtenerClientes} = useCliente();
  const [ clientes,setClientes ] = useState();
  const [cliente, setCliente] = useState()
  const [trimestre, setTrimestre] = useState()
  const [anexos, setAnexos] = useState()
  const { obtenerAnexos } = useAnexoV();
  const [activeTrimestre, setActiveTrimestre] = useState(false)
  const [activeCliente, setActiveCliente] = useState(true)

  useEffect(()=>{
    if(editar || editarClient){
      setEditar(false)
      setEditarClient(false)
    }
  },[])

  useEffect(()=>{
    const getClientes=async()=>{
      const { error,data } = await obtenerClientes()
      if(error){
       
      }else{
        setClientes(data.data)
      }
    }
   getClientes()
  },[])

  useEffect(()=>{
    const getAnexos =async()=>{
      const { error,data } = await obtenerAnexos(cliente.clienteID,trimestre)
      if(error){

      }else{
        setAnexos(data);
      }
    }
   getAnexos()
  },[trimestre])

    const activarTrimestre =(e)=>{
      e.preventDefault();
      if(cliente){
        setActiveTrimestre(true)
        setActiveCliente(false)
      }
    }

    const activarCliente =(e)=>{
        e.preventDefault()
        setActiveTrimestre(false)
        setActiveCliente(true)
    }
  console.log(anexos)
  if(editar || editarClient)return <Loader/>
  return (
    <>
      <div className="mt-10 bg-white pb-12 sm:pb-0">
        <div className="relative">
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <dl className="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-3">
                <div
                                                                  onClick={e=>activarCliente(e)}
                  className=
                    "whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm"
                >
                  <dd className="order-1 text-3xl font-bold tracking-tight text-black">
                    Selecciona
                  </dd>
                  <dt className="order-2 mt-2 text-lg font-medium leading-6 text-black">
                    el cliente
                  </dt>
                </div>
                <div
                                  onClick={e=>activarTrimestre(e)}
                >
                  
                  <dd className="order-1 text-3xl font-bold tracking-tight text-black">
                    Selecciona
                  </dd>
                  <dt className="order-2 mt-2 text-lg font-medium leading-6 text-black">
                    el trimestre
                  </dt>
                </div>
                <div
                >
                  <dd className="order-1 text-3xl font-bold tracking-tight text-black">
                    Ver
                  </dd>
                  <dt className="order-2 mt-2 text-lg font-medium leading-6 text-black">
                    Anexos V
                  </dt>
                </div>
              </dl>
            </div>
            {activeCliente ? 
            <Listbox value={cliente} onChange={setCliente}>
            {({ open }) => (
              <>
                <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">Assigned to</Listbox.Label>
                <div className="relative mt-2">
                  <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    <span className="block truncate">{cliente? cliente.cliente: "Selecciona una opcion"}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
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
                      {clientes && clientes.map((cliente) => (
                        <Listbox.Option
                          key={cliente.clienteID}
                          className={({ active }) =>
                            classNames(
                              active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                              'relative cursor-default select-none py-2 pl-8 pr-4'
                            )
                          }
                          value={cliente}
                        >
                          {({ selected, active }) => (
                            <>
                              <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                {cliente.cliente}
                              </span>

                              {selected ? (
                                <span
                                  className={classNames(
                                    active ? 'text-white' : 'text-indigo-600',
                                    'absolute inset-y-0 left-0 flex items-center pl-1.5'
                                  )}
                                >
                                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
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
          </Listbox>:   <></>}
            
            {activeTrimestre ? <Listbox value={trimestre} onChange={setTrimestre}>
              {({ open }) => (
                <>
                  <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">Assigned to</Listbox.Label>
                  <div className="relative mt-2">
                    <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                      <span className="block truncate">{trimestre? "Trimestre " + trimestre: "Selecciona una opcion"}</span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
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
                        {trimestres && trimestres.map((trimestre) => (
                          <Listbox.Option
                            key={trimestre}
                            className={({ active }) =>
                              classNames(
                                active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                'relative cursor-default select-none py-2 pl-8 pr-4'
                              )
                            }
                            value={trimestre}
                          >
                            {({ selected, active }) => (
                              <>
                                <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                 Trimestre  {trimestre}
                                </span>

                                {selected ? (
                                  <span
                                    className={classNames(
                                      active ? 'text-white' : 'text-indigo-600',
                                      'absolute inset-y-0 left-0 flex items-center pl-1.5'
                                    )}
                                  >
                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
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
            </Listbox>: <> </> }
            
         
          </div>
        </div>
      </div>
    </>
  );
};

export default ConsultasComponent;
