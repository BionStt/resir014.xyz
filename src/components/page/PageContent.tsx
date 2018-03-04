import * as React from 'react'
import styled from 'styled-components'

import { emSizes } from '../../styles/variables'
import { media } from '../../styles/mixins'

const StyledPageContent = styled.div`
  display: block;
  padding: ${emSizes.containerPadding}rem;
  padding-bottom: 3rem;

  ${media.lg`
    padding-top: 3rem
  `}
`

interface PageContentProps {
  className?: string
}

const PageContent: React.SFC<PageContentProps> = ({ children, className }) => (
  <StyledPageContent className={className}>{children}</StyledPageContent>
)

export default PageContent