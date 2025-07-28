import React from 'react'

export default function Card({ title, icon, href, count }) {
  return (
     <a
        href={href}
        className="flex flex-col rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50/50 active:border-purple-200 lg:col-span-3"
      >
        <div className="flex grow items-center justify-between p-5">
          <dl>
            <dt className="text-2xl font-bold">{count}  </dt>
            <dd className="text-sm font-medium text-zinc-500">{title}</dd>
          </dl>
          <div className="flex items-center text-sm font-medium text-zinc-300">
           {icon}
          </div>
        </div>
        <div className="border-t border-zinc-100 px-5 py-3 text-xs font-medium text-emerald-500">
          Show All
        </div>
      </a>
  )
}
