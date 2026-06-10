import { BeatLoader } from "react-spinners";
export default function loading() {
  return (
    <div className="bg-gray-200 flex justify-center items-center h-screen">
      <BeatLoader />
    </div>
  );
}
