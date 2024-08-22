interface IUserbutton {
  color?: string;
  text?: string;
  children: any;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}
const UserButton = ({
  color,
  text,
  children,
  onClick,
  className,
  disabled,
}: IUserbutton) => {
  return (
    <div>
      <button
        style={{ background: color }}
        className={`  flex items-center justify-center ${className}`}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
      <p className="text-center font-thin text-xs mt-[14px]">{text}</p>
    </div>
  );
};

export default UserButton;
