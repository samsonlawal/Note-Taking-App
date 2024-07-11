// interface Props {
//   children: React.ReactNode
//   name: string
// }

import {
  Eraser,
} from "lucide-react";

const Logo = () => {
  return (
    <a
      href="/"
      className="flex stroke-[0.75] stroke-neutral-400 text-neutral-400 place-items-center gap-1 transition-colors duration-100 overflow-clip whitespace-nowrap tracking-wide"
    >
      {/* <Eraser /> */}
      {/* <p className="font-poppins text-[16px]">Inscribed</p> */}
    </a>
  );
}

export default Logo
