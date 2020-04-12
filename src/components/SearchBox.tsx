import { h, FunctionalComponent } from 'preact';
import { Link } from 'preact-router/match';
import styled from 'styled-components';
import media from 'styled-media-query';
import { AppContainer } from '../containers';
import images from '../assets/images/*.png';
import { Colors, Industries, Purposes, Prefectures } from '../shared';
import { BASE_URL, Meta } from '../constants';
import { useState } from 'preact/hooks';

const SearchBox: FunctionalComponent = () => {
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
        <div class="subtitle">
          <a
            href="https://twitter.com/search?q=%23%E6%B0%91%E9%96%93%E8%A3%9C%E5%8A%A9%E9%87%91%E3%83%8A%E3%83%93"
            target="_blank"
            rel="noopener noreferrer"
          >
            #事業者向け支援情報ナビ
          </a>
        </div>
      </h1>
      <div class="searchboxid">
        <input
          type="text"
          id="searchbox"
          placeholder="検索する単語をご入力ください"
          value={word || (!isChanged ? params?.q : '')}
          onChange={handleChangeWord}
          onKeyDown={handleKeyDown}
        />
        <div className="select-box">
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
          <select name="purposes" onChange={handleChangeSelect('purpose')}>
            <option value={null} selected>
              目的の種類で絞る
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
        <span class="sitedesc">
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
          <Link href="/about">このサイトについて</Link>
          <div className="share">
            <div>
              <a
                href="https://twitter.com/share?ref_src=twsrc%5Etfw"
                class="twitter-share-button"
                data-text={Meta.title + ' | ' + Meta.description}
                data-url={BASE_URL}
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
                data-url={BASE_URL}
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
                data-href={BASE_URL}
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
      color: ${Colors.textGray};
      font-size: 30px;
      font-weight: normal;
      margin-top: -8px;
      ${media.lessThan('small')`
        margin-top: 0;
      `}
      > a {
        color: ${Colors.white} !important;
        text-decoration: none;
      }
    }
  }
  > .searchboxid {
    text-align: center;
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
      margin-bottom: 30px;
    }
    > input {
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
    }
  }
  ${media.lessThan('small')`
    > h1  {
      padding: 30px 0 20px;
      > img {
        width: 70vw;
      }
      > .subtitle {
        font-size: 24px;
      }
    }
    .searchboxid {
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
        font-size: 9px;
        margin-bottom: 30px;
      }
    }
  `}
`;

export default SearchBox;
