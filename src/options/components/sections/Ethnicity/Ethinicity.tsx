import { Formik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'
import { translate } from '../../../../utils/translate'
import FormTitle from '../../generic/FormTitle'
import { getNextTabName, getPrevTabName, notify } from '../../../../utils'
import useStorage from '../../../hooks/use-Storage'

import { useLocation, useNavigate } from 'react-router-dom'
import { EthnicityForm } from './Form'
import { Ethnicity } from '../../../../global'

const disabilityRadios = [
  { id: 1, title: 'Yes', name: 'disability', value: 'Yes, I have' },
  { id: 2, title: 'No', name: 'disability', value: 'No, I do not' },
]
const veterianTadios = [
  { id: 3, title: 'Yes', name: 'veterian', value: 'I identify as one' },
  { id: 4, title: 'No', name: 'veterian', value: 'I am not' },
]
const lgtbRadios = [
  { id: 5, title: 'Yes', name: 'lgtb', value: 'Yes' },
  { id: 6, title: 'No', name: 'lgtb', value: 'No' },
]

const genders = [
  { id: 7, title: 'Male', name: 'gender', value: 'Male' },
  { id: 8, title: 'Female', name: 'gender', value: 'Female' },
  { id: 9, title: 'Non-Binary', name: 'gender', value: 'Non-Binary' },
]
function EthnicitySection({ setUserInfo }: { setUserInfo: (userParams: any) => boolean }) {
  const [next, setNext] = useState(false)
  const [prev, setPrev] = useState(false)
  const [options, setOptions] = useState<Ethnicity>({
    is_disabled: '',
    is_veteran: '',
    is_lgbt: '',
    gender: '',
    ethnicity: '' as any,
  })
  const { getUserInfo } = useStorage()
  const userInfo = getUserInfo()

  const ethnicity = userInfo && userInfo.ethnicity

  const [_Ethnicity, setEthnicity] = useState({
    is_disabled: ethnicity?.is_disabled ?? null,
    is_veteran: ethnicity?.is_veteran ?? null,
    is_lgbt: ethnicity?.is_lgbt ?? null,
    gender: ethnicity?.gender ?? null,
    ethnicity: ethnicity?.ethnicity ?? '',
  })
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const currentTab = queryParams.get('tab')
  const FormSchema = Yup.object().shape({
    is_disabled: Yup.string().required(translate('required_msg')),
    is_veteran: Yup.string().required(translate('required_msg')),
    is_lgbt: Yup.string().required(translate('required_msg')),
    gender: Yup.string().required(translate('required_msg')),
    ethnicity: Yup.object().required(translate('required_msg')),
  })
  return (
    <>
      <Formik
        initialValues={_Ethnicity}
        validationSchema={FormSchema}
        onSubmit={(values, props) => {
          const hasChanges = Object.keys(values).some(
            //@ts-ignore
            (key: any) => values[key] !== _Ethnicity[key],
          )
          if (
            ethnicity == undefined ||
            ethnicity.ethnicity.name != values?.ethnicity.name ||
            ethnicity.is_disabled != values?.is_disabled ||
            ethnicity.is_lgbt != values?.is_lgbt ||
            ethnicity.is_veteran != values?.is_veteran ||
            ethnicity.gender != values?.gender
          ) {
            const result = setUserInfo({
              ethnicity: {
                ethnicity: options.ethnicity,
                is_disabled: values.is_disabled,
                is_veteran: values.is_veteran,
                is_lgbt: values.is_lgbt,
                gender: values.gender,
              },
            })
            if (result) {
              notify('Data Saved', 'success')
            }
          }
          if (next) {
            const nextTab = getNextTabName(currentTab)
            navigate(`/?tab=${nextTab}`)
            setNext(false)
          }
          if (prev) {
            const prevTab = getPrevTabName(currentTab)
            navigate(`/?tab=${prevTab}`)
            setNext(false)
          }
        }}
      >
        {({ errors, touched, values, handleSubmit, setFieldValue }) => (
          <div className="flex items-center justify-center pb-14 ">
            <div className="w-full text-black text-left space-y-4  ">
              <FormTitle name={translate('tell_about_yourself')} />
              <div className="text-lg max-w-[800px] text-center">{translate('ethnicity_msg')}</div>
              <EthnicityForm
                errors={errors}
                touched={touched}
                values={values}
                veterianTadios={veterianTadios}
                setOptions={setOptions}
                genders={genders}
                lgtbRadios={lgtbRadios}
                disabilityRadios={disabilityRadios}
                handleSubmit={handleSubmit}
                setFieldValue={setFieldValue}
                setNext={setNext}
                setPrev={setPrev}
              />
            </div>
          </div>
        )}
      </Formik>
    </>
  )
}

export default EthnicitySection
