import React from 'react'

export default function SkillsElement({ item, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="text-lg py-4 px-5 font-semibold text-gray-700  w-full rounded-lg ring-1 ring-inset ring-gray-300"
    >
      {item}
    </button>
  )
}
