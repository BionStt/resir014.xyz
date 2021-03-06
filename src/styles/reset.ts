// tslint:disable:no-unused-expression

import { css } from '@emotion/core'
import { colors, fonts, pxSizes, emSizes } from './variables'
import { getEmSize } from './mixins'

const GlobalStyles = css`
  html {
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  html,
  body {
    margin: 0;
    padding: 0;
    height: 100%;
  }

  html {
    font-family: ${fonts.sansSerif};
    font-size: ${pxSizes.fontSize.regular}px;
    line-height: ${emSizes.lineHeight.regular};
  }

  body {
    color: ${colors.grey10};
    background-color: ${colors.black};
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
  }

  a {
    color: inherit;
    text-decoration: none;

    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }

  img {
    display: block;
    max-width: 100%;
    margin: 0 0 1rem;
  }

  figure {
    margin: 2rem 0;
  }

  figcaption {
    font-size: 80%;
  }

  code,
  pre {
    font-family: ${fonts.monospace};
  }

  #___gatsby {
    height: 100% !important;
  }

  table {
    margin-bottom: 1rem;
    width: 100%;
    font-size: 85%;
    border: 1px solid ${colors.grey20};
    border-collapse: collapse;

    td,
    th {
      padding: 0.25rem 0.5rem;
      border: 1px solid ${colors.grey20};
    }

    th {
      text-align: left;
    }

    tbody tr:nth-child(odd) td,
    tbody tr:nth-child(odd) th {
      background-color: ${colors.grey10};
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 1.414rem;
    margin-bottom: 1rem;
    font-family: ${fonts.serif};
    font-weight: 600;
    line-height: 1.2;
    color: ${colors.white};
    text-rendering: optimizeLegibility;
  }

  h1 {
    margin-top: 0;
    font-size: ${emSizes.headingSmall.h1}rem;

    @media (min-width: ${getEmSize(pxSizes.breakpoints.md)}) {
      font-size: ${emSizes.headingMedium.h1}rem;
    }

    @media (min-width: ${getEmSize(pxSizes.breakpoints.lg)}) {
      font-size: ${emSizes.headingLarge.h1}rem;
    }
  }

  h2 {
    font-size: ${emSizes.headingSmall.h2}rem;

    @media (min-width: ${getEmSize(pxSizes.breakpoints.md)}) {
      font-size: ${emSizes.headingMedium.h2}rem;
    }

    @media (min-width: ${getEmSize(pxSizes.breakpoints.lg)}) {
      font-size: ${emSizes.headingLarge.h2}rem;
    }
  }

  h3 {
    font-size: ${emSizes.headingSmall.h3}rem;

    @media (min-width: ${getEmSize(pxSizes.breakpoints.md)}) {
      font-size: ${emSizes.headingMedium.h3}rem;
    }

    @media (min-width: ${getEmSize(pxSizes.breakpoints.lg)}) {
      font-size: ${emSizes.headingLarge.h3}rem;
    }
  }

  h4,
  h5,
  h6 {
    font-size: ${emSizes.headingSmall.h4}rem;

    @media (min-width: ${getEmSize(pxSizes.breakpoints.md)}) {
      font-size: ${emSizes.headingMedium.h4}rem;
    }

    @media (min-width: ${getEmSize(pxSizes.breakpoints.lg)}) {
      font-size: ${emSizes.headingLarge.h4}rem;
    }
  }

  p {
    margin: 0 0 1rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  small {
    font-size: 0.75rem;
  }

  strong {
    color: ${colors.white};
  }

  ul,
  ol,
  dl {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  dt {
    font-weight: bold;
  }

  dd {
    margin-left: 0;
    margin-bottom: 0.5rem;
  }

  hr {
    position: relative;
    margin: 1.5rem 0;
    border: 0;
    border-bottom: 1px solid ${colors.grey30};
  }

  abbr {
    font-size: 85%;
    font-weight: bold;

    &[title] {
      cursor: help;
      border-bottom: 1px dotted ${colors.grey30};
    }
  }

  blockquote {
    padding: 0 1rem;
    margin: 1rem 0;
    color: ${colors.grey40};
    border-left: 0.25rem solid ${colors.grey80};

    &:first-child {
      margin-top: 0;
    }

    p:last-child {
      margin-bottom: 0;
    }

    @media (min-width: ${getEmSize(pxSizes.breakpoints.sm)}) {
      padding-right: 5rem;
      padding-left: 1.25rem;
    }
  }

  .hidden {
    display: none;
  }

  code {
    padding: 0 0.25em;
    font-size: 90%;
    color: ${colors.magenta30};
    background-color: ${colors.grey10};
    border-radius: 3px;
  }

  pre {
    margin-top: 0;
    margin-bottom: 1rem;
    overflow-x: auto;
  }

  pre code {
    padding: 0;
    font-size: 100%;
    color: inherit;
    background-color: transparent;
  }

  .responsive-embed {
    position: relative;
    padding-top: 25px;
    padding-bottom: 56.25%;
    height: 0;

    div,
    embed,
    object {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
    }
  }
`

export default GlobalStyles
