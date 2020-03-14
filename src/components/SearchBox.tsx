import { h, FunctionalComponent } from 'preact';
import styled from 'styled-components';
import { AppContainer } from '../containers';
import images from '../assets/images/*.png';
import { Colors } from '../shared';

const SearchBox: FunctionalComponent = () => {
  const { word, handleSetWord } = AppContainer.useContainer();
  const handleChangeWord = (
    e: h.JSX.TargetedEvent<HTMLInputElement, InputEvent>,
  ): void => handleSetWord((e.target as HTMLInputElement)?.value);
  return (
    <Container>
      <h1 id="title">
        <img src={images.title} alt="VS COVID-19" />
        <div class="subtitle">
          <a href="https://twitter.com/search?q=%23%E6%B0%91%E9%96%93%E6%94%AF%E6%8F%B4%E6%83%85%E5%A0%B1%E3%83%8A%E3%83%93">
            #民間支援情報ナビ
          </a>
        </div>
      </h1>
      <div class="searchboxid">
        <span class="sitedesc">
          企業等による新型コロナウイルス感染症対策支援サービスをまとめました（出典:
          <a href="https://docs.google.com/spreadsheets/d/1IiHUk3D_b6e5BfqFG3ZBxQ8X-QVACdY7CeQeG6C7S1w/">
            政府オープンデータ
          </a>
        </span>
        <input
          type="text"
          id="searchbox"
          placeholder="検索する単語をご入力ください"
          value={word}
          onChange={handleChangeWord}
        />
      </div>
    </Container>
  );
};

const Container = styled.div`
  background-color: ${Colors.yellow};
  > h1 {
    margin: 0;
    padding: 0.8em 0.3em 0.1em 0.3em;
    color: white;
    text-align: center;
    font-size: 7vw;
    > img {
      width: 50vw;
      margin: 0 auto;
    }
    > .subtitle {
      color: ${Colors.textBlack};
      font-size: 3vw;
      > a {
        color: ${Colors.textBlack} !important;
        text-decoration: none;
      }
    }
  }
  > .searchboxid {
    text-align: center;
    > .sitedesc {
      font-size: 80%;
      display: inline-block;
      width: 80vw;
      > a {
        color: black !important;
      }
    }
    > input {
      width: 60vw;
      margin: 0.5em 0.2em 0.2em 0.5em;
      font-size: 24px;
      border: 2px solid black;
      line-height: 1.3em;
      padding: 0.1em 0.3em;
      margin-bottom: 16px;
    }
  }
`;

export default SearchBox;
