import { IFaculties } from "../../models/faculties/faculties";
import {IOption} from "../../models/registration/registration";
import {IMenuItem} from "../../models/ui/menu";

export const HOME_MENU: IMenuItem[] = [
  {
    name: 'INICIO',
    route: '/home',
    icon: 'fa-house',
    roles: [],
    exact: true
  },
  {
    name: 'FACULTADES',
    route: '/home/faculties',
    icon: 'fa-graduation-cap',
    roles: [],
    exact: true
  },
  {
    name: 'MODALIDADES',
    route: '/home/modalities',
    icon: 'fa-shuffle',
    roles: [],
    exact: true
  },
  {
    name: 'INSCRIPCIÓN',
    route: '/home/registration',
    icon: 'fa-file-pen',
    roles: [],
    exact: false
  }
];

export const AUTH_MENU: IMenuItem[] = [
  {
    name: 'Usuarios',
    route: '/admin/users',
    icon: 'fa-user',
    roles: [1],
    exact: true
  },
  {
    name: 'Examenes',
    route: '/admin/exams',
    icon: 'fa-file',
    roles: [1],
    exact: false
  },
  {
    name: 'Facultades',
    route: '/admin/faculties',
    icon: 'fa-graduation-cap',
    roles: [1],
    exact: true
  },
  {
    name: 'Postulaciones',
    route: '/admin/postulations',
    icon: 'fa-book',
    roles: [1, 2],
    exact: true
  }
  ,
  {
    name: 'Configuraciones',
    route: '/admin/settings',
    icon: 'fa-gear',
    roles: [1],
    exact: true
  }
];

export const FacultiesOptions: IOption[] = [
  {
    name: 'Agronomia',
    value: 'Agronomia',
    type: 1
  },
  {
    name: 'Zootecnia',
    value: 'Zootecnia',
    type: 1
  },
  {
    name: 'Industrias Alimentarias',
    value: 'Industrias Alimentarias',
    type: 1
  },
  {
    name: 'Ingeniería Forestal',
    value: 'Ingeniería Forestal',
    type: 1
  },
  {
    name: 'Ingeniería en Conservación de Suelos y Agua',
    value: 'Ingeniería en Conservación de Suelos y Agua',
    type: 1
  },
  {
    name: 'Ingeniería en Recursos Naturales Renovables',
    value: 'Ingeniería en Recursos Naturales Renovables',
    type: 1
  },
  {
    name: 'Ingeniería ambiental',
    value: 'Ingeniería ambiental',
    type: 1
  },
  {
    name: 'Administración de Empresas',
    value: 'Administración de Empresas',
    type: 2
  },
  {
    name: 'Contabilidad',
    value: 'Contabilidad',
    type: 2
  },
  {
    name: 'Economía',
    value: 'Economía',
    type: 2
  },
  {
    name: 'Ingeniería en Informática y Sistemas',
    value: 'Ingeniería en Informática y Sistemas',
    type: 1
  },
  {
    name: 'Ingeniería en Mecánica Eléctrica',
    value: 'Ingeniería en Mecánica Eléctrica',
    type: 1
  },
  {
    name: "Ingeniería Civil",
    value: "Ingeniería Civil",
    type: 1
  },
  {
    name: "Hoteleria Y Turismo",
    value: "Hoteleria Y Turismo",
    type: 2
  },
  {
    name: "Ingeniería en Ciberseguridad",
    value: "Ingeniería en Ciberseguridad",
    type: 1
  }
];

export const FACULTIES: IFaculties[] = [
  {
    logo: 'https://admision.unas.edu.pe/diap-backend/public/images/agronomia.png',
    name: 'Facultad de Agronomía',
    page_link: 'https://portalweb.unas.edu.pe/content/facultad-de-agronom%C3%ADa',
    professional_name: 'Ingeniero',
    academic_degree: 'Agronomia',
  },
  {
    name: 'Facultad de Zootecnia',
    page_link: 'https://portalweb.unas.edu.pe/content/facultad-de-zootecnia',
    professional_name: 'Ingeniero',
    logo: 'https://admision.unas.edu.pe/diap-backend/public/images/zootecnia.png',
    academic_degree: 'Zootecnia',
  },
  {
    name: 'Facultad de Ingeniería en Industrias Alimentarias',
    logo: 'https://admision.unas.edu.pe/diap-backend/public/images/alimentarias.png',
    page_link: 'https://portalweb.unas.edu.pe/content/facultad-de-ingenier%C3%ADa-en-industrias-alimentarias',
    professional_name: 'Ingeniero',
    academic_degree: 'Industrias Alimentarias',
  },
  {
    name: 'Facultad en Recursos Naturales Renovables',
    professional_name: 'Ingeniero',
    logo: 'https://admision.unas.edu.pe/diap-backend/public/images/recursos.png',
    page_link: 'https://portalweb.unas.edu.pe/content/facultad-de-recursos-naturales-renovables',
    academic_degree: 'Recursos Naturales Renovables',
  },
  {
    name: 'Facultad de Ciencias Económicas y Administrativas',
    professional_name: 'Licenciado',
    logo: 'https://admision.unas.edu.pe/diap-backend/public/images/economia-administrativa.png',
    page_link: 'https://portalweb.unas.edu.pe/content/facultad-de-ciencias-econ%C3%B3micas-y-administrativas',
    academic_degree: 'Economía',
  },
  {
    name: 'Facultad de Ingeniería en Informática y Sistemas',
    professional_name: 'Ingeniero',
    logo: 'https://admision.unas.edu.pe/diap-backend/public/images/sistemas.png',
    page_link: 'https://portalweb.unas.edu.pe/content/facultad-de-ingenieria-en-informatica-y-sistemas',
    academic_degree: 'Informática y Sistemas',
  },
  {
    name: 'Facultad de Ciencias Contables',
    professional_name: 'Licenciado',
    logo: 'https://admision.unas.edu.pe/diap-backend/public/images/contables.png',
    page_link: 'https://portalweb.unas.edu.pe/content/facultad-de-ciencias-contables',
    academic_degree: 'Ciencias Contables',
  },
  {
    name: 'Facultad de Ingeniería Mecánica Eléctrica',
    professional_name: 'Ingeniero',
    logo: 'https://admision.unas.edu.pe/diap-backend/public/images/mecanica.png',
    page_link: 'https://portalweb.unas.edu.pe/content/facultad-en-ingenier%C3%ADa-mec%C3%A1nica',
    academic_degree: 'Mecánica Eléctrica',
  }
]
