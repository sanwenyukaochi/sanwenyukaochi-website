import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import styled from 'styled-components'

type CodeBlockProps = {
  code: string
  language: string
}

// 这个组件统一处理博客正文里的大代码块，页面只需要传入语言和代码内容。
export function CodeBlock({ code, language }: CodeBlockProps) {
  return (
    <CodeWindow>
      <CodeWindowBar>
        <TrafficLights aria-hidden="true">
          <span />
          <span />
          <span />
        </TrafficLights>
        <CodeLanguage>{language}</CodeLanguage>
      </CodeWindowBar>
      <StyledSyntaxHighlighter
        customStyle={codeBlockStyle}
        language={language}
        style={oneDark}
      >
        {code}
      </StyledSyntaxHighlighter>
    </CodeWindow>
  )
}

const CodeWindow = styled.div`
  overflow: hidden;
  margin: 1.4rem 0;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  background: #282c34;
  box-shadow:
    0 18px 40px rgba(15, 23, 42, 0.28),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);
`

const CodeWindowBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.58rem 0.9rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  background: linear-gradient(180deg, #353b45 0%, #2f343d 100%);
`

const TrafficLights = styled.div`
  display: inline-flex;
  gap: 0.45rem;

  span {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.55);
  }

  span:nth-child(1) {
    background: #ff5f57;
  }

  span:nth-child(2) {
    background: #febc2e;
  }

  span:nth-child(3) {
    background: #28c840;
  }
`

const CodeLanguage = styled.span`
  font-family: 'SF Mono', Monaco, Consolas, monospace;
  font-size: 0.76rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: #abb2bf;
`

const StyledSyntaxHighlighter = styled(SyntaxHighlighter)`
  margin: 0 !important;
  padding: 1rem 1.15rem 1.08rem !important;
  background: transparent !important;
  font-family: 'SF Mono', Monaco, Consolas, monospace !important;
  font-size: 1rem !important;
  line-height: 1.55 !important;
`

const codeBlockStyle = {
  margin: 0,
  background: 'transparent',
}
