
import Image from 'next/image';
import ProvidersButtons from '../_coponents/ProvidersButtons';
import Link from 'next/link';


function layout({ children }) {
  return (
    <div className='flex gap-[132px]  justify-between items-center'>
      <div className=' bg-[#F0F4FC] rounded-[0_100px_100px_0] shadow-[0_5px_100px_0_#0000001A] p-[80px] '>
        <h1 className='font-bold text-5xl '>
          Welcome to <br />
          <span className='font-bold text-5xl leading-[75px] text-[#122D9C]'>
            Elevate
          </span>
        </h1>
        <p className='font-normal leading-[40px] text-[18px]'>
          Quidem autem voluptatibus qui quaerat aspernatur architecto natus
        </p>
        <Image alt='' width='600' height='700' src='/bro.png' />
      </div>
      <div className="max-w-[50%] m-auto">
<nav className='mb-28'>
  <ul className='flex gap-8 justify-end'>
    <li><Link href='/auth/login' className=' font-bold text-[20px] text-[#4461F2]'>Sign in</Link></li>
    <li><Link href='/auth/signup' className='p-2 leading-6 rounded-[15px] border '>Register</Link></li>
  </ul>
</nav>
      {children}
      <div className="">
<ProvidersButtons />
      </div>

      </div>
    </div>
  );
}

export default layout;
