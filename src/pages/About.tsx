import { h, FunctionalComponent, ComponentChild } from 'preact';
import { Link } from 'preact-router/match';
import { useEffect } from 'preact/hooks';
import styled from 'styled-components';
import media from 'styled-media-query';
import { useScroll } from '../hooks';
import GlobalStyle from '../styles';
import { Header } from '../components';
import { Colors } from '../shared';
import images from '../assets/images/*.png';
import { RouteProps } from '../typings';

const About: FunctionalComponent<RouteProps & ComponentChild> = props => {
  const { scrollToTop } = useScroll();
  useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <div>
      <GlobalStyle />
      <PageContainer>
        <div className="content">
          <h1 id="title">
            <Link href="/">
              <img src={images.title} alt="VS COVID-19" />
              <span class="subtitle">#事業者向け支援情報ナビ</span>
            </Link>
          </h1>
          <Header path={props.path} />
          <div className="card">
            <section>
              <h3>本サイトについて</h3>
              <p>
                新型コロナウイルス感染症対策に関する事業者向け政府支援制度情報の提供情報をまとめたサイトです。
                <a
                  href="https://docs.google.com/spreadsheets/d/1R1tS27iOfJe0fryN6mc_0Sz6lkE3846_jWEeVlz9cpc/edit?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  行政の支援制度データ(スプレッドシート)
                </a>
                のデータが統合された
                <a
                  href="https://jirei-seido-api.mirasapo-plus.go.jp/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  API
                </a>
                を利用し、より簡単に必要な支援情報が見つけられることを目的にし独自に制作された検索サイトです。支援情報の詳細は「アクセスする」をクリックすると
                <a
                  href="https://seido-navi.mirasapo-plus.go.jp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  経済産業省 中小企業庁 ミラサポPlus
                </a>
                に飛びます。データについての詳細は総務省発表の
                <a
                  href="https://www.soumu.go.jp/menu_news/s-news/01ryutsu06_02000243.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  プレスリリース
                </a>
                を参照してください。
              </p>
            </section>
            <section className="top-margin">
              <h3>利用にするにあたって</h3>
              <p>
                推奨ブラウザは、Chrome/Safariの最新版です。ブラウザによっては、動作しないことがあります。データの不整合や質問などは上に説明させていただいた通り提供されているAPIを通してオープンデータを描画しているため本サイト/運営者ではお答えできないことを予めご了承ください。万が一情報が不正確であったことおよび誤植があったことにより生じた損害、不利益等についてはいかなる場合もその責任を一切負わないものとします。その他サイトの改善点や質問/提案などは
                <a
                  href="https://github.com/codeforyouth/vs-covid19-for-business/issues/new"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHubのissue
                </a>
                を通し投稿いただけます。コードを公開しているので誰でもご参加いただけます。また支援情報の問い合わせ等については直接支援団体にお問い合わせ下さい。
              </p>
            </section>
            <section className="top-margin">
              <h3>開発者</h3>
              <p>
                ・
                <a
                  href="https://twitter.com/yokinist"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @yokinist
                </a>{' '}
                / Code for Youth
              </p>
            </section>
          </div>
        </div>
      </PageContainer>
    </div>
  );
};

export default About;

const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${Colors.bgLightGray};
  display: flex;
  justify-content: center;
  > .content {
    > h1 {
      margin: 0;
      width: 100vw;
      padding: 30px 0 36px;
      color: white;
      text-align: center;
      background-color: ${Colors.green};
      ${media.lessThan('small')`
        padding: 40px 0 36px;
      `}
      > a {
        > img {
          width: 480px;
          margin: 0 auto;
          ${media.lessThan('small')`
            width: 70vw;
          `}
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
        }
      }
    }
    > .card {
      max-width: 800px;
      color: ${Colors.textBlack};
      background-color: ${Colors.white};
      border-radius: 6px;
      padding: 30px;
      margin: 30px auto;
      box-shadow: 0px 1px 18px rgba(0, 0, 0, 0.04);
      ${media.lessThan('small')`
        padding: 24px;
        margin: 36px 18px;
      `}
      a {
        color: ${Colors.purple};
        text-decoration: underline;
      }
      > section {
        h3 {
          margin-bottom: 8px;
        }
        hr {
          margin-bottom: 16px;
        }
        ${media.lessThan('small')`
          p {
            font-size: 14px;
          }
        `}
      }
      > section.top-margin {
        margin-top: 12px;
      }
    }
  }
`;
