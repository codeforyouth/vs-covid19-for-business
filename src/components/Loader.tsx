import { h, FunctionalComponent } from 'preact';
import styled from 'styled-components';
import LoaderImage from '../assets/images/loader.svg';

const Loader: FunctionalComponent = () => (
  <Wrapper>
    <img src={LoaderImage} alt="読込中" />
  </Wrapper>
);

export default Loader;

const Wrapper = styled.div`
  width: 100%;
  > img {
    filter: invert(50%) sepia(0%) saturate(11%) hue-rotate(143deg)
      brightness(101%) contrast(93%);
    margin: 120px auto;
    width: 80px;
    height: 80px;
  }
`;
