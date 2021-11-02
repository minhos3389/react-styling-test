import React, { useState }  from 'react';
import styled, { keyframes, ThemeProvider, createGlobalStyle } from 'styled-components';

// 스타일의 영역을 넘어서 attribute까지 바꿀 수 있다.
const Input = styled.input.attrs(props => ({
  // 타입은 text
  type: "text",
  // size라는 props가 있으면 "1em" 으로 size지정.
  size: props.size || "1em",
  }))`

  border: 2px solid palevioletred;
  margin: ${props => props.size};
  padding: ${props => props.size};
`;

// Input's attrs will be applied first, and then this attrs obj
const PasswordInput = styled(Input).attrs({
  type: "password",
})`
  // similarly, border will override Input's border
  border: 2px solid aqua;
`;

// 애니메이션으로 keyframe이 필요.
// keyframes는 애니메이션을 사용하기 위한 도구 styled-components안에 들어있습니다.
// Create the keyframes
const rotate = keyframes`
  /* from에서 to로 움직입니다.  */
  /* 0도에서 360도로 회전 */
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

// Here we create a component that will rotate everything we pass in over two seconds
const Rotate = styled.div`
  display: inline-block;
  /* 2초 간격으로 무한히 돌도록 설정. template literal로 넣어줌.*/
  animation: ${rotate} 2s linear infinite;
  padding: 2rem 1rem;
  font-size: 1.2rem;
`;
//------------------테마---------------------------------

// Define our button, but with the use of props.theme this time
const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;

  /* Color the border and text with theme.main */
  color: ${props => props.theme.color};
  border: 2px solid ${props => props.theme.borderColor};
`;

// We are passing a default theme for Buttons that arent wrapped in the ThemeProvider

// Button.defaultProps = {
//   theme: {
//     color: "red",
//     borderColor: "orange"
//   }
// }

// Define what props.theme will look like
const defaultTheme = {
  color: "green",
  borderColor: "green"
};

const redTheme = {
  color: "red",
  borderColor: "red"
}

const GlobalStyle = createGlobalStyle`
  button {
    background-color: pink;
  }
`;


export default function StyledComponentsExample() {  
  // 이런식으로 화이트버전, 다크버전 할 수 있을 것.
  const [theme, setTheme] = useState(defaultTheme);
  return (
    <>
      <div>        
        {/* default props로 들어있던 size 2em을 overide 했습니다. */}
        <Input placeholder="A bigger text input" size="4em" />
        <br />
        
        <PasswordInput placeholder="A bigger password input" size="2em" />
        <Rotate>&lt; 💅🏾 &gt;</Rotate>
      </div>
      <div>
        {/* 전체 페이지에 적용해야 할 css를 이렇게 작성 */}
        <GlobalStyle />
        <button onClick={() => setTheme(redTheme)}>red</button>
        <button onClick={() => setTheme(defaultTheme)}>green</button>  

        {/* styled-components의 ThemeProvider는 Provider안에 value들 theme 값들을 children에게 주입. */}        
        <ThemeProvider theme={theme}>
          <Button>Normal</Button>
          <Button>Themed</Button>
        </ThemeProvider>
      </div>
      <div>
        {/* 전체페이지에 적용하는 GlobalStyle의 영향을 받았습니다. */}
        <button>하이</button>
      </div>
    </>
  );
}

