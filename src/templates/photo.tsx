import React from 'react'
import classnames from 'classnames'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import { SiteMetadata, HCardIcon } from '../types/gatsby'
import { PhotoNode } from '../types/nodes'

import TemplateWrapper from '../layouts'

import { Container } from '../components/ui'
import {
  Page,
  PageHeader,
  PageMeta,
  PageMetaItem,
  PageTitle,
  PageContent,
  MarkdownContent
} from '../components/page'
import { HCardPost } from '../components/indieweb'

interface PhotoTemplateProps {
  location: {
    pathname: string
  }
  data: {
    site: {
      siteMetadata: SiteMetadata
    }
    icon: HCardIcon
    markdownRemark: PhotoNode
  }
}

const PhotoTemplate: React.SFC<PhotoTemplateProps> = ({ data }) => {
  const post = data.markdownRemark
  const { siteMetadata } = data.site

  return (
    <TemplateWrapper>
      <Page>
        <Helmet
          title={`${post.frontmatter.title || 'Photo posted by @resir014'} · ${siteMetadata.title}`}
          meta={[
            { name: 'description', content: post.fields.lead || post.excerpt },
            { name: 'author', content: siteMetadata.author.name },
            {
              property: 'og:title',
              content: post.frontmatter.title || 'Photo posted by @resir014'
            },
            {
              property: 'og:description',
              content: post.fields.lead || post.excerpt
            },
            { property: 'og:type', content: 'article' },
            { property: 'og:article:author', content: siteMetadata.author.name },
            {
              property: 'og:article:published_time',
              content: post.fields.date_ogp
            }
          ]}
        />
        <article className="h-entry">
          <PageHeader>
            <PageMeta>
              <PageMetaItem>
                <time
                  className="dt-published"
                  dateTime={new Date(post.fields.date_ogp).toISOString()}
                >
                  {post.fields.date}
                </time>
              </PageMetaItem>
              {post.fields.category ? (
                <PageMetaItem className="p-category">{post.fields.category}</PageMetaItem>
              ) : null}
            </PageMeta>
            <HCardPost icon={data.icon.childImageSharp} author={data.site.siteMetadata.author} />
            {post.frontmatter.title && (
              <PageTitle className="p-name">{post.frontmatter.title}</PageTitle>
            )}
          </PageHeader>
          <PageContent>
            <Container>
              {post.frontmatter.header_image && (
                <img
                  className="u-photo"
                  src={post.frontmatter.header_image.childImageSharp.fluid.src}
                  alt={post.frontmatter.title || 'Photo posted by @resir014'}
                  srcSet={post.frontmatter.header_image.childImageSharp.fluid.srcSet}
                />
              )}
              <MarkdownContent
                className={classnames('e-content', !post.frontmatter.title && 'p-name')}
                html={post.html}
              />
              <div className="hidden">
                <p>
                  <a
                    className="u-url"
                    href={data.site.siteMetadata.siteUrl + data.markdownRemark.fields.slug}
                  >
                    Permalink
                  </a>
                </p>
              </div>
            </Container>
          </PageContent>
        </article>
      </Page>
    </TemplateWrapper>
  )
}

export default PhotoTemplate

export const pageQuery = graphql`
  query PhotoTemplateQuery($slug: String!) {
    site {
      siteMetadata {
        title
        description
        siteUrl
        author {
          name
          description
          website
          email
          url {
            twitter
            instagram
            tumblr
            github
          }
        }
      }
    }
    icon: file(absolutePath: { regex: "/assets/images/resir014-icon.jpg/" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fluid(maxWidth: 400, maxHeight: 400) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      fields {
        slug
        layout
        category
        link
        lead
        date(formatString: "DD MMMM YYYY")
        date_ogp: date
      }
      frontmatter {
        title
        header_image {
          childImageSharp {
            fluid(maxWidth: 1140) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
