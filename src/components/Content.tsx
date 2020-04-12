/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { h, FunctionalComponent } from 'preact';
import styled from 'styled-components';
import media from 'styled-media-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import ArrowUp from '@material-ui/icons/ArrowUpward';
import { AppContainer } from '../containers';
import { Card, Loader } from '.';
import { LAYOUT_WIDTH } from '../constants';
import { Colors } from '../shared';
import { useCallback } from 'preact/hooks';
import { usePrevious, useScroll } from '../hooks';

const CheckLoadStatus: FunctionalComponent = () => {
  const {
    params,
    pageNumber,
    setPageNumber,
    supportsData: { status, error, data },
    fetchSupports,
  } = AppContainer.useContainer();
  const { scrollPosition, scrollToTop } = useScroll();
  const prevPageNumber = usePrevious(pageNumber);

  const handleLoadMore = useCallback(() => {
    const nextPageNumber = prevPageNumber + 1;
    setPageNumber(nextPageNumber);
    const offsetQueries = {
      ...params,
      offset: nextPageNumber * 10,
    };
    fetchSupports(offsetQueries, true);
  }, []);

  return (
    <Layout>
      <div>
        {status === (undefined || 'loading') && <Loader />}
        {status === 'fail' && <p>{error.name + ':' + error.message}</p>}
        {status === 'success' &&
          (data.total === 0 ? (
            <p>該当する支援情報がみつかりませんでした 🙇‍♂️</p>
          ) : (
            <div>
              <span>該当件数: {data.total}件</span>
              <InfiniteScroll
                dataLength={data.items.length}
                hasMore={data.total > data.items.length}
                next={handleLoadMore}
                loader={<Loader />}
              >
                <div className="content">
                  {data &&
                    data.items?.map((item, i) => <Card key={i} {...item} />)}
                </div>
              </InfiniteScroll>
              <ScrollTrigger
                className="scroll-trigger"
                onClick={scrollToTop}
                scrollPosition={scrollPosition}
              >
                <ArrowUp />
              </ScrollTrigger>
            </div>
          ))}
      </div>
    </Layout>
  );
};

const ScrollTrigger = styled.div<{ scrollPosition: number }>`
  display: ${({ scrollPosition }) => (scrollPosition > 1000 ? 'flex' : 'none')};
  cursor: pointer;
  background-color: ${Colors.green};
  width: 50px;
  height: 50px;
  position: fixed;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  border-radius: 50%;
  margin: 36px;
  z-index: 5;
  animation: fadeIn 0.3s linear 0s 1 normal;
  > svg {
    color: ${Colors.white};
  }
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const Layout = styled.div`
  background-color: ${Colors.bgLightGray};
  min-height: 100vh;
  padding: 16px 0;
  > div {
    margin: 0 auto;
    max-width: ${LAYOUT_WIDTH}px;
    margin-bottom: 24px;
    > .checks {
      padding-top: 20px;
      > div {
        display: inline-block;
        margin-right: 6px;
        > label {
          display: flex;
          align-items: center;
          letter-spacing: 0.2;
          color: ${Colors.textBlack};
          > input {
            margin-right: 2px;
            height: 20px !important;
            width: 20px !important;
          }
          margin-right: 4px;
          color: ${Colors.textBlack};
        }
      }
    }
    > .categories {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 24px;
      > div {
        cursor: pointer;
        color: white;
        padding: 4px 8px;
        display: inline-block;
        border-radius: 4px;
        margin-right: 8px;
        margin-top: 8px;
      }
    }
    span {
      font-weight: bold;
    }
    .content {
      margin-top: 30px 60px;
    }
  }
  ${media.lessThan('medium')`
    background-color: ${Colors.bgLightGray};
    padding: 16px;
    div {
      > .categories {
        padding-top: 14px;
      }
    }
  `}
  ${media.lessThan('small')`
    div {
      > .checks {
        text-align: center;
      }
      > .categories {
        overflow: auto;
        flex-wrap: nowrap;
        > div {
          min-width: 164px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  `}
`;

export default CheckLoadStatus;
