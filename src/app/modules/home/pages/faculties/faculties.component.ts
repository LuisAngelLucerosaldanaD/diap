import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {IFaculties} from "../../../../core/models/faculties/faculties";

@Component({
  selector: 'app-faculties',
  standalone: true,
  imports: [],
  templateUrl: './faculties.component.html',
  styleUrl: './faculties.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FacultiesComponent {

  protected faculties: IFaculties[] = [
    {
      logo: 'https://admision.unas.edu.pe/images/agronomia.png',
      name: 'Facultad de Agronomía',
      page_link: 'https://portalweb.unas.edu.pe/content/facultad-de-agronom%C3%ADa',
      professional_name: 'Ingeniero',
      academic_degree: 'Agronomia',
    },
    {
      name: 'Facultad de Zootecnia',
      page_link: 'https://portalweb.unas.edu.pe/content/facultad-de-zootecnia',
      professional_name: 'Ingeniero',
      logo: 'https://admision.unas.edu.pe/images/zootecnia.png',
      academic_degree: 'Zootecnia',
    },
    {
      name: 'Facultad de Ingeniería en Industrias Alimentarias',
      logo: 'https://admision.unas.edu.pe/images/alimentarias.png',
      page_link: 'https://portalweb.unas.edu.pe/content/facultad-de-ingenier%C3%ADa-en-industrias-alimentarias',
      professional_name: 'Ingeniero',
      academic_degree: 'Industrias Alimentarias',
    },
    {
      name: 'Facultad en Recursos Naturales Renovables',
      professional_name: 'Ingeniero',
      logo: 'https://admision.unas.edu.pe/images/recursos.png',
      page_link: 'https://portalweb.unas.edu.pe/content/facultad-de-recursos-naturales-renovables',
      academic_degree: 'Recursos Naturales Renovables',
    },
    {
      name: 'Facultad de Ciencias Económicas y Administrativas',
      professional_name: 'Licenciado',
      logo: 'https://admision.unas.edu.pe/images/economia-administrativa.png',
      page_link: 'https://portalweb.unas.edu.pe/content/facultad-de-ciencias-econ%C3%B3micas-y-administrativas',
      academic_degree: 'Economía',
    },
    {
      name: 'Facultad de Ingeniería en Informática y Sistemas',
      professional_name: 'Ingeniero',
      logo: 'https://admision.unas.edu.pe/images/sistemas.png',
      page_link: 'https://portalweb.unas.edu.pe/content/facultad-de-ingenieria-en-informatica-y-sistemas',
      academic_degree: 'Informática y Sistemas',
    },
    {
      name: 'Facultad de Ciencias Contables',
      professional_name: 'Licenciado',
      logo: 'https://admision.unas.edu.pe/images/contables.png',
      page_link: 'https://portalweb.unas.edu.pe/content/facultad-de-ciencias-contables',
      academic_degree: 'Ciencias Contables',
    },
    {
      name: 'Facultad de Ingeniería Mecánica Eléctrica',
      professional_name: 'Ingeniero',
      logo: 'https://admision.unas.edu.pe/images/mecanica.png',
      page_link: 'https://portalweb.unas.edu.pe/content/facultad-en-ingenier%C3%ADa-mec%C3%A1nica',
      academic_degree: 'Mecánica Eléctrica',
    }
  ]

}
