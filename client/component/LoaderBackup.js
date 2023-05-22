import styled from 'styled-components'

const LoaderOverlay = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: absolute;
  inset: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);

  /* visibility: ${(props) => (props.isReady ? 'hidden' : 'visible')}; */
  transition: all 1s ease-in-out;
`

const LoaderComponent = styled.div`
  display: inline-block;
  width: 80px;
  height: 80px;

  &:after {
    content: ' ';
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #fff;
    border-color: #fff transparent #fff transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }

  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

export default function LoaderBackup({ className, isReady }) {
  return (
    <LoaderOverlay className={'loader ' + className || ''}>
      <LoaderComponent></LoaderComponent>
    </LoaderOverlay>
  )
}
