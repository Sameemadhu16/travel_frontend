import React from 'react'
import cover from '../../../assets/images/cover.png'
import SearchContainer from '../../../components/SearchContainer'
import Main from '../../../components/Main';
import Breadcrumb from '../../../components/Breadcrumb';
import Title from '../../../components/Title';
import { hotelFilterOptions } from '../../../core/constant';
import { handleSelect } from '../../../core/service';
import CustomSelector from '../../../components/CustomSelector';
import { hotelList } from '../../../core/Lists/hotels';

const breadcrumbItems = [
  { label: "Home", path: "/home" },
  { label: "Vehicles", path: "/vehicle-search" },
];


export default function SearchVehicles() {
  return (
    <>
      <div className='w-full relative'>
                      <img 
                          src={cover} 
                          alt="cover" 
                          className='h-full w-full object-fit'
                      />
                      <div>
                          <div className='z-10 absolute top-24 left-1/2 transform -translate-x-1/2 w-1/2'>
                              <SearchContainer/>
                          </div>
                      </div>
        </div>
        <Main>
          <div className='flex items-center w-full mt-5'>
                              <div className='w-1/4'>
                                  <Breadcrumb
                                      items={breadcrumbItems}
                                  />
                              </div>
          </div>

           <div className='flex flex-1'>
                                  <div className='w-full flex justify-between items-center'>
                                      <Title 
                                          title={`Kandy: ${hotelList.length} matches`}
                                          size='text-[16px]'
                                      />
                                      <div className='w-1/2'>
                                          <CustomSelector
                                              options={hotelFilterOptions}
                                              placeholder="Recommended"
                                              onChange={handleSelect}
                                          />
                                      </div>
                                  </div>
                              </div>

        </Main>
                
    </>
  )
}
