import { h, FunctionalComponent, ComponentChild } from 'preact';
import { useState } from 'preact/hooks';
import styled from 'styled-components';
import media from 'styled-media-query';
import { AppContainer } from '../containers';
import images from '../assets/images/*.png';
import { Colors, Industries, Purposes, Prefectures } from '../shared';
import { BASE_URL, Meta } from '../constants';
import { RouteProps } from '../typings';

const SearchBox: FunctionalComponent<RouteProps & ComponentChild> = props => {
  const [isChanged, toggleIsChanged] = useState(false);
  const { params, setParams, word, setWord } = AppContainer.useContainer();

  const handleChangeWord = (
    e: h.JSX.TargetedEvent<HTMLInputElement, InputEvent>,
  ): void => {
    !isChanged && toggleIsChanged(true);
    const value = (e.target as HTMLInputElement)?.value;
    setWord(value === '' ? null : value);
  };

  const handleChangeSelect = (key: 'purpose' | 'industry' | 'prefecture') => (
    e: h.JSX.TargetedEvent<HTMLSelectElement, InputEvent>,
  ): void => {
    let value = (e.target as HTMLSelectElement)?.value;
    value = value === '' ? null : value;
    setParams(prevParams => ({
      ...prevParams,
      purpose_category:
        key === 'purpose' ? Number(value) || null : prevParams.purpose_category,
      industry_category:
        key === 'industry'
          ? Number(value) || null
          : prevParams.industry_category,
      'prefecture.name':
        key === 'prefecture' ? value : prevParams['prefecture.name'],
    }));
  };

  const handleKeyDown = (e: KeyboardEvent): void => {
    if (e.keyCode === 13) {
      setParams(prevParams => ({
        ...prevParams,
        q: word,
      }));
    }
  };

  return (
    <Container>
      <h1 id="title">
        <img src={images.title} alt="VS COVID-19" />
        <span class="subtitle">#事業者向け支援情報ナビ</span>
      </h1>
      <div class="search">
        <input
          type="text"
          id="searchbox"
          placeholder="検索する単語をご入力ください"
          value={word || (!isChanged ? params?.q : '')}
          onChange={handleChangeWord}
          onKeyDown={handleKeyDown}
        />
        <div className="select-box">
          <div className="select-wrapper">
            <select name="industries" onChange={handleChangeSelect('industry')}>
              <option value={null} selected>
                業種で絞る
              </option>
              {Industries.map(industry => (
                <option
                  key={industry.value}
                  value={industry.value}
                  selected={params.industry_category === industry.value}
                >
                  {industry.name}
                </option>
              ))}
            </select>
          </div>
          <div className="select-wrapper half">
            <select name="purposes" onChange={handleChangeSelect('purpose')}>
              <option value={null} selected>
                用途で絞る
              </option>
              {Purposes.map(purpose => (
                <option
                  key={purpose.value}
                  value={purpose.value}
                  selected={params.purpose_category === purpose.value}
                >
                  {purpose.name}
                </option>
              ))}
            </select>
          </div>
          <div className="select-wrapper half">
            <select
              name="prefectures"
              onChange={handleChangeSelect('prefecture')}
            >
              <option value={null} selected>
                都道府県で絞る
              </option>
              {Prefectures.map((pref, i) => (
                <option
                  key={i}
                  value={pref}
                  selected={pref === params['prefecture.name']}
                >
                  {pref}
                </option>
              ))}
            </select>
          </div>
        </div>
        <span class="sitedesc">
          <br />
          （出典:
          <a
            href="https://docs.google.com/spreadsheets/d/1R1tS27iOfJe0fryN6mc_0Sz6lkE3846_jWEeVlz9cpc/edit#gid=0"
            target="_blank"
            rel="noopener noreferrer"
          >
            政府オープンデータ
          </a>
          )
          <br />
          <div className="share">
            <div>
              <a
                href="https://twitter.com/share?ref_src=twsrc%5Etfw"
                class="twitter-share-button"
                data-text={Meta.title + ' | ' + Meta.description}
                data-url={BASE_URL + props.url}
                data-lang="ja"
                data-size="small"
              />
              <script
                async
                src="https://platform.twitter.com/widgets.js"
                charSet="utf-8"
              />
            </div>
            <div>
              <div
                class="line-it-button"
                data-lang="ja"
                data-type="share-a"
                data-ver="3"
                data-url={BASE_URL + props.url}
                data-color="default"
                data-size="small"
                data-count="false"
                style="display: none;"
              />
              <script
                src="https://d.line-scdn.net/r/web/social-plugin/js/thirdparty/loader.min.js"
                async
                defer
              />
            </div>
            <div>
              <div
                class="fb-like"
                data-href={BASE_URL + props.url}
                data-width=""
                data-layout="button"
                data-action="like"
                data-size="small"
                data-share="true"
              />
            </div>
          </div>
        </span>
      </div>
    </Container>
  );
};

