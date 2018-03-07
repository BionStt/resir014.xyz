import * as React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import { menuItems } from '../utils/menus'
import { SiteAuthor } from '../utils/types'
import { colors } from '../styles/variables'

import Container from '../components/ui/Container'
import Divider from '../components/ui/Divider'
import Page from '../components/page/Page'
import PostMeta from '../components/post/PostMeta'
import PostHeader from '../components/post/PostHeader'
import PostMetaItem from '../components/post/PostMetaItem'
import PageContent from '../components/page/PageContent'
import PageSubtitle from '../components/page/PageSubtitle'
import PostTitle from '../components/post/PostTitle'
import MarkdownContent from '../components/page/MarkdownContent'
import HCardPostFooter from '../components/indieweb/HCardPostFooter'

interface BookmarkTemplateProps {
  location: {
    pathname: string
  }
  data: {
    site: {
      siteMetadata: {
        title: string
        description: string
        siteUrl: string
        author: SiteAuthor
      }
    }
    icon: {
      sizes: { [key: string]: any }
    }
    markdownRemark: {
      html: string
      excerpt: string
      fields: {
        slug: string
        layout?: string
        category?: string
        link?: string
        lead?: string
        date: string
        date_ogp?: string
      }
      frontmatter: {
        title: string
        path?: string
        layout: string
      }
    }
  }
}

const LinkTitle = styled(PostTitle)`
  a {
    color: ${colors.blue60};

    &:hover,
    &:focus {
      color: ${colors.blue70};
    }
  }
`

const BookmarkTemplate: React.SFC<BookmarkTemplateProps> = ({ data, location }) => {
  const post = data.markdownRemark
  const { siteMetadata } = data.site
  const { author } = siteMetadata
  const { pathname } = location

  return (
    <Page>
      <Helmet
        title={`${post.frontmatter.title || 'Bookmark posted by @resir014'} · ${
          siteMetadata.title
        }`}
        meta={[
          { name: 'description', content: post.fields.lead || post.excerpt },
          { name: 'author', content: siteMetadata.author.name },
          {
            property: 'og:title',
            content: post.frontmatter.title || 'Bookmark posted by @resir014'
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
        <PostHeader>
          <PostMeta>
            <PostMetaItem>
              <time
                className="dt-published"
                dateTime={new Date(post.fields.date_ogp).toISOString()}
              >
                {post.fields.date}
              </time>
            </PostMetaItem>
            {post.fields.category ? (
              <PostMetaItem className="p-category">{post.fields.category}</PostMetaItem>
            ) : null}
            <LinkTitle>
              <a
                className="u-bookmark-of h-cite p-name"
                href={post.fields.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {post.frontmatter.title}
              </a>{' '}
              &raquo;
            </LinkTitle>
          </PostMeta>
        </PostHeader>
        <PageContent>
          <Container>
            {post.fields.lead ? <PageSubtitle>{post.fields.lead}</PageSubtitle> : null}
            <MarkdownContent className="e-content p-name" html={post.html} />
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
          <Divider spacing="large" />
          <Container>
            <HCardPostFooter icon={data.icon} author={data.site.siteMetadata.author} />
          </Container>
        </PageContent>
      </article>
    </Page>
  )
}

export default BookmarkTemplate

export const query = graphql`
  query BookmarkTemplateQuery($slug: String!) {
    site {
      siteMetadata {
        title
        description
        siteUrl
        author {
          name
          description
          website
          url {
            twitter
            instagram
            tumblr
            github
          }
        }
      }
    }
    icon: imageSharp(id: { regex: "/assets/images/resir014-icon.jpg/" }) {
      sizes(maxWidth: 400, maxHeight: 400) {
        ...GatsbyImageSharpSizes
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
      }
    }
  }
`
