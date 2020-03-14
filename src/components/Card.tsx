/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { h, FunctionalComponent } from 'preact';
import styled from 'styled-components';
import { Support } from '../typings';
import { Colors } from '../shared';

type Props = Support;
const Card: FunctionalComponent<Props> = props => (
  <Container type={props['分野']}>
    <div className="top">
      <div className="type">{props['分野']}</div>
      <h2>{props['サービス名称']}</h2>
      <p>{props['詳細']}</p>
      <div className="list">
        <div className="item">{props['無料/有料']}</div>
        <div className="item">{props['対象者']}</div>
        <div className="item">{props['サービス分類']}</div>
        <div className="item">{props['対象者']}</div>
        <div className="item">{props['開始日'] + '〜' + props['終了日']}</div>
        <div className="item">{props['期間備考']}</div>
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

const getBGColor = (type: string): string => {
  switch (type) {
    case '教育、学習支援':
      return Colors.yellow;
    case 'ワークスタイル（テレワーク含む）':
      return Colors.purple;
    case '生活関連サービス、娯楽':
      return Colors.orange;
    case '宿泊、飲食サービス':
      return Colors.green;
    case '情報通信':
      return Colors.blue;
    case 'その他':
    default:
      return Colors.violet;
  }
};

const Container = styled.div<{ type?: string }>`
  border-radius: 6px;
  box-shadow: 0px 1px 18px rgba(0, 0, 0, 0.04);
  background-color: ${Colors.white};
  margin: 1em 0;
  line-height: 1.8em;
  > .top {
    padding: 36px 20px;
    > .type {
      color: white;
      background-color: ${({ type }) => getBGColor(type)};
      padding: 4px 8px;
      margin-bottom: 16px;
      display: inline-block;
      border-radius: 4px;
    }
    > h2 {
      margin-bottom: 12px;
    }
    > .list {
      margin-top: 16px;
      display: flex;
      flex-wrap: wrap;
      > .item {
        padding: 3px 9px;
        margin-right: 8px;
        margin-bottom: 8px;
        border-radius: 4px;
        color: ${Colors.textGray};
        background-color: ${Colors.bgLightGray};
      }
    }
  }
  > .bottom {
    border-top: 1px solid ${Colors.borderGray};
    padding: 20px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    > .from {
      color: ${Colors.textGray};
    }
    > .url {
      cursor: pointer;
      border-radius: 100px;
      border: 1px solid ${Colors.yellow};
      background-color: ${Colors.white};
      font-weight: bold;
      text-align: center;
      padding: 8px 48px;
      > a {
        font-weight: normal;
        display: block;
        text-decoration: none;
        color: ${Colors.yellow} !important;
      }
      &:hover {
        background-color: ${Colors.yellow};
        > a {
          color: #${Colors.white} !important;
        }
      }
    }
  }
`;

export default Card;
