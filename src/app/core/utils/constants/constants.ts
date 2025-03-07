import {IOption} from "../../models/registration/registration";
import {IMenuItem} from "../../models/ui/menu";

export const HOME_MENU: IMenuItem[] = [
  {
    name: 'Inicio',
    route: '/home',
    icon: 'fa-house',
    roles: [],
    exact: true
  },
  {
    name: 'Facultades',
    route: '/home/faculties',
    icon: 'fa-graduation-cap',
    roles: [],
    exact: true
  },
  {
    name: 'Modalidades',
    route: '/home/modalities',
    icon: 'fa-shuffle',
    roles: [],
    exact: true
  },
  {
    name: 'Inscripciones',
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
    name: 'Convocatorias',
    route: '/admin/exams',
    icon: 'fa-file',
    roles: [1],
    exact: false
  },
  {
    name: 'Escuelas',
    route: '/admin/schools',
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
  },
  {
    name: 'Configuraciones',
    route: '/admin/settings',
    icon: 'fa-gear',
    roles: [1],
    exact: true
  },
  {
    name: 'Exámenes complementarios',
    route: '/admin/exams-complementarios',
    icon: 'fa-file',
    roles: [1],
    exact: true
  },
  {
    name: 'Modalidades',
    route: '/admin/modalidades',
    icon: 'fa-shuffle',
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
