import { useState, useEffect } from "react";
import useSeccionII from "../../hooks/useSeccionII";
import { useNavigate } from "react-router-dom";

export default function EditComponente({ componente }) {
  const [nombreInstalacion, setNombreInstalacion] = useState(
    componente.nombreInstalacion
  );
  const [idComponente, setIdComponente] = useState(componente.idComponente);
  const [ubicacionInstalacion, setUbicacionInstalacion] = useState(
    componente.ubicacionInstalacion
  );
  const [equipoCritico, setEquipoCritico] = useState(componente.equipoCritico);
  const [inspeccionTecnicaRiesgo, setInspeccionTecnicaRiesgo] = useState(
    componente.inspeccionTecnicaRiesgo
  );
  const [nombrePersonal, setNombrePersonal] = useState(
    componente.nombrePersonal
  );
  const [fechaInicioInspeccion, setFechaInicioInspeccion] = useState("");
  const [horaInicioInspeccion, setHoraInicioInspeccion] = useState(
    componente.horaInicioInspeccion
  );
  const [fechaConclusionInspeccion, setFechaConclusionInspeccion] =
    useState("");
  const [horafinalizacionInspeccion, sethorafinalizacionInspeccion] = useState(
    componente.horafinalizacionInspeccion
  );
  const [temperatura, setTemperatura] = useState(componente.temperatura);
  const [velocidadViento, setVelocidadViento] = useState(
    componente.velocidadViento
  );
  const [instrumentoUtilizado, setInstrumentoUtilizado] = useState(
    componente.instrumentoUtilizado
  );
  const [fechaCalibracion, setFechaCalibracion] = useState("");
  const [desviacionProcedimiento, setDesviacionProcedimiento] = useState(
    componente.desviacionProcedimiento
  );
  const [justificacionDesviacion, setJustificacionDesviacion] = useState(
    componente.justificacionDesviacion
  );
  const [interferenciaDeteccion, setInterferenciaDeteccion] = useState(
    componente.interferenciaDeteccion
  );
  const [concentracionPrevia, setConcentracionPrevia] = useState(
    componente.concentracionPrevia
  );
  const [reparado, setReparado] = useState(componente.reparado);
  const [fechaReparacion, setFechaReparacion] = useState();
  const [horaReparacion, setHoraReparacion] = useState(
    componente.horaReparacion
  );
  const [fechaComprobacionReparacion, setFechaComprobacionReparacion] =
    useState();
  const [horaComprobacionReparacion, setHoraComprobacionReparacion] = useState(
    componente.horaComprobacionReparacion
  );
  const [
    concentracionPosteriorReparacion,
    setConcentracionPosteriorReparacion,
  ] = useState(componente.concentracionPosteriorReparacion);
  const [noReparadofaltaComponentes, setNoReparadofaltaComponentes] = useState(
    componente.noReparadofaltaComponentes
  );
  const [fechaRemisionComponente, setFechaRemisionComponente] = useState();
  const [fechaReperacionComponente, setFechaReperacionComponente] = useState();
  const [fechaRemplazoEquipo, setFechaRemplazoEquipo] = useState();
  const [volumenMetano, setvolumenMetano] = useState(componente.volumenMetano);
  const [fuga, setFuga] = useState(componente.fuga);
  const [observacion, setObservacion] = useState(componente.observacion);
  const [observacionPersonal, setObservacionPersonal] = useState(
    componente.observacionPersonal
  );
  const { updateSeccionII } = useSeccionII();
  const navigate = useNavigate();

  useEffect(() => {
    // Función para convertir la fecha en formato "DD/MM/AAAA" a "AAAA-MM-DD"
    const convertirFechaAFormatoAAAAMMDD = (fecha) => {
      const partes = fecha.split("-");
      if (!partes[1]) {
        const partes2 = fecha.split("/");
        console.log(partes2);
        const dia = partes2[0];
        const mes = partes2[1];
        const anio = partes2[2];
        return `${anio}-${mes}-${dia}`;
      } else {
        console.log(partes);
        const dia = partes[2];
        const mes = partes[1];
        const anio = partes[0];
        return `${anio}-${mes}-${dia}`;
      }
    };

    // Establecer la fecha predeterminada en formato "AAAA-MM-DD"
    if (componente.fechaInicioInspeccion) {
      setFechaInicioInspeccion(
        convertirFechaAFormatoAAAAMMDD(componente.fechaInicioInspeccion)
      );
    }

    if (componente.fechafinalizacionInspeccion) {
      setFechaConclusionInspeccion(
        convertirFechaAFormatoAAAAMMDD(componente.fechafinalizacionInspeccion)
      );
    }
    if (componente.fechaCalibracion) {
      setFechaCalibracion(
        convertirFechaAFormatoAAAAMMDD(componente.fechaCalibracion)
      );
    }
    if (componente.fechaReparacion) {
      setFechaReparacion(
        convertirFechaAFormatoAAAAMMDD(componente.fechaReparacion)
      );
    }

    if (componente.fechaComprobacionReparacion) {
      setFechaComprobacionReparacion(
        convertirFechaAFormatoAAAAMMDD(componente.fechaComprobacionReparacion)
      );
    }

    if (componente.fechaRemisionComponente) {
      setFechaRemisionComponente(
        convertirFechaAFormatoAAAAMMDD(componente.fechaRemisionComponente)
      );
    }
    if (componente.fechaReparacionComponente) {
      setFechaReperacionComponente(
        convertirFechaAFormatoAAAAMMDD(componente.fechaReperacionComponente)
      );
    }

    if (componente.fechaRemplazoEquipo) {
      setFechaRemplazoEquipo(
        convertirFechaAFormatoAAAAMMDD(componente.fechaRemplazoEquipo)
      );
    }
  }, []);

  console.log(componente);
  const { setEditar } = useSeccionII();
  const regresar = (e) => {
    e.preventDefault();
    setEditar(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("ola");
    const datos = {
      nombreInstalacion,
      idComponente,
      ubicacionInstalacion,
      equipoCritico,
      inspeccionTecnicaRiesgo,
      nombrePersonal,
      fechaInicioInspeccion: fechaInicioInspeccion ? fechaInicioInspeccion : "",
      horaInicioInspeccion,
      fechafinalizacionInspeccion: fechaConclusionInspeccion
        ? fechaConclusionInspeccion
        : "",
      horafinalizacionInspeccion,
      temperatura,
      velocidadViento,
      instrumentoUtilizado,
      fechaCalibracion: fechaCalibracion ? fechaCalibracion : "",
      desviacionProcedimiento,
      justificacionDesviacion,
      interferenciaDeteccion,
      concentracionPrevia,
      reparado,
      trimestre: componente.trimestre,
      fechaReparacion: fechaReparacion ? fechaReparacion : "",
      horaReparacion,
      fechaComprobacionReparacion: fechaComprobacionReparacion
        ? fechaComprobacionReparacion
        : "",
      horaComprobacionReparacion,
      concentracionPosteriorReparacion,
      noReparadofaltaComponentes,
      fechaRemisionComponente: fechaRemisionComponente
        ? fechaRemisionComponente
        : "",
      fechaReperacionComponente: fechaReperacionComponente
        ? fechaReperacionComponente
        : "",
      fechaRemplazoEquipo: fechaRemplazoEquipo ? fechaRemplazoEquipo : "",
      volumenMetano,
      fuga,
      observacion,
      observacionPersonal,
      anexoID: componente.anexoID,
    };
    const { data, error } = await updateSeccionII(datos);

    if (error) {
      // Manejar el error
    } else {
      console.log("Hola");
      // Redireccionar a la página principal
      navigate("/"); // Reemplaza '/' con la ruta de tu página principal
    }
  };
  //fuga, observacion, observacionPersonal trimestre
  console.log(componente.fechaInicioInspeccion);
  return (
    <div className="space-y-10 divide-y divide-gray-900/10">
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
        <div className="px-4 sm:px-0">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Anexo V
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Aqui puedes editar la informacion que va a parecer en el anexo V.
          </p>
        </div>
      </div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
          <div className="px-4 sm:px-0">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Seccion I
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
                    htmlFor="instalacion"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Nombre de la Instalacion
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="instalacion"
                      id="instalacion"
                      value={nombreInstalacion}
                      onChange={(e) => setNombreInstalacion(e.target.value)}
                      autoComplete="given-name"
                      className="block w-full rounded-md pl-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="id-componente"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Id y tipo de equipo a Componente
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="id-componente"
                      id="id-componente"
                      value={idComponente}
                      onChange={(e) => {
                        setIdComponente(e.target.value);
                      }}
                      autoComplete="family-name"
                      className="block w-full rounded-md pl-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="ubicacionInstalacion"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Ubicacion de la Instalacion
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="ubicacionInstalacion"
                      id="ubicacionInstalacion"
                      value={ubicacionInstalacion}
                      onChange={(e) => setUbicacionInstalacion(e.target.value)}
                      autoComplete="given-name"
                      className="block w-full rounded-md pl-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Equipo Critico
                  </label>
                  <div className="mt-2">
                    <select
                      id="country"
                      name="country"
                      defaultValue={equipoCritico}
                      onChange={(e) => setEquipoCritico(e.target.value)}
                      autoComplete="country-name"
                      className="block w-full rounded-md pl-3 border-0 py-1.5  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option>Si</option>
                      <option>No</option>
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Inspeccion Tecnica del Riesgo
                  </label>
                  <div className="mt-2">
                    <select
                      id="country"
                      name="country"
                      defaultValue={inspeccionTecnicaRiesgo}
                      onChange={(e) =>
                        setInspeccionTecnicaRiesgo(e.target.value)
                      }
                      autoComplete="country-name"
                      className="block w-full rounded-md pl-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option>Si</option>
                      <option>No</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
          <div className="px-4 sm:px-0">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Sección II
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Detalle de las acciones del programa de Detección y Reparacion de
              Fugas.
            </p>
          </div>

          <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
            <div className="px-4 py-6 sm:p-8">
              <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="nombrePersonal"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Nombre del personal
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="nombrePersonal"
                      id="nombrePersonal"
                      value={nombrePersonal}
                      onChange={(e) => setNombrePersonal(e.target.value)}
                      autoComplete="given-name"
                      className="block w-full rounded-md pl-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="fechaInicioInspeccion"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Fecha de inicio de la inspección técnica
                  </label>
                  <div className="mt-2">
                    <input
                      type="date"
                      name="fechaInicioInspeccion"
                      id="fechaInicioInspeccion"
                      value={fechaInicioInspeccion} // Utilizar el valor del estado para establecer la fecha predeterminada
                      onChange={(e) => setFechaInicioInspeccion(e.target.value)}
                      autoComplete="family-name"
                      className="block w-full rounded-md pl-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="horaInicioInspeccion"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Hora de inicio de la inspección técnica
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="horaInicioInspeccion"
                      id="horaInicioInspeccion"
                      value={horaInicioInspeccion}
                      onChange={(e) => setHoraInicioInspeccion(e.target.value)}
                      autoComplete="given-name"
                      className="block w-full rounded-md pl-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="fechaConclusionInspeccion"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Fecha de conclusión de la inspección técnica
                  </label>
                  <div className="mt-2">
                    <input
                      type="date"
                      value={fechaConclusionInspeccion}
                      onChange={(e) =>
                        setFechaConclusionInspeccion(e.target.value)
                      }
                      name="fechaConclusionInspeccion"
                      id="fechaConclusionInspeccion"
                      autoComplete="given-name"
                      className="block w-full rounded-md pl-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="horafinalizacionInspeccion"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Hora de conclusión de la inspección técnica
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      value={horafinalizacionInspeccion}
                      onChange={(e) =>
                        sethorafinalizacionInspeccion(e.target.value)
                      }
                      name="horafinalizacionInspeccion"
                      id="horafinalizacionInspeccion"
                      autoComplete="given-name"
                      className="block w-full rounded-md pl-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="temperatura"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Temperatura °C
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      value={temperatura}
                      onChange={(e) => setTemperatura(e.target.value)}
                      name="temperatura"
                      id="temperatura"
                      autoComplete="given-name"
                      className="block w-full rounded-md pl-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="VelocidadViento"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Velocidad del Viento m/s
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      value={velocidadViento}
                      onChange={(e) => setVelocidadViento(e.target.value)}
                      name="VelocidadViento"
                      id="VelocidadViento"
                      autoComplete="given-name"
                      className="block w-full rounded-md pl-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="instrumentoUtilizado"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Instrumento utilizado para la detección
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="instrumentoUtilizado"
                      id="instrumentoUtilizado"
                      value={instrumentoUtilizado}
                      onChange={(e) => setInstrumentoUtilizado(e.target.value)}
                      autoComplete="given-name"
                      className="block w-full rounded-md pl-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="fechaCalibracion"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Fecha de calibración y de prueba del instrumento
                  </label>
                  <div className="mt-2">
                    <input
                      type="date"
                      name="fechaCalibracion"
                      id="fechaCalibracion"
                      value={fechaCalibracion}
                      onChange={(e) => setFechaCalibracion(e.target.value)}
                      autoComplete="given-name"
                      className="block w-full rounded-md pl-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="desviacionProcedimiento"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Desviaciones del procedimiento de inspección técnica
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      value={desviacionProcedimiento}
                      onChange={(e) =>
                        setDesviacionProcedimiento(e.target.value)
                      }
                      name="desviacionProcedimiento"
                      id="desviacionProcedimiento"
                      autoComplete="given-name"
                      className="block w-full rounded-md pl-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="justificacionDesviacion"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Justificación de las desviaciones del procedimiento
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      value={justificacionDesviacion}
                      onChange={(e) =>
                        setJustificacionDesviacion(e.target.value)
                      }
                      name="justificacionDesviacion"
                      id="justificacionDesviacion"
                      autoComplete="given-name"
                      className="block w-full rounded-md pl-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="interferenciaDeteccion"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Interferencias en la detección
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      value={interferenciaDeteccion}
                      onChange={(e) =>
                        setInterferenciaDeteccion(e.target.value)
                      }
                      name="interferenciaDeteccion"
                      id="interferenciaDeteccion"
                      autoComplete="given-name"
                      className="block w-full rounded-md pl-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="concentracionPrevia"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Concentración previa a la reparación(ppm)
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      value={concentracionPrevia}
                      onChange={(e) => setConcentracionPrevia(e.target.value)}
                      name="concentracionPrevia"
                      id="concentracionPrevia"
                      autoComplete="given-name"
                      className="block w-full rounded-md pl-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="reparado"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    ¿Pudo ser reparado?
                  </label>
                  <div className="mt-2">
                    <select
                      id="reparado"
                      defaultValue={reparado}
                      onChange={(e) => setReparado(e.target.value)}
                      name="reparado"
                      autoComplete="reparado-name"
                      className="block w-full rounded-md pl-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option>Si</option>
                      <option>No</option>
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="fechaReparacion"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Fecha de la reparación
                  </label>
                  <div className="mt-2">
                    <input
                      type="date"
                      onChange={(e) => setFechaReparacion(e.target.value)}
                      value={fechaReparacion}
                      name="fechaReparacion"
                      id="fechaReparacion"
                      autoComplete="given-name"
                      className="block w-full rounded-md pl-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="horaReparacion"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Hora de la reparación
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      onChange={(e) => horaReparacion(e.target.value)}
                      value={setHoraReparacion}
                      name="horaReparacion"
                      id="horaReparacion"
                      autoComplete="given-name"
                      className="block w-full rounded-md pl-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="fechaComprobacionReparacion"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Fecha de comprobación de la reparación
                  </label>
                  <div className="mt-2">
                    <input
                      type="date"
                      onChange={(e) =>
                        setFechaComprobacionReparacion(e.target.value)
                      }
                      value={fechaComprobacionReparacion}
                      name="fechaComprobacionReparacion"
                      id="fechaComprobacionReparacion"
                      autoComplete="given-name"
                      className="block w-full rounded-md pl-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="fechaConclusionInspeccion"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Fecha de conclusión de la inspección técnica
                  </label>
                  <div className="mt-2">
                    <input
                      type="date"
                      value={fechaConclusionInspeccion}
                      onChange={(e) =>
                        setFechaConclusionInspeccion(e.target.value)
                      }
                      name="fechaConclusionInspeccion"
                      id="fechaConclusionInspeccion"
                      autoComplete="given-name"
                      className="block w-full rounded-md pl-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="horaComprobacionReparacion"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Hora de comprobación de la reparación
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      value={horaComprobacionReparacion}
                      onChange={(e) =>
                        setHoraComprobacionReparacion(e.target.value)
                      }
                      name="horaComprobacionReparacion"
                      id="horaComprobacionReparacion"
                      autoComplete="given-name"
                      className="block w-full rounded-md pl-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="concentracionPosteriorReparacion"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Concentración posterior a la reparación
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      value={concentracionPosteriorReparacion}
                      onChange={(e) =>
                        setConcentracionPosteriorReparacion(e.target.value)
                      }
                      name="concentracionPosteriorReparacion"
                      id="concentracionPosteriorReparacion"
                      autoComplete="given-name"
                      className="block w-full rounded-md pl-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="noReparadofaltaComponentes"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    ¿No pudo ser reparado por falta de componentes?
                  </label>
                  <div className="mt-2">
                    <select
                      defaultValue={
                        noReparadofaltaComponentes
                          ? noReparadofaltaComponentes
                          : "N/A"
                      }
                      onChange={(e) =>
                        setNoReparadofaltaComponentes(e.target.value)
                      }
                      id="noReparadofaltaComponentes"
                      name="noReparadofaltaComponentes"
                      autoComplete="noReparadofaltaComponentes-name"
                      className="block w-full rounded-md pl-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option>Si</option>
                      <option>No</option>
                      <option>N/A</option>
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="fechaRemisionComponente"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Fecha de remisión o compra del componente
                  </label>
                  <div className="mt-2">
                    <input
                      type="date"
                      value={fechaRemisionComponente}
                      onChange={(e) =>
                        setFechaRemisionComponente(e.target.value)
                      }
                      name="fechaRemisionComponente"
                      id="fechaRemisionComponente"
                      autoComplete="given-name"
                      className="block w-full rounded-md pl-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="fechaReperacionComponente"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Fecha de reparación o compra del componente adquirido
                  </label>
                  <div className="mt-2">
                    <input
                      type="date"
                      value={fechaReperacionComponente}
                      onChange={(e) =>
                        setFechaReperacionComponente(e.target.value)
                      }
                      name="fechaReperacionComponente"
                      id="fechaReperacionComponente"
                      autoComplete="given-name"
                      className="block w-full rounded-md pl-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="fechaRemplazoEquipo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Fecha de reemplazo del equipo sino pudo ser reparado
                  </label>
                  <div className="mt-2">
                    <input
                      type="date"
                      value={fechaRemplazoEquipo}
                      onChange={(e) => setFechaRemplazoEquipo(e.target.value)}
                      name="fechaRemplazoEquipo"
                      id="fechaRemplazoEquipo"
                      autoComplete="given-name"
                      className="block w-full rounded-md pl-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="volumenMetano"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Volumen de metano fugado
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="volumenMetano"
                      id="volumenMetano"
                      value={volumenMetano}
                      onChange={(e) => {
                        setvolumenMetano(e.target.value);
                      }}
                      autoComplete="given-name"
                      className="block w-full rounded-md pl-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="observacion"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Observacion
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      value={observacion}
                      onChange={(e) => setObservacion(e.target.value)}
                      name="observacion"
                      id="observacion"
                      autoComplete="given-name"
                      className="block w-full rounded-md pl-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="observacionPersonal"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    observacionPersonal
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      value={observacionPersonal}
                      onChange={(e) => setObservacionPersonal(e.target.value)}
                      name="observacionPersonal"
                      id="observacionPersonal"
                      autoComplete="given-name"
                      className="block w-full rounded-md pl-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="fuga"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    ¿Hay fuga?
                  </label>
                  <div className="mt-2">
                    <select
                      defaultValue={fuga}
                      onChange={(e) => setFuga(e.target.value)}
                      id="fuga"
                      name="fuga"
                      autoComplete="fuga-name"
                      className="block w-full rounded-md pl-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option>Si</option>
                      <option>No</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
              <a
                onClick={(e) => regresar(e)}
                className="text-sm font-semibold px-3 py-2 border rounded-md cursor-pointer leading-6 text-gray-900"
              >
                Cancelar
              </a>
              <button
                type="submit"
                className="rounded-md bg-[#009640] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
