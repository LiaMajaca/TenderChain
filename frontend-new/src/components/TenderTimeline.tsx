import React from 'react';

type Event = {
  time: string;
  label: string;
};

export default function TenderTimeline({ events }: { events: Event[] }) {
  return (
    <ul className="flex flex-col gap-2 text-sm">
      {events.map((e, i) => (
        <li key={i} className="flex gap-2 items-start">
          <span className="block w-16 font-mono text-gray-400">{e.time}</span>
          <span>{e.label}</span>
        </li>
      ))}
    </ul>
  );
}
