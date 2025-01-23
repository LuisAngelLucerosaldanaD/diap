import {IMode} from "../../models/registration/registration";
import {IMenuItem} from "../../models/ui/menu";

export const MODES: IMode[] = [
  {
    name: 'Modalidad Convenios Especiales',
    value: '2',
    requirements: [
      {
        id: '6',
        name: "Solicitud dirigida al Rector UNAS (Presentar documento fisico)",
        description: "Solicitud dirigida al rector de la unas, asunto \u0022Inscripci\u00f3n al examen de pregrado\u0022, Detalle: \u0022Carrera Profecional priemra y segunda opci\u00f3n\u0022",
        guide: "https:\/\/unasedu-my.sharepoint.com\/:i:\/g\/personal\/iomar_alegre_unas_edu_pe\/EWeWVuAYzdNMo932AxNmzMgBm1UGIcoFMivUlDhTFYe-vA?e=miE8xo",
        url_template: null,
        id_modality: 2,
        deleted_at: null,
        created_at: "2024-12-30T15:33:29.000000Z",
        updated_at: "2024-12-30T15:33:29.000000Z"
      },
      {
        id: '7',
        name: "Recibo de pago (Presentar documento fisico)",
        description: "Recibo de pago realizado en la plataforma https:\/\/pagos.unas.edu.pe\/ (colegio estatal 230.00 soles; particular 250.00 soles)",
        guide: "https:\/\/pagos.unas.edu.pe\/",
        url_template: null,
        id_modality: 2,
        deleted_at: null,
        created_at: "2024-12-30T15:33:29.000000Z",
        updated_at: "2024-12-30T15:33:29.000000Z"
      },
      {
        id: '8',
        name: "Certificado de estudios (Presentar documento original)",
        description: "Certificados originales de educaci\u00f3n secundaria, que acredite un promedio no menor a 13 (trece), cuyo colegio este ubicado dentro del \u00e1mbito geogr\u00e1fico de los firmantes del convenio.",
        guide: "https:\/\/imgv2-2-f.scribdassets.com\/img\/document\/379741692\/original\/ea0a676cf6\/1?v=1",
        url_template: null,
        id_modality: 2,
        deleted_at: null,
        created_at: "2024-12-30T15:33:29.000000Z",
        updated_at: "2024-12-30T15:33:29.000000Z"
      },
      {
        id: '9',
        name: "Carta de presentaci\u00f3n de municipio, instituciones asociaci\u00f3n (Presentar documento original)",
        description: "Carta de presentaci\u00f3n del municipio, instituciones asociaci\u00f3n pretenecientes al convenio especial",
        guide: "https:\/\/imgv2-2-f.scribdassets.com\/img\/document\/379741692\/original\/ea0a676cf6\/1?v=1",
        url_template: null,
        id_modality: 2,
        deleted_at: null,
        created_at: "2024-12-30T15:33:29.000000Z",
        updated_at: "2024-12-30T15:33:29.000000Z"
      },
      {
        id: '10',
        name: "DNI escaneado (Presentar documento fisico legalizado)",
        description: "Documento con DNI escaneado ambas caras (amberso y reberso)",
        guide: "https:\/\/imgv2-2-f.scribdassets.com\/img\/document\/700349425\/original\/e85b4a1857\/1?v=1",
        url_template: null,
        id_modality: 2,
        deleted_at: null,
        created_at: "2024-12-30T15:33:29.000000Z",
        updated_at: "2024-12-30T15:33:29.000000Z"
      },
      {
        id: '11',
        name: "Foto del postulante (Presentar documento fisico)",
        description: "Fotografia tama\u00f1o carnet o pasaporte",
        guide: "https:\/\/encrypted-tbn0.gstatic.com\/images?q=tbn:ANd9GcQ7tvtE0GlDpPumRNck2F9PESwuczbZ5rFE_Q\u0026s",
        url_template: null,
        id_modality: 2,
        deleted_at: null,
        created_at: "2024-12-30T15:33:29.000000Z",
        updated_at: "2024-12-30T15:33:29.000000Z"
      }
    ],
  },
  {
    name: 'Modalidad Deportistas Calificados',
    value: '3',
    requirements: [
      {
        id: '12',
        name: "Solicitud dirigida al Rector UNAS (Presentar documento fisico)",
        description: "Solicitud dirigida al rector de la unas, asunto \u0022Inscripci\u00f3n al examen de pregrado\u0022, Detalle: \u0022Carrera Profecional priemra y segunda opci\u00f3n\u0022",
        guide: "https:\/\/unasedu-my.sharepoint.com\/:i:\/g\/personal\/iomar_alegre_unas_edu_pe\/EWeWVuAYzdNMo932AxNmzMgBm1UGIcoFMivUlDhTFYe-vA?e=miE8xo",
        url_template: null,
        id_modality: 3,
        deleted_at: null,
        created_at: "2024-12-30T15:33:29.000000Z",
        updated_at: "2024-12-30T15:33:29.000000Z"
      },
      {
        id: '13',
        name: "Recibo de pago (Presentar documento fisico)",
        description: "Recibo de pago realizado en la plataforma https:\/\/pagos.unas.edu.pe\/ (colegio estatal 230.00 soles; particular 250.00 soles)",
        guide: "https:\/\/pagos.unas.edu.pe\/",
        url_template: null,
        id_modality: 3,
        deleted_at: null,
        created_at: "2024-12-30T15:33:29.000000Z",
        updated_at: "2024-12-30T15:33:29.000000Z"
      },
      {
        id: '14',
        name: "Certificado de estudios (Presentar documento original)",
        description: "Certificados originales de educaci\u00f3n secundaria, que acredite un promedio no menor a 12.00 (doce).",
        guide: "https:\/\/imgv2-2-f.scribdassets.com\/img\/document\/379741692\/original\/ea0a676cf6\/1?v=1",
        url_template: null,
        id_modality: 3,
        deleted_at: null,
        created_at: "2024-12-30T15:33:29.000000Z",
        updated_at: "2024-12-30T15:33:29.000000Z"
      },
      {
        id: '15',
        name: "DNI escaneado (Presentar documento fisico)",
        description: "Documento con DNI escaneado ambas caras (amberso y reberso)",
        guide: "https:\/\/imgv2-2-f.scribdassets.com\/img\/document\/700349425\/original\/e85b4a1857\/1?v=1",
        url_template: null,
        id_modality: 3,
        deleted_at: null,
        created_at: "2024-12-30T15:33:29.000000Z",
        updated_at: "2024-12-30T15:33:29.000000Z"
      },
      {
        id: '16',
        name: "Certificado de buena salud (Presentar documento fisico)",
        description: "Certificado de buena salud, expedida por MINSA, apto para desarrollar actividades deportivas de alta competencia y no tener lesiones a la fecha.",
        guide: null,
        url_template: null,
        id_modality: 3,
        deleted_at: null,
        created_at: "2024-12-30T15:33:29.000000Z",
        updated_at: "2024-12-30T15:33:29.000000Z"
      },
      {
        id: '17',
        name: "Resoluciones, certificados o constancia de su actividad permanente en el deporte. (Presentar documento fisico)",
        description: "Resoluciones, certificados o constancia de de su actividad permanente en deporte.",
        guide: null,
        url_template: null,
        id_modality: 3,
        deleted_at: null,
        created_at: "2024-12-30T15:33:29.000000Z",
        updated_at: "2024-12-30T15:33:29.000000Z"
      },
      {
        id: '18',
        name: "Afiliaci\u00f3n al SIS o ESSALUD. (Presentar documento fisico)",
        description: "Copia de afilicaci\u00f3n vigente del SIS o ESSALUD.",
        guide: null,
        url_template: null,
        id_modality: 3,
        deleted_at: null,
        created_at: "2024-12-30T15:33:29.000000Z",
        updated_at: "2024-12-30T15:33:29.000000Z"
      },
      {
        id: '19',
        name: "Constancia de Examen Psicol\u00f3gico",
        description: "Constancia de examen psicol\u00f3gico, de ser posible realizado en el \u00e1rea de psicopedagog\u00eda en la oficina de Bienestar Universitario - UNAS.",
        guide: null,
        url_template: null,
        id_modality: 3,
        deleted_at: null,
        created_at: "2024-12-30T15:33:29.000000Z",
        updated_at: "2024-12-30T15:33:29.000000Z"
      },
      {
        id: '20',
        name: "Compromiso notarial de participaci\u00f3n en eventos deportivos ",
        description: "Rellenar compromiso notarial de participaci\u00f3n en eventos deportivos de la UNAS mientras dure su formaci\u00f3n profesional.",
        guide: null,
        url_template: null,
        id_modality: 3,
        deleted_at: null,
        created_at: "2024-12-30T15:33:29.000000Z",
        updated_at: "2024-12-30T15:33:29.000000Z"
      }
    ],
  },
  {
    name: 'Modalidad Traslados Externos',
    value: '4',
    requirements: [
      {
        id: '21',
        name: "Solicitud dirigida al decano de la facultad al que postula.",
        description: "Presentar una solicitud formal dirigida al decano de la facultad a la que se postula.",
        guide: null,
        url_template: null,
        id_modality: 4,
        deleted_at: null,
        created_at: "2024-12-30T15:33:29.000000Z",
        updated_at: "2024-12-30T15:33:29.000000Z"
      },
      {
        id: '22',
        name: "Recibo de pago (Presentar documento fisico)",
        description: "Recibo de pago realizado en la plataforma https:\/\/pagos.unas.edu.pe\/ (colegio estatal 360.00 soles; particular 380.00 soles)",
        guide: "https:\/\/pagos.unas.edu.pe\/",
        url_template: null,
        id_modality: 4,
        deleted_at: null,
        created_at: "2024-12-30T15:33:29.000000Z",
        updated_at: "2024-12-30T15:33:29.000000Z"
      },
      {
        id: '23',
        name: "Certificado de estudio original.(Presentar documento fisico)",
        description: "Certificado de haber aprobado 72 cr\u00e9ditos como m\u00ednimo, con promedio ponderado acumulativo= igual o mayor a 13 (trece). Si procede de universidad extranjera, los certificados deber\u00e1n estar legalizados por el ministerio de relaciones exteriores.",
        guide: null,
        url_template: null,
        id_modality: 4,
        deleted_at: null,
        created_at: "2024-12-30T15:33:29.000000Z",
        updated_at: "2024-12-30T15:33:29.000000Z"
      },
      {
        id: '24',
        name: "Constancia de primera matricula brindado de la Direcci\u00f3n de asuntos Academicos (DIA) (Presentar documento original).",
        description: "Presentar constancia de primera matricula.",
        guide: null,
        url_template: null,
        id_modality: 4,
        deleted_at: null,
        created_at: "2024-12-30T15:33:29.000000Z",
        updated_at: "2024-12-30T15:33:29.000000Z"
      },
      {
        id: '25',
        name: "Constancia de no haber sido separado de la Universidad o instituci\u00f3n de origen.",
        description: "Constancia de no haber sido separado por asuntos acad\u00e9micos y sanciones disciplinarias. Omitir en caso solicite traslado externo para obtener t\u00edtulo.",
        guide: null,
        url_template: null,
        id_modality: 4,
        deleted_at: null,
        created_at: "2024-12-30T15:33:29.000000Z",
        updated_at: "2024-12-30T15:33:29.000000Z"
      },
      {
        id: '26',
        name: "Silabos o programas de asignaturas aprobadas.",
        description: "Silabos o programas de asignaturas aprobadas, sellados y firmados por la autoridad de la universidad de origen, luego de ingresar.",
        guide: null,
        url_template: null,
        id_modality: 4,
        deleted_at: null,
        created_at: "2024-12-30T15:33:29.000000Z",
        updated_at: "2024-12-30T15:33:29.000000Z"
      },
      {
        id: '27',
        name: "Copia DNI o pasaporte con visa de residencia.",
        description: "Copia DNI o pasaporte con visa de residencia, si el postulante es extranjero.",
        guide: null,
        url_template: null,
        id_modality: 4,
        deleted_at: null,
        created_at: "2024-12-30T15:33:29.000000Z",
        updated_at: "2024-12-30T15:33:29.000000Z"
      },
      {
        id: '28',
        name: "Constancia de registro de grado de bachiller SUNEDU.",
        description: "Constancia de registro de grado de bachiller SUNEDU. Omitir en caso de solicite traslado externo para obtener t\u00edtulo.",
        guide: null,
        url_template: null,
        id_modality: 4,
        deleted_at: null,
        created_at: "2024-12-30T15:33:29.000000Z",
        updated_at: "2024-12-30T15:33:29.000000Z"
      }
    ],
  },
  {
    name: 'Modalidad primer y segundo puesto de educación secundaria y egresados COAR',
    value: '5',
    requirements: [
      {
        id: '29',
        name: "Solicitud dirigida a rector UNAS. (Presentar documento fisico)",
        description: "Presentar una solicitud formal dirigida al rector de la UNAS.",
        guide: "https:\/\/unasedu-my.sharepoint.com\/:i:\/g\/personal\/iomar_alegre_unas_edu_pe\/EWeWVuAYzdNMo932AxNmzMgBm1UGIcoFMivUlDhTFYe-vA?e=miE8xo",
        url_template: null,
        id_modality: 5,
        deleted_at: null,
        created_at: "2024-12-30T15:33:29.000000Z",
        updated_at: "2024-12-30T15:33:29.000000Z"
      },
      {
        id: '30',
        name: "Recibo de pago (Presentar documento fisico)",
        description: "Recibo de pago realizado en la plataforma https:\/\/pagos.unas.edu.pe\/ (colegio estatal 220.00 soles; particular 240.00 soles)",
        guide: "https:\/\/pagos.unas.edu.pe\/",
        url_template: null,
        id_modality: 5,
        deleted_at: null,
        created_at: "2024-12-30T15:33:29.000000Z",
        updated_at: "2024-12-30T15:33:29.000000Z"
      },
      {
        id: '31',
        name: "Certificado de estudios de 1\u00b0 al 5\u00b0 a\u00f1o de educaci\u00f3n secundaria.",
        description: "Certificado de estudios de 1\u00b0 al 5\u00b0 a\u00f1o de educaci\u00f3n secundaria, firmado y sellado por la direcci\u00f3n.",
        guide: null,
        url_template: null,
        id_modality: 5,
        deleted_at: null,
        created_at: "2024-12-30T15:33:29.000000Z",
        updated_at: "2024-12-30T15:33:29.000000Z"
      },
      {
        id: '32',
        name: "Constancia de 1\u00b0 o 2\u00b0 puesto de orden de m\u00e9rito de promoci\u00f3n.",
        description: "Constancia otorgada por la direcci\u00f3n del plantel y visada por el ministerio de educaci\u00f3n (UGEL), del lugar 1\u00b0 o 2\u00b0 puesto de orden de m\u00e9rito de promoci\u00f3n.",
        guide: null,
        url_template: null,
        id_modality: 5,
        deleted_at: null,
        created_at: "2024-12-30T15:33:29.000000Z",
        updated_at: "2024-12-30T15:33:29.000000Z"
      },
      {
        id: '33',
        name: "Constancia de egresado de COAR.",
        description: "En caso de egresado de COAR, presentar su constancia de egresado.",
        guide: null,
        url_template: null,
        id_modality: 5,
        deleted_at: null,
        created_at: "2024-12-30T15:33:29.000000Z",
        updated_at: "2024-12-30T15:33:29.000000Z"
      },
      {
        id: '34',
        name: "Copia de DNI ampliado. (Presentar documento fisico)",
        description: "Presentar copia de DNI ampliado.",
        guide: null,
        url_template: null,
        id_modality: 5,
        deleted_at: null,
        created_at: "2024-12-30T15:33:29.000000Z",
        updated_at: "2024-12-30T15:33:29.000000Z"
      }
    ],
  },
  {
    name: 'Modalidad Víctimas de Terrorismo',
    value: '6',
    requirements: [
      {
        id: '35',
        name: "Solicitud dirigida al rector UNAS.",
        description: "Presentar una solicitud dirigida al rector de la UNAS.",
        guide: "https:\/\/unasedu-my.sharepoint.com\/:i:\/g\/personal\/iomar_alegre_unas_edu_pe\/EWeWVuAYzdNMo932AxNmzMgBm1UGIcoFMivUlDhTFYe-vA?e=miE8xo",
        url_template: null,
        id_modality: 6,
        deleted_at: null,
        created_at: "2024-12-30T15:33:29.000000Z",
        updated_at: "2024-12-30T15:33:29.000000Z"
      },
      {
        id: '36',
        name: "Copia legible de certificados de estudios del 1\u00b0 al 5\u00b0 a\u00f1o de secundaria con promedio general m\u00ednimo de 12 (doce).",
        description: "Presentar copia legible de los certificados de estudios del 1\u00b0 al 5\u00b0 a\u00f1o de secundaria con un promedio general m\u00ednimo de 12 (doce).",
        guide: null,
        url_template: null,
        id_modality: 6,
        deleted_at: null,
        created_at: "2024-12-30T15:33:29.000000Z",
        updated_at: "2024-12-30T15:33:29.000000Z"
      },
      {
        id: '37',
        name: "Copia de acreditaci\u00f3n otorgada por el MINES y\/o consejo de reparaci\u00f3n de haber sido afectado por violencia a nombre del postulante.",
        description: "Presentar copia de la acreditaci\u00f3n otorgada por el MINES y\/o consejo de reparaci\u00f3n de haber sido afectado por violencia a nombre del postulante.",
        guide: null,
        url_template: null,
        id_modality: 6,
        deleted_at: null,
        created_at: "2024-12-30T15:33:29.000000Z",
        updated_at: "2024-12-30T15:33:29.000000Z"
      },
      {
        id: '38',
        name: "Copia de DNI (Presentar documento fisico)",
        description: "Presentar copia del DNI.",
        guide: null,
        url_template: null,
        id_modality: 6,
        deleted_at: null,
        created_at: "2024-12-30T15:33:29.000000Z",
        updated_at: "2024-12-30T15:33:29.000000Z"
      }
    ],
  },
  {
    name: 'Modalidad Comunidades Nativas',
    value: '7',
    requirements: [
      {
        id: '39',
        name: "Solicitud dirigida al rector UNAS.",
        description: "Presentar una solicitud dirigida al rector de la UNAS.",
        guide: "https:\/\/unasedu-my.sharepoint.com\/:i:\/g\/personal\/iomar_alegre_unas_edu_pe\/EWeWVuAYzdNMo932AxNmzMgBm1UGIcoFMivUlDhTFYe-vA?e=miE8xo",
        url_template: null,
        id_modality: 7,
        deleted_at: null,
        created_at: "2024-12-30T15:33:29.000000Z",
        updated_at: "2024-12-30T15:33:29.000000Z"
      },
      {
        id: '40',
        name: "Recibo de pago (Presentar documento fisico)",
        description: "Recibo de pago realizado en la plataforma https:\/\/pagos.unas.edu.pe\/ (colegio estatal 200.00 soles; particular 220.00 soles)",
        guide: "https:\/\/pagos.unas.edu.pe\/",
        url_template: null,
        id_modality: 7,
        deleted_at: null,
        created_at: "2024-12-30T15:33:29.000000Z",
        updated_at: "2024-12-30T15:33:29.000000Z"
      },
      {
        id: '41',
        name: "Copia de certificado de estudios 1\u00b0 al 5\u00b0 a\u00f1o de secundaria con promedio general m\u00ednimo de 12 (doce), cuyo colegio est\u00e1 ubicado dentro del \u00e1mbito geogr\u00e1fico de la comunidad nativa.",
        description: "Presentar copia de certificado de estudios del 1\u00b0 al 5\u00b0 a\u00f1o de secundaria con promedio general m\u00ednimo de 12  (doce), cuyo colegio est\u00e1 ubicado dentro del \u00e1mbito geogr\u00e1fico de la comunidad nativa.",
        guide: null,
        url_template: null,
        id_modality: 7,
        deleted_at: null,
        created_at: "2024-12-30T15:33:29.000000Z",
        updated_at: "2024-12-30T15:33:29.000000Z"
      },
      {
        id: '42',
        name: "Carta de presentaci\u00f3n del jefe de comunidad o de la Organizaci\u00f3n Ind\u00edgena en la cual se especifique su membres\u00eda del pueblo ind\u00edgena respectiva.",
        description: "Presentar carta de presentaci\u00f3n del jefe de comunidad o de la Organizaci\u00f3n Ind\u00edgena en la cual se especifique su membres\u00eda del pueblo ind\u00edgena respectiva.",
        guide: null,
        url_template: null,
        id_modality: 7,
        deleted_at: null,
        created_at: "2024-12-30T15:33:29.000000Z",
        updated_at: "2024-12-30T15:33:29.000000Z"
      },
      {
        id: '43',
        name: "Compromiso de honor, notarial de desempe\u00f1arse como profesional por un periodo no menor de 2 a\u00f1os en la comunidad donde reside despu\u00e9s de obtener su grado de bachiller o t\u00edtulo profesional.",
        description: "Presentar compromiso de honor, notarial de desempe\u00f1arse como profesional por un periodo no menor de 2 a\u00f1os en la comunidad donde reside despu\u00e9s de obtener su grado de bachiller o t\u00edtulo profesional.",
        guide: null,
        url_template: null,
        id_modality: 7,
        deleted_at: null,
        created_at: "2024-12-30T15:33:29.000000Z",
        updated_at: "2024-12-30T15:33:29.000000Z"
      },
      {
        id: '44',
        name: "Copia ampliada de DNI.",
        description: "Presentar copia ampliada del DNI.",
        guide: null,
        url_template: null,
        id_modality: 7,
        deleted_at: null,
        created_at: "2024-12-30T15:33:29.000000Z",
        updated_at: "2024-12-30T15:33:29.000000Z"
      }
    ],
  },
  {
    name: 'Modalidad Arte y Cultura',
    value: '8',
    requirements: [
      {
        id: '45',
        name: "Certificado de estudio originales de educaci\u00f3n secundaria promedio 12 (doce).",
        description: "Presentar certificado de estudio originales de educaci\u00f3n secundaria con promedio m\u00ednimo de 12 (doce).",
        guide: null,
        url_template: null,
        id_modality: 8,
        deleted_at: null,
        created_at: "2024-12-30T15:33:29.000000Z",
        updated_at: "2024-12-30T15:33:29.000000Z"
      },
      {
        id: '46',
        name: "Recibo de pago (Presentar documento fisico)",
        description: "Recibo de pago realizado en la plataforma https:\/\/pagos.unas.edu.pe\/ (colegio estatal 220.00 soles; particular 240.00 soles)",
        guide: "https:\/\/pagos.unas.edu.pe\/",
        url_template: null,
        id_modality: 8,
        deleted_at: null,
        created_at: "2024-12-30T15:33:29.000000Z",
        updated_at: "2024-12-30T15:33:29.000000Z"
      },
      {
        id: '47',
        name: "Copia de DNI.",
        description: "Presentar copia del DNI.",
        guide: null,
        url_template: null,
        id_modality: 8,
        deleted_at: null,
        created_at: "2024-12-30T15:33:29.000000Z",
        updated_at: "2024-12-30T15:33:29.000000Z"
      },
      {
        id: '48',
        name: "Tener actividad permanente del arte que practica en el momento de la solicitud.",
        description: "Demostrar tener actividad permanente del arte que practica en el momento de la solicitud.",
        guide: null,
        url_template: null,
        id_modality: 8,
        deleted_at: null,
        created_at: "2024-12-30T15:33:29.000000Z",
        updated_at: "2024-12-30T15:33:29.000000Z"
      }
    ],
  },
  {
    name: 'Modalidad Beca18',
    value: '9',
    requirements: [
      {
        id: '49',
        name: "Solicitud dirigida a rector UNAS.",
        description: "Presentar una solicitud dirigida al rector de la UNAS.",
        guide: "https:\/\/unasedu-my.sharepoint.com\/:i:\/g\/personal\/iomar_alegre_unas_edu_pe\/EWeWVuAYzdNMo932AxNmzMgBm1UGIcoFMivUlDhTFYe-vA?e=miE8xo",
        url_template: null,
        id_modality: 9,
        deleted_at: null,
        created_at: "2024-12-30T15:33:29.000000Z",
        updated_at: "2024-12-30T15:33:29.000000Z"
      },
      {
        id: '50',
        name: "Recibo de pago (Presentar documento fisico)",
        description: "Recibo de pago realizado en la plataforma https:\/\/pagos.unas.edu.pe\/ (Unico pago 50.00 soles)",
        guide: "https:\/\/pagos.unas.edu.pe\/",
        url_template: null,
        id_modality: 9,
        deleted_at: null,
        created_at: "2024-12-30T15:33:29.000000Z",
        updated_at: "2024-12-30T15:33:29.000000Z"
      },
      {
        id: '51',
        name: "Copia de DNI.",
        description: "Presentar copia del DNI.",
        guide: null,
        url_template: null,
        id_modality: 9,
        deleted_at: null,
        created_at: "2024-12-30T15:33:29.000000Z",
        updated_at: "2024-12-30T15:33:29.000000Z"
      },
      {
        id: '52',
        name: "Copia de certificado de estudios 1\u00b0 a 5\u00b0 de secundaria.",
        description: "Presentar copia de certificado de estudios del 1\u00b0 al 5\u00b0 a\u00f1o de secundaria.",
        guide: null,
        url_template: null,
        id_modality: 9,
        deleted_at: null,
        created_at: "2024-12-30T15:33:29.000000Z",
        updated_at: "2024-12-30T15:33:29.000000Z"
      },
      {
        id: '53',
        name: "Lista de inscrito preseleccionado del concurso beca 18 PRONABEC.",
        description: "Presentar lista de inscrito preseleccionado del concurso beca 18 PRONABEC.",
        guide: null,
        url_template: null,
        id_modality: 9,
        deleted_at: null,
        created_at: "2024-12-30T15:33:29.000000Z",
        updated_at: "2024-12-30T15:33:29.000000Z"
      }
    ],
  },
  {
    name: 'Modalidad Personas con Discapacidad',
    value: '10',
    requirements: [
      {
        id: '54',
        name: "Solicitud dirigida a rector UNAS.",
        description: "Presentar una solicitud dirigida al rector de la UNAS.",
        guide: "https:\/\/unasedu-my.sharepoint.com\/:i:\/g\/personal\/iomar_alegre_unas_edu_pe\/EWeWVuAYzdNMo932AxNmzMgBm1UGIcoFMivUlDhTFYe-vA?e=miE8xo",
        url_template: null,
        id_modality: 10,
        deleted_at: null,
        created_at: "2024-12-30T15:33:29.000000Z",
        updated_at: "2024-12-30T15:33:29.000000Z"
      },
      {
        id: '55',
        name: "Copia de carnet de identidad por Discapacidad, emitido por el CONADIS.",
        description: "Presentar copia de carnet de identidad por Discapacidad, emitido por el CONADIS.",
        guide: null,
        url_template: null,
        id_modality: 10,
        deleted_at: null,
        created_at: "2024-12-30T15:33:29.000000Z",
        updated_at: "2024-12-30T15:33:29.000000Z"
      },
      {
        id: '56',
        name: "Recibo de pago (Presentar documento fisico)",
        description: "Recibo de pago realizado en la plataforma https:\/\/pagos.unas.edu.pe\/ (colegio estatal 180.00 soles; particular 200.00 soles)",
        guide: "https:\/\/pagos.unas.edu.pe\/",
        url_template: null,
        id_modality: 10,
        deleted_at: null,
        created_at: "2024-12-30T15:33:29.000000Z",
        updated_at: "2024-12-30T15:33:29.000000Z"
      },
      {
        id: '57',
        name: "Copia de certificado de estudio del 1\u00b0 al 5\u00b0 a\u00f1o de educaci\u00f3n secundaria.",
        description: "Presentar copia de certificado de estudio del 1\u00b0 al 5\u00b0 a\u00f1o de educaci\u00f3n secundaria.",
        guide: null,
        url_template: null,
        id_modality: 10,
        deleted_at: null,
        created_at: "2024-12-30T15:33:29.000000Z",
        updated_at: "2024-12-30T15:33:29.000000Z"
      },
      {
        id: '58',
        name: "Copia ampliada de DNI.",
        description: "Presentar copia ampliada del DNI.",
        guide: null,
        url_template: null,
        id_modality: 10,
        deleted_at: null,
        created_at: "2024-12-30T15:33:29.000000Z",
        updated_at: "2024-12-30T15:33:29.000000Z"
      }
    ],
  },
  {
    name: 'Modalidad Traslados Internos',
    value: '11',
    requirements: [
      {
        id: '59',
        name: "Solicitud dirigida a rector UNAS.",
        description: "Presentar una solicitud dirigida al rector de la UNAS.",
        guide: "https:\/\/unasedu-my.sharepoint.com\/:i:\/g\/personal\/iomar_alegre_unas_edu_pe\/EWeWVuAYzdNMo932AxNmzMgBm1UGIcoFMivUlDhTFYe-vA?e=miE8xo",
        url_template: null,
        id_modality: 11,
        deleted_at: null,
        created_at: "2024-12-30T15:33:29.000000Z",
        updated_at: "2024-12-30T15:33:29.000000Z"
      },
      {
        id: '60',
        name: "Recibo de pago (Presentar documento fisico)",
        description: "Recibo de pago realizado en la plataforma https:\/\/pagos.unas.edu.pe\/ (unico pago 280.00 soles)",
        guide: "https:\/\/pagos.unas.edu.pe\/",
        url_template: null,
        id_modality: 11,
        deleted_at: null,
        created_at: "2024-12-30T15:33:29.000000Z",
        updated_at: "2024-12-30T15:33:29.000000Z"
      },
      {
        id: '61',
        name: "Certificados de estudios originales, de haber aprobado cr\u00e9ditos como m\u00ednimo, con promedio ponderado acumulado igual o mayor a 11.",
        description: "Presentar certificados de estudios originales, de haber aprobado cr\u00e9ditos como m\u00ednimo, con promedio ponderado acumulado igual o mayor a 11.",
        guide: null,
        url_template: null,
        id_modality: 11,
        deleted_at: null,
        created_at: "2024-12-30T15:33:29.000000Z",
        updated_at: "2024-12-30T15:33:29.000000Z"
      },
      {
        id: '62',
        name: "S\u00edlabos o programas de asignaturas aprobadas, sellados y firmados por la autoridad competente.",
        description: "Presentar s\u00edlabos o programas de asignaturas aprobadas, sellados y firmados por la autoridad competente.",
        guide: null,
        url_template: null,
        id_modality: 11,
        deleted_at: null,
        created_at: "2024-12-30T15:33:29.000000Z",
        updated_at: "2024-12-30T15:33:29.000000Z"
      },
      {
        id: '63',
        name: "DNI copia legalizada.",
        description: "Presentar copia legalizada del DNI.",
        guide: null,
        url_template: null,
        id_modality: 11,
        deleted_at: null,
        created_at: "2024-12-30T15:33:29.000000Z",
        updated_at: "2024-12-30T15:33:29.000000Z"
      }
    ]
  }
];

export const HOME_MENU: IMenuItem[] = [
  {
    name: 'INICIO',
    route: '/home',
    icon: 'fa-house'
  },
  {
    name: 'FACULTADES',
    route: '/home/faculties',
    icon: 'fa-graduation-cap'
  },
  {
    name: 'INSCRIPCIÓN',
    route: '/home/registration',
    icon: 'fa-file-pen'
  },
  {
    name: 'MODALIDADES',
    route: '/home/modalities',
    icon: 'fa-shuffle'
  }
];

export const AUTH_MENU: IMenuItem[] = [
  {
    name: 'Usuarios',
    route: '/admin/users',
    icon: 'fa-user'
  },
  {
    name: 'Examenes',
    route: '/admin/exams',
    icon: 'fa-file'
  },
  {
    name: 'Postulaciones',
    route: '/admin/postulations',
    icon: 'fa-book'
  }
];
