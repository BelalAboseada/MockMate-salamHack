import Lottie from "lottie-react";
import LoadingData from "../../assets/Loading/Loading.json";

const Loader = ({ className }) => {
  return (
    <div className="flex justify-center items-center m-auto">
      <Lottie animationData={LoadingData} className={` ${className} w-32 lg:w-52`} />
    </div>
  );
};

export default Loader;
