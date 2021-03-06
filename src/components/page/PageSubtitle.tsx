import * as React from 'react'
import styled from '@emotion/styled'

import { getEmSize } from '../../styles/mixins'
import { emSizes, pxSizes } from '../../styles/variables'

interface PageSubtitleProps {
  className?: string
}

const PageSubtitle: React.SFC<PageSubtitleProps> = ({ className, children }) => {
  return <Text className={className}>{children}</Text>
}

export default PageSubtitle

const Text = styled('p')`
  margin-top: 0.5rem;
  font-size: ${emSizes.headingSmall.h4}rem;
  font-weight: 300;

  @media (min-width: ${getEmSize(pxSizes.breakpoints.md)}) {
    font-size: ${emSizes.headingMedium.h4}rem;
  }

  @media (min-width: ${getEmSize(pxSizes.breakpoints.lg)}) {
    font-size: ${emSizes.headingLarge.h4}rem;
  }
`
