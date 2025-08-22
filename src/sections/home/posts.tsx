'use client'

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
  return (
    <section id={'posts'} className={'relative w-full bg-[#181818]'}>
      <div className={'border-0 border-y border-[#5B5C5D]'}>
        <div className={'container flex flex-row items-center justify-between'}>
          <div className={'container flex flex-row items-center justify-start'}>
          </div>
        </div>
      </div>

      <div className={''}>
        cards
      </div>
    </section>
  );
};