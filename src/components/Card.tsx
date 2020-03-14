import { h, FunctionalComponent } from 'preact';
import styled from 'styled-components';
import { Support } from '../typings';
type Props = Support;
const Card: FunctionalComponent<Props> = props => (
  <Container>
    <div className="top">
      <div className="type">{props['分野']}</div>
      <h2>{props['サービス名称']}</h2>
      <p>{props['詳細']}</p>
      <div className="list">
        <div className="fee">{'費用等:' + props['無料/有料']}</div>
        <div className="span">
          {'提供期間:' +
            props['開始日'] +
            '〜' +
            props['終了日'] +
            props['期間備考']}
        </div>
        <div className="service">{props['サービス分類']}</div>
        <div className="keyword">{props['キーワード']}</div>
        <div className="target">{props['対象者']}</div>
      </div>
    </div>
    <div className="bottom">
      <div className="from">{'提供: ' + props['企業等']}</div>
      <div className="url">
        <a href={props.URL} target="_blank" rel="noopener noreferrer">
          アクセスする
        </a>
      </div>
    </div>
  </Container>
);

const Container = styled.div`
  border-radius: 6px;
  box-shadow: 0px 1px 18px rgba(0, 0, 0, 0.04);
  background-color: #ffffff;
  margin: 1em 0;
  line-height: 1.8em;
  > .top {
    padding: 36px 20px;
    > .type {
      color: white;
      background-color: #3ba599;
      padding: 4px 8px;
      margin-bottom: 12px;
      display: inline-block;
      border-radius: 4px;
    }
    > h2 {
      margin-bottom: 12px;
    }
  }
  > .bottom {
    border-top: 1px solid #f3f3f4;

    padding: 20px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    > .from {
      color: #a4a4a4;
    }
    > .url {
      border-radius: 100px;
      background-color: #f6c744;
      font-weight: bold;
      text-align: center;
      padding: 8px 48px;
      > a {
        font-weight: normal;
        display: block;
        text-decoration: none;
        color: #ffffff !important;
      }
    }
  }
  > h2 {
    padding: 0.2em 0em 0.5em 0em;
    margin: 0;
  }
  > div.description {
    margin-bottom: 0.8em;
  }
  > div.tags {
    text-align: center;
    margin: 0.6em;
    > div {
      display: inline-block;
      border: 1px solid black;
      padding: 0 0.3em;
      font-size: 80%;
      line-height: 1.8em;
      background-color: white;
      margin: 0.5em 0.2em;
      cursor: pointer;
    }
  }
`;

export default Card;
