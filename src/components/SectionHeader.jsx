function SectionHeader({ title, subtitle, decsAction, onAction }) {
    return (
      <div className="px-[var(--padding-x)] flex justify-between items-end  py-5 text-[var(--dark-gray)] sticky top-0 z-10 bg-white">
        <div>
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className=" text-[var(--medium-gray)] ">{subtitle}</p>
        </div>
        {decsAction && (
          <button onClick={onAction} className="text-black hover:underline font-semibold cursor-pointer">
            {decsAction}
          </button>
        )}
      </div>
    );
  }
  
  export default SectionHeader;
  