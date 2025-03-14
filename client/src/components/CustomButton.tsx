

const CustomButton = ({ title, containerStyles, iconRight, type, onClick }:any) => {
  return (
    <button
      onClick={onClick}
      type={type || "button"}
      className={`inline-flex items-center ${containerStyles}`}
    >
      {title}

      {iconRight && <div className='ml-2'>{iconRight}</div>}
    </button>
  );
};

export default CustomButton;