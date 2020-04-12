/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { h, FunctionalComponent } from 'preact';
import styled from 'styled-components';
import media from 'styled-media-query';
import { Support } from '../typings';
import { Colors } from '../shared';
import DateRange from '@material-ui/icons/DateRange';
import Person from '@material-ui/icons/PermIdentity';
import { DETAIL_BASE_URL } from '../constants';

type Props = Support;
const Card: FunctionalComponent<Props> = props => {
  return (
    <a
      href={`${DETAIL_BASE_URL}/${props.id}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Container>
        <div className="top">
          <div className="tags">
            {props.service_categories?.length > 1 &&
              props.service_categories
                .filter((_, i) => i < 3)
                .map(service => (
                  <div key={service.id} className="item">
                    {service.name}
                  </div>
                ))}
            <div className="item">{props?.keywords[0]}</div>
          </div>
          <h2>{props.title}</h2>
          <p>{props.summary}</p>
          <div className="list">
            <div className="item">
              {props.reception_start_date && <DateRange />}
              <OneLine>
                {props.reception_start_date &&
                  `${props.reception_start_date}から`}
              </OneLine>
            </div>
            <div className="item">
              {props.target && <Person />}
              <OneLine>{props.target}</OneLine>
            </div>
          </div>
        </div>
        <div className="bottom">
          <div className="from">
            {'提供: ' +
              (props?.support_organization ||
                '不明(詳細はクリックで確認できます)')}
          </div>
          <div className="url">アクセスする</div>
        </div>
      </Container>
    </a>
  );
};

const OneLine = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  &:hover {
    white-space: normal;
  }
`;

const Container = styled.div`
  cursor: pointer;
  border-radius: 6px;
  box-shadow: 0px 1px 18px rgba(0, 0, 0, 0.04);
  background-color: ${Colors.white};
  margin: 1em 0;
  line-height: 1.8em;
  &:hover {
    box-shadow: 0px 1px 18px rgba(0, 0, 0, 0.12);
    > .bottom {
      > .url {
        background-color: ${Colors.green};
        color: ${Colors.white};
      }
    }
  }
  > .top {
    padding: 32px 20px;
    > p {
      color: ${Colors.textBlack};
    }
    > .tags {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      margin-bottom: 20px;
      > .type {
        margin: 0 8px 0 0;
      }
      > .item {
        padding: 4px 8px;
        margin-right: 8px;
        border-radius: 4px;
        color: ${Colors.textGray};
        background-color: ${Colors.bgLightGray};
      }
    }
    > h2 {
      margin-bottom: 16px;
      color: ${Colors.textBlack};
    }
    > .list {
      margin-top: 16px;
      > .item {
        display: flex;
        align-items: center;
        color: ${Colors.textBlack};
        &:nth-child(odd) {
          margin: 0px 8px 0px 0px;
        }
        > svg {
          font-size: 24px;
          color: ${Colors.textBlack};
          margin-right: 8px;
        }
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
      border: 1px solid ${Colors.green};
      background-color: ${Colors.white};
      font-weight: bold;
      text-align: center;
      padding: 8px 48px;
      font-weight: normal;
      display: block;
      text-decoration: none;
      color: ${Colors.green};
    }
  }
  ${media.lessThan('small')`
    > .top {
      padding: 32px 20px;
      > .tags {
        align-items: center;
        justify-content: flex-start;
        margin-bottom: 20px;
        > .type {
          margin: 4px 8px 4px 0;
        }
        > .item {
          margin: 4px 8px 4px 0;
        }
      }
    }
    > .bottom {
      padding: 20px;
      justify-content: center;
      > .from {
        margin-bottom: 12px;
        width: 100%;
        text-align: center;
      }
      > .url {
        margin-bottom: 8px;
      }
    }
  `}
`;

export default Card;
