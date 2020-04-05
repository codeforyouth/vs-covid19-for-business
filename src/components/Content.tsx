/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { h, FunctionalComponent } from 'preact';
import styled from 'styled-components';
import media from 'styled-media-query';
import { AppContainer } from '../containers';
import { Card } from '.';
import { LAYOUT_WIDTH } from '../constants';
import Loader from '../assets/images/loader.svg';
import { Colors, Categories, Targets } from '../shared';

const CheckLoadStatus: FunctionalComponent = () => {
  const {
    supportsData: { status, error, response },
  } = AppContainer.useContainer();
  return (
    <Layout>
      <div>
        {status === (undefined || 'loading') && (
          <div className="loader">
            <img src={Loader} alt="読込中" />
          </div>
        )}
        {status === 'fail' && <p>{error.name + ':' + error.message}</p>}
        {status == 'success' && !response && <p>何もありません</p>}
        {response &&
          response.data.items?.map((item, i) => <Card key={i} {...item} />)}
      </div>
    </Layout>
  );
};

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
    > .loader {
      width: 100%;
      > img {
        filter: invert(50%) sepia(0%) saturate(11%) hue-rotate(143deg)
          brightness(101%) contrast(93%);
        margin: 120px auto;
        width: 80px;
        height: 80px;
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
    padding: 0 16px;
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
