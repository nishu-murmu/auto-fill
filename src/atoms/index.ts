import { atom, atomFamily } from 'recoil'
import { EducationProps, ProjectsProps, WorkExperience } from '../global'

export const isFirstJobAtom = atom({
  key: 'isFirstJobAtom',
  default: false as boolean,
})

export const showForm = atom({
  key: 'showForm',
  default: true as boolean,
})
export const ExperienceForm = atom({
  key: 'ExperienceForm',
  default: true as boolean,
})
export const ProjectsFormAtom = atom({
  key: 'ProjectsFormAtom',
  default: true as boolean,
})

export const addMore = atom({
  key: 'addMore',
  default: false as boolean,
})

export const educationAtom = atom({
  key: 'educationAtom',
  default: {} as EducationProps,
})

export const educationListAtom = atom({
  key: 'educationListAtom',
  default: [
    {
      school_name: '',
      major: '',
      degree: '',
      GPA: '',
      start_month: '',
      start_year: '',
      end_month: '',
      end_year: '',
    },
  ] as EducationProps[],
})

export const experienceAtom = atom({
  key: 'experienceAtom',
  default: {} as WorkExperience,
})

export const experienceListAtom = atom({
  key: 'experienceListAtom',
  default: [
    {
      company_name: '',
      position_title: '',
      experience_type: '',
      start_month: '',
      location: {
        name: '',
        latitude: 0,
        longitude: 0,
        country: '',
        population: 0,
        is_capital: false,
      },
      end_month: '',
      start_year: '',
      end_year: '',
      description: '',
      is_working_currently: false,
    },
  ] as WorkExperience[],
})

export const projectsAtom = atom({
  key: 'projectsAtom',
  default: {} as ProjectsProps,
})

export const projectsListAtom = atom({
  key: 'projectsListAtom',
  default: [
    {
      title: '',
      project_description: '',
    },
  ] as ProjectsProps[],
})

export const updateArray = atom({
  key: 'updateArray',
  default: [] as any,
})

export const updateExpArray = atom({
  key: 'updateExpArray',
  default: [] as any,
})

export const updateProjectsArray = atom({
  key: 'updateProjectsArray',
  default: [] as any,
})

export const loadingFamily = atomFamily({
  key: 'loadingFamily',
  default: false as boolean,
})
