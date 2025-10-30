import React from 'react';

export default function StatCards({ stats }: { stats: {label: string, value: string|number, color?: string}[] }) {
  return (
    <div className="flex gap-4 justify-around my-6 flex-wrap">
      {stats.map((stat, i) => (
        <div key={i} className={`flex-1 min-w-[120px] p-3 text-center rounded shadow bg-white border ${stat.color||''}`}>
          <div className="text-2xl font-bold">{stat.value}</div>
          <div className="text-xs text-gray-400 uppercase mt-1">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
