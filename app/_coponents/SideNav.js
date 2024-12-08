import Image from 'next/image';
import Logout from './Logout';
import Link from 'next/link';

function SideNav() {
  return (
    <ul>
        <li>
            <Image src='/Final Logo 1.png' width={200} height={200} alt='logo'/>
        </li>
      <li>
        <Link href='/'>dashboard</Link>
      </li>
      <li>
        <Link href='/'>quiz history</Link>
      </li>
      <li>
        <Logout />
      </li>
    </ul>
  );
}

export default SideNav;
