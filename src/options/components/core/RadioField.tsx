import React from 'react'

export default function RadioField({ options, selected, onChange, msg }: any) {
  return (
    <div className="">
      <div className="text-base font-semibold w-full !text-left text-gray-900">{msg}</div>
      <fieldset className="mt-1">
        <legend className="sr-only">Notification method</legend>
        <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
          {options.map((notificationMethod: any) => (
            <div key={notificationMethod.id} className="flex items-center">
              <input
                id={notificationMethod.title}
                name="notification-method"
                type="radio"
                value={selected}
                onChange={onChange}
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label
                htmlFor={notificationMethod.title}
                className="ml-3 block text-sm font-medium leading-6 text-gray-900"
              >
                {notificationMethod.title}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  )
}