const Container = styled.div`
  background-color: ${Colors.green};
  > h1 {
    margin: 0;
    padding: 30px 0 20px;
    color: white;
    text-align: center;
    > img {
      width: 480px;
      margin: 0 auto;
    }
    > .subtitle {
      color: ${Colors.white};
      display: block;
      font-size: 30px;
      font-weight: normal;
      margin-top: -8px;
      ${media.lessThan('small')`
        margin-top: 0;
        font-size: 24px;
      `}
      > a {
        color: ${Colors.white} !important;
        text-decoration: none;
      }
    }
  }
  > .search {
    text-align: center;
    > input#searchbox {
      width: 60vw;
      max-width: 800px;
      margin: 0.5em 0.2em 0.2em 0.5em;
      font-size: 24px;
      border-radius: 48px;
      border: 2px solid ${Colors.borderGray};
      line-height: 1.3em;
      padding: 16px 24px;
      margin-bottom: 8px;
      box-shadow: 0px 1px 18px rgba(0, 0, 0, 0.04);
      ${media.lessThan('small')`
        width: 95vw;
        font-size: 18px;
      `}
    }
    > .select-box {
      display: flex;
      justify-content: center;
      ${media.lessThan('small')`
        flex-direction: row;
        flex-wrap: wrap;
        width: 95vw;
        margin: 0 auto;
        .select-wrapper {
          font-size: 13px;
          &.half {
            width: 40vw;
          }
        }
      `}
      .select-wrapper {
        overflow: hidden;
        text-align: center;
        position: relative;
        border-radius: 2px;
        margin: 8px;
        border: 2px solid ${Colors.white};
        border-radius: 50px;
        background: transparent;
        &::before {
          position: absolute;
          top: 17px;
          right: 17px;
          width: 0;
          height: 0;
          padding: 0;
          content: '';
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 6px solid ${Colors.white};
          pointer-events: none;
        }
        > select {
          width: 100%;
          cursor: pointer;
          text-indent: 0.01px;
          text-overflow: ellipsis;
          border: none;
          outline: none;
          background: transparent;
          background-image: none;
          box-shadow: none;
          -webkit-appearance: none;
          appearance: none;
          padding: 8px 32px 8px 16px;
          color: ${Colors.white};
        }
      }
    }

    > .sitedesc {
      color: ${Colors.white};
      width: 100%;
      display: inline-block;
      > a {
        color: ${Colors.white} !important;
        text-decoration: underline;
      }
      > .share {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        margin: 8px 0;
        > div {
          margin: 2px;
        }
      }
    }

    > span {
      font-size: 12px;
      line-height: 170%;
      color: ${Colors.textBlack};
    }
  }
  ${media.lessThan('small')`
    > h1  {
      padding: 40px 0 20px;
      > img {
        width: 70vw;
      }
      > .subtitle {
        font-size: 24px;
      }
    }
    .search {
      > input {
        width: 90vw;
        margin: 0.5em 0.2em 0.2em 0.5em;
        font-size: 16px;
        border-radius: 48px;
        border: 2px solid ${Colors.borderGray};
        line-height: 1.3em;
        padding: 16px 24px;
        margin-bottom: 8px;
      }
      > .sitedesc {
        padding: 0 20px;
        font-size: 11px;
        /* margin-bottom: 30px; */
      }
    }
  `}
`;

export default SearchBox;
