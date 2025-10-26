import React from 'react';
import HomeIcon from '../ui/icons/HomeIcon';

const MainContent: React.FC = () => {
  return (
    <div className="flex-1 bg-gray-50 p-2 md:p-5">
      <div className="mx-auto max-w-full">
        <div style={{
          borderRadius: '10px',
          background: '#f5f5f5',
          border: '5px solid #fff',
          boxShadow: '0 0 16px #292a330f, 0 6px 20px #292a3305'
        }} className="p-3 md:p-5 lg:p-[20px] flex flex-col gap-3">
          <div className="flex items-center">
            <div className="text-right w-full">
              <h1 className="text-xl md:text-2xl font-yekan-bold text-gray-900">صفحه اصلی</h1>
              <div className='flex
              items-center gap-1'>
                                <HomeIcon className="w-4 h-4 text-gray-600 " />

                <p className="text-gray-500 mt-1 font-yekan">صفحه اصلی</p>


              </div>
            </div>
          </div>

          <div style={{ boxShadow: '#1cbfd088 0 0 1px' }} className="border border-[#1cbfd0] rounded-lg p-4 md:p-6">
            <p className="text-gray-700 leading-relaxed font-yekan text-sm md:text-base">
              در این صفحه اطلاعات مورد نیاز در هر زمان که لازم بود بر اساس اطلاعات وارد شده نمایش داد خواهد شد.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
