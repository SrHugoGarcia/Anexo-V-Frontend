import useCliente from "../../hooks/useCliente";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const EditCliente = ({ cliente }) => {
  const [nombreCliente, setNombreCliente] = useState(cliente.cliente);
  const [ciudad, setCiudad] = useState(cliente.ciudad);
  const { setEditarClient, updateCliente } = useCliente();
  const navigate = useNavigate();

  const regresar = (e) => {
    e.preventDefault();
    setEditarClient(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const datos = {
      _id: cliente._id,
      cliente: nombreCliente,
      ciudad,
      clienteID: cliente.clienteID,
    };
    const { data, error } = await updateCliente(datos);

    if (error) {
      // Manejar el error
    } else {
      console.log("Hola");
      // Redireccionar a la página principal
      navigate("/"); // Reemplaza '/' con la ruta de tu página principal
    }
  };
  return (
    <>
      <div className="space-y-10 divide-y divide-gray-900/10">
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
          <div className="px-4 sm:px-0">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Clientes
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Aqui puedes ver editar algun cliente registrado.
            </p>
          </div>
        </div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="grid grid-cols-1 gap-x-8 gap-y-8 py-10 md:grid-cols-3">
            <div className="px-4 sm:px-0">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Cliente
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Datos generales.
              </p>
            </div>

            <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
              <div className="px-4 py-6 sm:p-8">
                <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="cliente"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Nombre del cliente
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="cliente"
                        id="cliente"
                        value={nombreCliente}
                        onChange={(e) => setNombreCliente(e.target.value)}
                        autoComplete="given-name"
                        className="block w-full pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="ciudad"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Ciudad del cliente
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="ciudad"
                        id="ciudad"
                        value={ciudad}
                        onChange={(e) => setCiudad(e.target.value)}
                        autoComplete="given-name"
                        className="block w-full pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
            <a
              onClick={(e) => regresar(e)}
              className="text-sm font-semibold leading-6 border px-3 py-2 rounded-md text-gray-900 cursor-pointer"
            >
              Cancelar
            </a>
            <button
              type="submit"
              className="rounded-md bg-[#009640] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-900  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditCliente;
