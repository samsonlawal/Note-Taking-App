import { Tooltip } from "@nextui-org/tooltip";
import { useDataContext } from "@/context/DataContext"


interface Props {
  children: React.ReactNode;
  name: string;
  setSelectedProject: (val: string | null) => void;
  // isOpen: boolean;
}

const NavigationLink = ({ children, name, setSelectedProject }: Props) => {
  const { isOpen, setIsOpen, isRightSidebarOpen, setIsRightSidebarOpen } =
    useDataContext();

  const isMobile = () => window.innerWidth < 768;

  const handleClick = () => {
    if (!isOpen) {
      setIsOpen(true);
    }

    if (isRightSidebarOpen && isMobile()) {
      setIsRightSidebarOpen(false);
    }

    setSelectedProject(name);
  };

  return (
    <a
      href="#"
      onClick={handleClick}
      className="flex rounded items-center justify-center cursor-pointer stroke-[1] stroke-gray-700 place-items-center gap-3"
    >
      <Tooltip
        placement="right"
        showArrow={true}
        className="bg-gray-200 dark:bg-gray-700 rounded-md mx-2 font-outfit border border-gray-300 dark:border-gray-800 text-xs"
        content={<div className="text-tiny">{name}</div>}
      >
        {children}
      </Tooltip>
      {/* <p className="font-poppins overflow-clip whitespace-nowrap tracking-wide text-[15px]">
      </p> */}
    </a>
  );
};

export default NavigationLink;
