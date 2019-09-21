import Link from 'next/link';
import * as Styled from './StyledHeader';

const Header = props => {
  console.log (props);
  return (
    <Styled.Header>
      <Styled.UL>
        <li>
          <Link href="/">
            <a>דף הבית</a>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <a>אודות החנות</a>
          </Link>
        </li>
        <li>
          <Link href="/auth"><a>כניסה</a></Link>
        </li>
      </Styled.UL>
    </Styled.Header>
  );
};

export default Header;
