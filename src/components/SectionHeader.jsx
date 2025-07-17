
import { MdOutlineCallMade } from "react-icons/md";
function SectionHeader({ title, subtitle, decsAction, onAction }) {
  return (
    <div className=" px-[var(--padding-x)] flex justify-between items-end  py-5 text-[var(--dark-gray)] sticky top-0 z-10 bg-white w-full ">
      <div className=" w-full md:w-fit">
        <div className=" block md:hidden flex justify-between items-center mb-2">
          <h2 className=" text-xl md:text-2xl font-bold ">{title}</h2>
          {decsAction && (
            <span onClick={onAction} className="text-xs">{decsAction}</span>
          )}
        </div>
        <h2 className="hidden md:block text-xl md:text-2xl font-bold mb-2">{title}</h2>
        <p className=" text-[var(--medium-gray)] text-sm md:text-base">{subtitle}</p>
      </div>
      {decsAction && (
        <button onClick={onAction} className=" hidden md:block w-fit text-black hover:underline font-semibold cursor-pointer">
          {decsAction}
        </button>
      )}
    </div>
  );
}

export default SectionHeader;
