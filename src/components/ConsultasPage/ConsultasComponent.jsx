import { Listbox, Transition, Dialog } from "@headlessui/react";
import { useState, useEffect, Fragment,useRef } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import useSeccionII from "../../hooks/useSeccionII"
import Loader from "../Loader"
import useCliente from "../../hooks/useCliente";
const ConsultasComponent = () => {
  const [open, setOpen] = useState(false);

  const {setEditar, editar} =   useSeccionII()
  const {setEditarClient, editarClient} = useCliente();
  useEffect(()=>{
    if(editar || editarClient){
      setEditar(false)
      setEditarClient(false)
    }
  },[])
  if(editar || editarClient)return <Loader/>

  return (
    <>
      <div className="mt-10 bg-white pb-12 sm:pb-0">
        <div className="relative">
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <dl className="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-3">
                <div
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
                <div>
                  <dd className="order-1 text-3xl font-bold tracking-tight text-black">
                    Selecciona
                  </dd>
                  <dt className="order-2 mt-2 text-lg font-medium leading-6 text-black">
                    el trimestre
                  </dt>
                </div>
                <div>
                  <dd className="order-1 text-3xl font-bold tracking-tight text-black">
                    Ver
                  </dd>
                  <dt className="order-2 mt-2 text-lg font-medium leading-6 text-black">
                    Anexos V
                  </dt>
                </div>
              </dl>
            </div>

            <div className="mx-auto max-w-4xl">
              <Listbox>
                <Listbox.Label className="  text-sm font-medium text-[#535766]">
                  Escoge el cliente:
                </Listbox.Label>
                <div className="relative mt-2">
                  <Listbox.Button className="relative w-full border bg-white py-3  px-6 text-leftborder border-gray-300  shadow-sm focus:border-amber-500 focus:text-black placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-amber-500 sm:text-sm focus:shadow-amber-400 focus:shadow-md hover:duration-700">
                    <span className="flex items-center">
                      <span className="ml-3 block truncate">
                      Selecciona una opción
                      </span>
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
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
                    <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"></Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>

            <div className="mx-auto max-w-4xl">
              <Listbox>
                <Listbox.Label className="  text-sm font-medium text-[#535766]">
                  Escoge el trimestre:
                </Listbox.Label>
                <div className="relative mt-2">
                  <Listbox.Button className="relative w-full border bg-white py-3  px-6 text-leftborder border-gray-300  shadow-sm focus:border-amber-500 focus:text-black placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-amber-500 sm:text-sm focus:shadow-amber-400 focus:shadow-md hover:duration-700">
                    <span className="flex items-center">
                      <span className="ml-3 block truncate">
                      Selecciona una opción
                      </span>
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
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
                    <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"></Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default ConsultasComponent;
