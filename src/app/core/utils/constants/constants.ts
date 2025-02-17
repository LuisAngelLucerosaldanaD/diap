import {IOption} from "../../models/registration/registration";
import {IMenuItem} from "../../models/ui/menu";

export const HOME_MENU: IMenuItem[] = [
  {
    name: 'INICIO',
    route: '/home',
    icon: 'fa-house',
    roles: []
  },
  {
    name: 'FACULTADES',
    route: '/home/faculties',
    icon: 'fa-graduation-cap',
    roles: []
  },
  {
    name: 'MODALIDADES',
    route: '/home/modalities',
    icon: 'fa-shuffle',
    roles: []
  },
  {
    name: 'INSCRIPCIÓN',
    route: '/home/registration',
    icon: 'fa-file-pen',
    roles: []
  }
];

export const AUTH_MENU: IMenuItem[] = [
  {
    name: 'Usuarios',
    route: '/admin/users',
    icon: 'fa-user',
    roles: [1]
  },
  {
    name: 'Examenes',
    route: '/admin/exams',
    icon: 'fa-file',
    roles: [1]
  },
  {
    name: 'Postulaciones',
    route: '/admin/postulations',
    icon: 'fa-book',
    roles: [1, 2]
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
