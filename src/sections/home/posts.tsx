'use client'

import Segmented from "@/components/ui/segmented";
import {useState} from "react";

const data_tabs = [{
  label: 'All',
  value: 'all',
}, {
  label: 'Architectural Design',
  value: 'architectural_design',
}, {
  label: 'Residential Interiors',
  value: 'residential_interiors',
}, {
  label: 'Commercial Interior',
  value: 'commercial_interior',
},]

export const SectionHomePosts = () => {
  const [val, setVal] = useState<"all" | "read" | "unread">("all");
  return (
    <section id={'posts'} className={'relative w-full bg-[#181818]'}>
      <div className={'border-0 border-y border-[#5B5C5D]'}>
        <div className={'container flex flex-row items-center justify-between'}>
          <div className={'container flex flex-row items-center justify-start'}>
            <Segmented
              options={data_tabs}
              value={val}
              className={''}
              onChange={(v) => setVal(v as any)}
              size="middle"
              block
              ariaLabel="Filter"
            />
          </div>
        </div>
      </div>

      <div className={''}>
        cards
      </div>
    </section>
  );
};