import React from "react";
const WeatherCard = () => {
    return (
      <div className="w-[342px] h-[175px] bg-gradient-to-r from-[#5936B4] to-[#362A84] text-white rounded-2xl p-4 flex flex-col justify-between shadow-lg">
        <div className="flex justify-center">
          <svg fill="none" viewBox="0 0 342 175" height="100" width="342" xmlns="http://www.w3.org/2000/svg">
            <path fill="url(#paint0_linear)" d="M0 66.4396C0 31.6455 0 14.2484 11.326 5.24044C22.6519 -3.76754 39.6026 0.147978 73.5041 7.97901L307.903 62.1238C324.259 65.9018 332.436 67.7909 337.218 73.8031C342 79.8154 342 88.2086 342 104.995V131C342 151.742 342 162.113 335.556 168.556C329.113 175 318.742 175 298 175H44C23.2582 175 12.8873 175 6.44365 168.556C0 162.113 0 151.742 0 131V66.4396Z"></path>
            <defs>
              <linearGradient id="paint0_linear" x1="0" y1="128" x2="354.142" y2="128" gradientUnits="userSpaceOnUse">
                <stop stopColor="#5936B4"></stop>
                <stop stopColor="#362A84" offset="1"></stop>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="flex justify-center items-center flex-col">
          <p className="text-4xl font-bold">24°</p>
          <p className="text-sm text-gray-300">H:32° L:16°</p>
          <p className="text-lg">Kathmandu, Nepal</p>
          <p className="text-md text-gray-300">Mid Rain</p>
        </div>
      </div>
    );
  };