import { h, FunctionalComponent } from 'preact';
import { AppContainerType } from '../containers';
import { Card } from '../components';

type Props = Pick<AppContainerType, 'supportsData' | 'filteredSupports'>;

const CheckLoadStatus: FunctionalComponent<Props> = ({
  supportsData: { isLoading, response, error },
  filteredSupports,
}) => {
  return (
    <div>
      {isLoading && <p>読込中</p>}
      {error && <p>{error.name + ':' + error.message}</p>}
      {filteredSupports &&
        filteredSupports.map((item, i) => <Card key={i} {...item} />)}
      {response && response?.data?.map((item, i) => <Card key={i} {...item} />)}
      {!isLoading && !response && <p>何もありません</p>}
    </div>
  );
};

export default CheckLoadStatus;
