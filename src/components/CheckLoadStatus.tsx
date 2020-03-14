import { h, FunctionalComponent } from 'preact';
import { AppContainer } from '../containers';
import { Card } from '../components';

const CheckLoadStatus: FunctionalComponent = () => {
  const {
    supportsData: { isLoading, error, response },
    word,
    filteredSupports,
  } = AppContainer.useContainer();
  return (
    <div>
      {isLoading && <p>読込中</p>}
      {error && <p>{error.name + ':' + error.message}</p>}
      {!word &&
        response &&
        response?.data?.map((item, i) => <Card key={i} {...item} />)}
      {word && filteredSupports ? (
        <div>
          <p>{filteredSupports.length}件</p>
          {filteredSupports.map((item, i) => (
            <Card key={i} {...item} />
          ))}
        </div>
      ) : (
        <p>該当するものが見つかりませんでした</p>
      )}
      {!isLoading && !response && <p>何もありません</p>}
    </div>
  );
};

export default CheckLoadStatus;
