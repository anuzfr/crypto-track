import InterestSlider from "./InterestSlider";

export default function InfoBar({ onClick }) {
    return (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8 mt-10 mr-8 ml-8">
            <div className="h-40 rounded bg-gray-300" ></div>
            <div className="h-40 rounded bg-gray-300"></div>
            <div className="h-40 rounded bg-gray-300"></div>
            <div className="h-40 rounded bg-gray-300"></div>
      </div>
    );
  }