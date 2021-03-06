import * as React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { fonts } from '../../styles/variables'

interface ColorSwatchProps {
  weight?: number
  fontFamily?: 'sans' | 'monospace'
}

const TypographySpecimen: React.FC<ColorSwatchProps> = ({ children, fontFamily, weight }) => (
  <Text weight={weight} fontFamily={fontFamily}>
    {children}
  </Text>
)

TypographySpecimen.defaultProps = {
  weight: 400,
  fontFamily: 'sans'
}

export default TypographySpecimen

const MonospaceText = (props: ColorSwatchProps) => css`
  font-weight: ${props.weight};
  font-family: ${fonts.monospace};
`

const SansText = (props: ColorSwatchProps) => css`
  font-size: 2rem;
  font-weight: ${props.weight};
  font-family: ${fonts.sansSerif};
`

const Text = styled('div')`
  ${(props: ColorSwatchProps) => props.fontFamily === 'sans' && SansText(props)}
  ${(props: ColorSwatchProps) => props.fontFamily === 'monospace' && MonospaceText(props)}
`
