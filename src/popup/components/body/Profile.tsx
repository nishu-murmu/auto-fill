import useStorage from '../../../options/hooks/use-Storage'
import PrimaryButton from '../PrimaryButton'

export default function Profile() {
  const { getUserInfo, getUserDetails } = useStorage()

  const userDetails: any = getUserInfo()
  const userLoginDetails: any = getUserDetails()

  const handleButtonClick = (slug: any) => {
    // Append the query parameter 'tab' with the value 'work-experience'
    const optionsPageUrl = `${chrome.runtime.getURL('options.html#/')}?tab=${slug}`
    const optionsPage = `${chrome.runtime.getURL('options.html#/')}`

    // Check if the options page is already open with any query parameters
    chrome.tabs.query({}, (tabs) => {
      const matchingTab: any = tabs.find((tab: any) => tab.url.startsWith(optionsPage))
      if (matchingTab) {
        // If the options page is already open with the query parameters, activate that tab
        chrome.tabs.update(matchingTab.id, { active: true, url: optionsPageUrl }, () => {
          // Get the current popup window and close it
          const views = chrome.extension.getViews({ type: 'popup' })
          if (views && views.length > 0) {
            views[0].close()
          }
        })
      } else {
        chrome.tabs.create({ url: optionsPageUrl }, () => {
          // Get the current popup window and close it
          const views = chrome.extension.getViews({ type: 'popup' })
          if (views && views.length > 0) {
            views[0].close()
          }
        })
      }
    })
  }

  return (
    <div className="mx-3">
      <div className="border-b border-gray-300">
        <div className="flex px-3 my-1 space-x-4">
          <div className="my-2">
            <span className="sr-only">Your profile</span>
            <img className="h-9 w-9 rounded-full " src="/src/assets/profile.png" alt="" />
          </div>
          <div className="flex justify-center text-[13px] flex-col items-start">
            <div className="font-semibold">
              {userDetails?.basicInfo
                ? userDetails?.basicInfo?.firstName + ' ' + userDetails?.basicInfo?.lastName
                : ''}
            </div>
            <div>
              {userDetails?.basicInfo ? userDetails?.basicInfo?.email : userLoginDetails.email}
            </div>
          </div>
        </div>
      </div>

      <div className="max-h-[400px] space-y-5 overflow-auto overflow-y-auto mt-5 px-3 scrollbar">
        <div className="divide-y space-y-3">
          <div className="pt-3">
            <div className="flex mt-2 space-x-5">
              <div className="">
                <span className="sr-only">Your profile</span>
                <img className="h-10 w-10 rounded-full " src="/src/assets/education.png" alt="" />
              </div>
              <div className="mx-5 font-bold text-start mt-3 text-[14px]">Educations</div>
            </div>
            <div>
              {userDetails?.education ? (
                userDetails?.education.map((education: any) => (
                  <div key={education.id} className="flex pl-16 pb-3">
                    <div className="flex justify-center text-left flex-col items-start">
                      <div className="font-semibold text-[12px]">{education.school_name}</div>
                      <div className="max-w-[180px] leading-5 text-[11px]">
                        {education.major + ', ' + education.degree}
                      </div>
                      <div className="max-w-[180px] leading-5 text-[11px]">
                        {education.start_month + ', ' + education.start_year}{' '}
                        {education.end_month
                          ? '-  ' + education.end_month + ', ' + education.end_year
                          : '-  ' + 'current'}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="font-semibold text-start mx-5 pl-9 my-2">
                  No education found. Please enter some.
                </div>
              )}
            </div>
          </div>
          <div className="pt-3">
            <div className="flex space-x-5">
              <div className="">
                <span className="sr-only">Your profile</span>
                <img className="h-10 w-10 rounded-full " src="/src/assets/experience.png" alt="" />
              </div>
              <div className="mx-5 font-bold text-start mt-3 text-[14px]">Experiences</div>
            </div>
            <div className="">
              {userDetails?.experience ? (
                userDetails?.experience.map((experience: any) => (
                  <div key={experience.id} className="flex pl-16 pb-3">
                    <div className="flex justify-center text-left flex-col items-start">
                      <div className="font-semibold text-[12px]">
                        {experience.company_name + ', ' + experience.position_title}
                      </div>
                      <div className="leading-5 text-[11px]">{experience.experience_type}</div>
                      <div className="leading-5 text-[11px]">
                        {experience.start_month + ', ' + experience.start_year}{' '}
                        {experience.end_month
                          ? '-  ' + experience.end_month + ', ' + experience.end_year
                          : '-  ' + 'current'}
                      </div>
                      <div className="leading-5 text-[11px]">{experience.description}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="font-semibold text-start mx-5 pl-9 my-2">
                  No experience found. Please enter some.
                </div>
              )}
            </div>
          </div>
          <div className="pt-3">
            <div className="flex space-x-5">
              <div className="">
                <span className="sr-only">Your profile</span>
                <img className="h-10 w-10 rounded-full " src="/src/assets/skills.png" alt="" />
              </div>
              <div className="mx-5 font-bold text-start mt-3 text-[14px]">Skills</div>
            </div>
            <div className="flex flex-wrap items-center justify-center overflow-y-auto pl-10 space-x-2">
              {userDetails?.skills ? (
                userDetails?.skills.map((experience: any) => (
                  <button
                    key={experience.id}
                    className="bg-gray-200 rounded px-1 py-1 my-1 font-semibold text-[10px]"
                  >
                    {experience.label}
                  </button>
                ))
              ) : (
                <div className="font-semibold text-start pl-5 mt-1 ">
                  No experience found. Please enter some.
                </div>
              )}
            </div>
          </div>
        </div>
        {userDetails && (
          <PrimaryButton
            text={Object.keys(userDetails).length > 0 ? 'EDIT' : 'ADD'}
            onClick={() => handleButtonClick('personal')}
            customClass={'!bg-base !hover:bg-base/80 text-gray-700 !w-[98px] mt-4 mb-3'}
          />
        )}
      </div>
    </div>
  )
}
