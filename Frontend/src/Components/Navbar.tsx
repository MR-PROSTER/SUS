import { RiLoginCircleLine } from "react-icons/ri";
import { BsReverseLayoutSidebarReverse } from "react-icons/bs";

const Navbar = () => {
  return (
    <div className='h-16 w-full bg-[#141519] flex items-center justify-between'>
        <BsReverseLayoutSidebarReverse className='text-[#CCBCBC] text-3xl ml-4'/>
        <h1 className='font-molot text-[#CCBCBC] text-4xl px-4 py-2 -translate-x-[785px]'>MicroPDF</h1>
        <RiLoginCircleLine className='text-[#CCBCBC] text-3xl mr-4'/>
    </div>
  )
}

export default Navbar
