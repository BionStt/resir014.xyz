import * as React from 'react'
import { graphql, Link } from 'gatsby'
import Helmet from 'react-helmet'

import { SiteMetadata, HeaderImage, HCardIcon } from '../types/gatsby'
import { ProjectField } from '../types/fields'
import { ProjectNode } from '../types/nodes'

import TemplateWrapper from '../layouts'

import filterProjectsByCategory from '../utils/filterProjectsByCategory'

import { Page } from '../components/page'
import { Button, Divider } from '../components/ui'
import { HCard } from '../components/indieweb'
import { FeaturedProject, ProjectItemList } from '../components/projects'
import {
  HomepageHero,
  HomepageHeroText,
  HomepageContent,
  HomepageSection,
  HomepageSectionFooter,
  HomepageSectionTitle,
  HomepageSectionDescription
} from '../components/home'

interface IndexPageProps {
  location: {
    pathname: string
  }
  data: {
    site: {
      siteMetadata: SiteMetadata
    }
    headerImage: HeaderImage
    icon: HCardIcon
    featuredProject: ProjectNode
    allProjects: {
      edges: ProjectField[]
    }
  }
}

const IndexPage: React.FC<IndexPageProps> = ({ data }) => {
  return (
    <TemplateWrapper>
      <Page>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            {
              name: 'description',
              content: data.site.siteMetadata.description
            },
            { property: 'og:title', content: 'Home' },
            {
              property: 'og:description',
              content: data.site.siteMetadata.description
            }
          ]}
        />
        <HomepageHero>
          <HomepageHeroText
            title="@resir014"
            flavour={process.env.GATSBY_HOMEPAGE_SPLASH_TEXT || data.site.siteMetadata.flavourText}
          />
        </HomepageHero>
        <HomepageContent>
          <HomepageSection>
            <FeaturedProject node={data.featuredProject} />
          </HomepageSection>
          <HomepageSection>
            <ProjectItemList
              title="Web development stuff"
              projects={filterProjectsByCategory(data.allProjects.edges, 'web')}
              homepage
            />
            <ProjectItemList
              title="Open source stuff"
              projects={filterProjectsByCategory(data.allProjects.edges, 'oss')}
              homepage
            />
            <ProjectItemList
              title="Other stuff"
              projects={filterProjectsByCategory(data.allProjects.edges, 'other')}
              homepage
            />
            <HomepageSectionFooter>
              <Button kind="nav-link" color="primary" size="lg" to="/projects">
                View more of my stuff
              </Button>
            </HomepageSectionFooter>
          </HomepageSection>
          <Divider spacing="large" center />
          <HomepageSection>
            <HomepageSectionTitle>Contact</HomepageSectionTitle>
            <HomepageSectionDescription>
              Got an interesting project in mind? Want me to help you with it?{' '}
              <Link to="/contact">Let&apos;s talk!</Link>
            </HomepageSectionDescription>
            <HCard icon={data.icon.childImageSharp} author={data.site.siteMetadata.author} />
          </HomepageSection>
        </HomepageContent>
      </Page>
    </TemplateWrapper>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageQuery {
    site {
      siteMetadata {
        title
        description
        siteUrl
        flavourText
        author {
          name
          description
          website
          email
          url {
            twitter
            mastodon
            instagram
            tumblr
            github
          }
        }
      }
    }
    headerImage: file(absolutePath: { regex: "/assets/images/architect.svg$/" }) {
      childImageSharp {
        fluid(maxWidth: 1920) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    icon: file(absolutePath: { regex: "/assets/images/resir014-icon.jpg/" }) {
      childImageSharp {
        fluid(maxWidth: 400, maxHeight: 400) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    featuredProject: markdownRemark(
      fields: { slug: { eq: "/projects/web/coraliethemidwife.nz/" } }
    ) {
      excerpt
      html
      fields {
        year
        description
        tags
        slug
        category
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
    allProjects: allMarkdownRemark(
      filter: { fields: { slug: { regex: "/projects/" } } }
      sort: { fields: [fields___year], order: DESC }
    ) {
      edges {
        node {
          excerpt
          html
          fields {
            year
            description
            tags
            slug
            category
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
    }
  }
`
