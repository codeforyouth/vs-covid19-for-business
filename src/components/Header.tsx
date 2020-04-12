/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { h, FunctionalComponent } from 'preact';
import { Link } from 'preact-router/match';
import styled, { css } from 'styled-components';
import media from 'styled-media-query';
import Search from '@material-ui/icons/Search';
import Description from '@material-ui/icons/Description';
import NewTab from '@material-ui/icons/OpenInNew';
import Undo from '@material-ui/icons/Replay';
import { Colors } from '../shared';
import { useScroll } from '../hooks';
import { customMedia } from '../constants';

const Header: FunctionalComponent<{ path: string | undefined }> = props => {
  const { scrollToTop } = useScroll();
  return (
    <Wrapper centered={props.path === '/about'}>
      <div>
        {props.path !== '/about' && (
          <span onClick={scrollToTop}>VS COVID-19</span>
        )}
        <ul>
          <li>
            {props.path !== '/about' ? (
              <Link href="/about">
                <Description />
                このサイトについて
              </Link>
            ) : (
              <Link href="/">
                <Undo />
                トップに戻る
              </Link>
            )}
          </li>
          <li>
            <a
              href="https://covid19-support.now.sh"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Search />
              民間支援情報を探す
              <NewTab className="small" />
            </a>
          </li>
        </ul>
      </div>
    </Wrapper>
  );
};

export default Header;

type StyleProps = { centered: boolean };
const Wrapper = styled.div<StyleProps>`
  display: block;
  position: sticky;
  top: 0;
  width: 100vw;
  height: 60px;
  color: ${Colors.white};
  background-color: ${Colors.green};
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.12);
  > div {
    display: flex;
    align-items: center;
    max-width: 1080px;
    height: 100%;
    margin: 0 auto;
    > span {
      ${media.lessThan('small')`
        display: none;
      `}
      cursor: pointer;
      color: ${Colors.white};
      font-weight: bold;
      > a {
        color: ${Colors.white};
        font-weight: bold;
      }
    }
    > ul {
      flex-direction: row;
      display: flex;
      margin-left: auto;
      ${media.lessThan('small')`
        width: 100vw;
        justify-content: center;
      `}
      ${({ centered }: StyleProps) =>
        centered &&
        css`
          width: 100vw;
          justify-content: center;
        `}
      > li {
        cursor: pointer;
        &:nth-of-type(n + 2) {
          margin-left: 20px;
          ${media.lessThan('small')`
            margin-left: 8px;
          `}
        }
        > a {
          display: flex;
          align-items: center;
          ${media.lessThan('small')`
            font-size: 14px;
          `}
          ${customMedia.lessThan('xs')`
          font-size: 12px;
          `}
          > svg {
            color: ${Colors.white};
            margin: 0 4px;
            width: 20px;
            height: 20px;
            &.small {
              color: ${Colors.white};
              margin: 0 4px;
              width: 14px;
              height: 14px;
            }
          }
          color: ${Colors.white};
        }
      }
    }
  }
`;
