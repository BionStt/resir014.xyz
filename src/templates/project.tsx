import * as React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'

import { SiteMetadata, HCardIcon } from '../types/gatsby'

import Container from '../components/ui/Container'
import PageSubtitle from '../components/page/PageSubtitle'
import ProjectFooter from '../components/projects/ProjectFooter'
import TemplateWrapper from '../layouts'

import { Button } from '../chungking/components/ui'
import {
  Page,
  PageHeader,
  PageTitle,
  PageContent,
  MarkdownContent,
  PageMeta,
  PageMetaItem,
  PageThumbnail,
  PageThumbnailImage
} from '../chungking/components/page'

interface ProjectTemplateProps {
  data: {
    site: {
      siteMetadata: SiteMetadata
    }
    icon: HCardIcon
    markdownRemark: {
      html: string
      excerpt: string
      fields: {
        category: string
        year: string
        slug: string
        layout?: string
        headerImage?: string
        description?: string
        lead?: string
        project_url: string
        jumpToProject: string
      }
      frontmatter: {
        title: string
        path?: string
        layout: string
        header_image?: {
          childImageSharp: {
            fluid: { [key: string]: any }
          }
        }
      }
    }
  }
}

const ProjectPageTemplate: React.SFC<ProjectTemplateProps> = ({ data }) => {
  const post = data.markdownRemark
  const { siteMetadata } = data.site

  return (
    <TemplateWrapper>
      <Page>
        <Helmet
          title={`${post.frontmatter.title} · ${siteMetadata.title}`}
          meta={[
            { name: 'description', content: post.excerpt },
            { name: 'author', content: siteMetadata.author.name },
            { property: 'og:title', content: post.frontmatter.title },
            {
              property: 'og:description',
              content: post.fields.lead || post.excerpt
            }
          ]}
        />
        <article className="h-entry">
          {post.frontmatter.header_image ? (
            <Container size="xl">
              <PageThumbnail>
                <PageThumbnailImage
                  fluid={post.frontmatter.header_image.childImageSharp.fluid}
                  alt={post.frontmatter.title}
                />
              </PageThumbnail>
              <PageHeader
                hasImage
                metaItem={
                  <PageMeta>
                    <PageMetaItem className="p-category">projects</PageMetaItem>
                    <PageMetaItem>{post.fields.year}</PageMetaItem>
                    {post.fields.category ? (
                      <PageMetaItem>{post.fields.category}</PageMetaItem>
                    ) : null}
                  </PageMeta>
                }
              >
                <PageTitle className="p-name">{post.frontmatter.title}</PageTitle>
                {post.fields.lead || post.fields.description ? (
                  <PageSubtitle className="p-summary">
                    {post.fields.lead || post.fields.description}
                  </PageSubtitle>
                ) : null}
              </PageHeader>
            </Container>
          ) : (
            <PageHeader>
              <PageMeta>
                <PageMetaItem className="p-category">projects</PageMetaItem>
                <PageMetaItem>{post.fields.year}</PageMetaItem>
                {post.fields.category ? <PageMetaItem>{post.fields.category}</PageMetaItem> : null}
              </PageMeta>
              <PageTitle className="p-name">{post.frontmatter.title}</PageTitle>
              {post.fields.lead || post.fields.description ? (
                <PageSubtitle className="p-summary">
                  {post.fields.lead || post.fields.description}
                </PageSubtitle>
              ) : null}
            </PageHeader>
          )}
          <PageContent>
            <Container>
              <MarkdownContent className="e-content" html={post.html} />
              {post.fields.jumpToProject === 'true' || post.fields.project_url ? (
                <ProjectFooter>{renderLink(post.fields.project_url, true)}</ProjectFooter>
              ) : null}
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

const renderLink = (url: string, jumpToProject: boolean) => (
  <Button
    kind="link"
    color="primary"
    size="lg"
    href={url}
    target={jumpToProject ? '_blank' : undefined}
    rel={jumpToProject ? 'noopener noreferrer' : undefined}
  >
    Visit project
  </Button>
)

export default ProjectPageTemplate

export const pageQuery = graphql`
  query ProjectPageQuery($slug: String!) {
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
        category
        year
        slug
        layout
        description
        lead
        project_url
        jumpToProject
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
