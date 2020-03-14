import { h, FunctionalComponent } from 'preact';
import styled from 'styled-components';
import { AppContainer } from '../containers';
import { Card } from '.';
import { LAYOUT_WIDTH } from '../constants';

const CheckLoadStatus: FunctionalComponent = () => {
  const {
    supportsData: { isLoading, error, response },
    word,
    filteredSupports,
  } = AppContainer.useContainer();
  return (
    <Layout>
      <div>
        {isLoading && <p>読込中</p>}
        {error && <p>{error.name + ':' + error.message}</p>}
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
        {!isLoading && (!response || (word && !filteredSupports)) && (
          <p>何もありません</p>
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
    span {
      font-weight: bold;
    }
    .content {
      margin-top: 30px 60px;
    }
  }
`;

export default CheckLoadStatus;
