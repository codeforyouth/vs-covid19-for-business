import { h, FunctionalComponent } from 'preact';
import styled from 'styled-components';
import { AppContainer } from '../containers';
import { Card } from '.';
import { LAYOUT_WIDTH } from '../constants';
import Loader from '../assets/images/loader.svg';

const CheckLoadStatus: FunctionalComponent = () => {
  const {
    supportsData: { isLoading, error, response },
    word,
    filteredSupports,
  } = AppContainer.useContainer();
  return (
    <Layout>
      <div>
        {isLoading && (
          <div className="loader">
            <img src={Loader} alt="読込中" />
          </div>
        )}
        {error && <p>{error.name + ':' + error.message}</p>}
        {!isLoading && (!response || (word && !filteredSupports)) && (
          <p>何もありません</p>
        )}
        {!word &&
          response &&
          response?.data?.map((item, i) => <Card key={i} {...item} />)}
        {word && filteredSupports && (
          <div>
            <span>該当件数: {filteredSupports.length}件</span>
            <div className="content">
              {filteredSupports.map((item, i) => (
                <Card key={i} {...item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

const Layout = styled.div`
  background-color: #f3f3f4;
  min-height: 100vh;
  padding-top: 24px;
  > div {
    margin: 0 auto;
    max-width: ${LAYOUT_WIDTH}px;
    margin-bottom: 24px;
    > .loader {
      width: 100%;
      > img {
        margin: 80px auto;
        width: 80px;
        height: 80px;
        color: #f6c744;
      }
    }
    span {
      font-weight: bold;
    }
    .content {
      margin-top: 30px 60px;
    }
  }
`;

export default CheckLoadStatus;
