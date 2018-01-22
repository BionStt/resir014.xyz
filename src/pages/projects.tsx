import * as React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

import { photonColors } from '../utils/theme'

import Masthead from '../components/Masthead'
import ToggleMenu from '../components/ToggleMenu'
import Container from '../components/Container'
import Footer from '../components/Footer'
import PageHeader from '../components/PageHeader'
import FeaturedProject from '../components/FeaturedProject'
import ProjectItemList from '../components/ProjectItemList'
import PageTitle from '../components/PageTitle'
import PageContent from '../components/PageContent'

import { menuItems } from '../utils/menus'
import { ProjectNode } from '../utils/types'

interface ProjectsPageProps {
  location: {
    pathname: string
  }
  data: {
    site: {
      siteMetadata: {
        title: string
        description: string
        author: {
          name: string
          url: string
        }
      }
    }
    allMarkdownRemark: {
      edges: ProjectNode[]
    }
    allProjectsJson: {
      edges: ProjectNode[]
    }
  }
}

const ProjectsPage: React.SFC<ProjectsPageProps> = ({ data, location }) => {
  const { siteMetadata } = data.site
  const { pathname } = location
  const featuredProject = getFeaturedProject(data.allMarkdownRemark.edges, 'aquellex.ws')

  return (
    <React.Fragment>
      <Helmet
        title={`Projects · ${siteMetadata.title}`}
      />
      <main>
        <article>
          <PageHeader>
            <PageTitle><span>Projects</span></PageTitle>
          </PageHeader>
          <PageContent>
            {
              featuredProject
                ? <FeaturedProject key={featuredProject.node.frontmatter.title} node={featuredProject.node} />
                : null
            }
            <Container>
              <ProjectItemList title="Web development stuff" projects={filterProjectsByCategory(data.allMarkdownRemark.edges, 'web')} />
              <ProjectItemList title="Open source stuff" projects={filterProjectsByCategory(data.allMarkdownRemark.edges, 'oss')} />
              <ProjectItemList title="Other stuff" projects={filterProjectsByCategory(data.allMarkdownRemark.edges, 'other')} />
            </Container>
          </PageContent>
        </article>
      </main>
    </React.Fragment>
  )
}

const getFeaturedProject = (edges: ProjectNode[], name: string) => {
  return edges.filter(edge => edge.node.frontmatter.title === name)[0]
}

const filterProjectsByCategory = (edges: ProjectNode[], category: string) => (
  edges.filter(edge => edge.node.fields.category === category)
)

export default ProjectsPage

export const query = graphql`
query ProjectsPageQuery {
  site {
    siteMetadata {
      title
      description
      author {
        name
        url
      }
    }
  }
  allMarkdownRemark(
    filter: {id: {regex: "/projects/"}}
    sort: {fields: [fields___year], order: DESC}
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
          headerImage
          category
          lead
          project_url
          jumpToProject
        }
        frontmatter {
          title
        }
      }
    }
  }
}
`
