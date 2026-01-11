import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { FiGift } from "react-icons/fi";
import { IoStatsChartSharp } from "react-icons/io5";
import { AiTwotonePieChart } from "react-icons/ai";
import { BsBank } from "react-icons/bs";
import { RiProductHuntLine } from "react-icons/ri";





const DashboardBoxes = () => {
    return (
        <>
            <Swiper
                spaceBetween={10}
                slidesPerView={4}
                navigation={true}
                modules={[Navigation]}
                className='dashboardBoxesSlider'
            >
                <SwiperSlide>
                    <div className='box p-5 bg-white cursor-pointer hover:bg-[#f1f1f1] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4'>
                        <FiGift className='text-[50px] text-[#3872fa]' />
                        <div className='info w-[70%]'>
                            <h3>New Orders</h3>
                            <b>1,390</b>
                        </div>
                        <IoStatsChartSharp className='text-[50px] text-[#3872fa]'/>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className='box p-5 bg-white cursor-pointer hover:bg-[#f1f1f1] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4'>
                        <AiTwotonePieChart className='text-[50px] text-[#10b981]' />
                        <div className='info w-[70%]'>
                            <h3>Sales</h3>
                            <b>$51,390</b>
                        </div>
                        <IoStatsChartSharp className='text-[50px] text-[#10b981]'/>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className='box p-5 bg-white cursor-pointer hover:bg-[#f1f1f1] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4'>
                        <BsBank className='text-[50px] text-[#7928ca]' />
                        <div className='info w-[70%]'>
                            <h3>Revenue</h3>
                            <b>$1,390</b>
                        </div>
                        <IoStatsChartSharp className='text-[50px] text-[#7928ca]'/>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className='box p-5 bg-white cursor-pointer hover:bg-[#f1f1f1] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4'>
                        <RiProductHuntLine className='text-[50px] text-[#312be1d8]' />
                        <div className='info w-[70%]'>
                            <h3>Total Products</h3>
                            <b>1,390</b>
                        </div>
                        <IoStatsChartSharp className='text-[50px] text-[#312be1d8]'/>
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    )
}

export default DashboardBoxes