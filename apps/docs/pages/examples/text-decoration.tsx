import { useState } from 'react'
import Link from 'next/link'
import { Editor, Inputs, styled, codegen } from '@compai/css-gui'
import { defaultTheme } from '../../data/default-theme'
import { Container } from '../../components/Container'

const initialStyles = {
  textDecorationColor: 'primary',
  textDecorationThickness: {
    value: 8,
    unit: 'px',
  },
  textDecorationLine: 'underline',
  textDecorationStyle: 'wavy',
  // Font
  fontSize: {
    value: 3,
    unit: 'rem',
  },
  letterSpacing: {
    value: 'initial',
    unit: 'keyword',
  },
  lineHeight: {
    value: '1.25',
    unit: 'number',
  },
  fontFamily: 'Space Mono',
}

export default function TextDecoration() {
  const [styles, setStyles] = useState<any>(initialStyles)

  return (
    <>
      <div
        sx={{
          display: 'flex',
          py: [2, 3, 4],
          borderTopWidth: 'thin',
        }}
      >
        <div sx={{ px: [2, 3, 4] }}>
          <Editor styles={styles} onChange={setStyles} theme={defaultTheme}>
            <>
              <section sx={{ display: 'grid', gap: '.5rem', width: '240px' }}>
                <h3 sx={{ my: 0 }}>Text Decoration</h3>
                <Inputs.TextDecorationColor />
                <Inputs.TextDecorationLine />
                <Inputs.TextDecorationThickness />
                <Inputs.TextDecorationSkipInk />
                <Inputs.TextDecorationStyle />
              </section>
              <section sx={{ display: 'grid', gap: '.5rem', width: '240px' }}>
                <h3 sx={{ mt: 4, mb: 0 }}>Font</h3>
                <Inputs.FontFamily />
                <Inputs.FontSize />
                <Inputs.LineHeight />
                <Inputs.LetterSpacing />
              </section>
            </>
          </Editor>
        </div>
        <div sx={{ flexGrow: 1, padding: 5 }}>
          <styled.p styles={styles}>
            “The parameters comprise sequences which are theoretically infinite
            but limits are, of course, set to them in practice.“
            <br /> 
            <em sx={{ fontSize: '50%' }}>
              In{' '}
              <Link
                href="https://www.lars-mueller-publishers.com/designing-programmes-0"
                passHref={true}
              >
                <a style={{ color: 'inherit' }}>Designing Programmes</a>
              </Link>{' '}
              by Karl Gerstner
            </em>
          </styled.p>
        </div>
      </div>
      <div>
        <pre
          sx={{
            p: [2, 3, 4],
            borderTop: 'thin solid',
            borderColor: 'border',
            width: '100%',
            fontSize: 3,
          }}
        >
          {codegen.css(styles)}
        </pre>
      </div>
    </>
  )
}
