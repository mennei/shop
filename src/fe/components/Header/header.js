import Link from 'next/link';
import Products from '../../containers/Products/Products';

const Header = props => {
  console.log (props);
  return (
    <header>
      <ul>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <a>About Page</a>
          </Link>
        </li>
        <li>
          <Link href="/auth"><a>login</a></Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
