/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { h, FunctionalComponent } from 'preact';
import styled from 'styled-components';
import { AppContainer } from '../containers';
import { Card } from '.';
import { LAYOUT_WIDTH } from '../constants';
import Loader from '../assets/images/loader.svg';
import { Colors, Categories } from '../shared';

const CheckLoadStatus: FunctionalComponent = () => {
  const {
    supportsData: { isLoading, error, response },
    word,
    filteredSupports,
    handleSetWord,
  } = AppContainer.useContainer();
  return (
    <Layout>
      <div>
        <div className="categories">
          {Categories.map(category => (
            <div
              key={category.color}
              style={{ backgroundColor: category.color }}
              onClick={() => handleSetWord(category.name)}
            >
              {category.name}
            </div>
          ))}
        </div>
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
  background-color: ${Colors.bgLightGray};
  min-height: 100vh;
  padding: 24px 0;
  > div {
    margin: 0 auto;
    max-width: ${LAYOUT_WIDTH}px;
    margin-bottom: 24px;
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
      }
    }
    > .loader {
      width: 100%;
      > img {
        margin: 80px auto;
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
`;

export default CheckLoadStatus;
