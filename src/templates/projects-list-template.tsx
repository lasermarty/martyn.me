import React from 'react';
import { graphql } from 'gatsby';
import { Layout } from '../components/Layout';
import { Sidebar } from '../components/Sidebar';
import { Page } from '../components/Page';
import { AllMarkdownRemarkWithRepositories } from '../types';
import { useSiteMetadata } from '../hooks/use-site-metadata';
import { Projects } from '../components/Projects';

type Props = {
  data: AllMarkdownRemarkWithRepositories;
};

const ProjectsListTemplate = ({ data }: Props) => {
  const { title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata();
  const { edges } = data.allMarkdownRemark;
  const repositories = data.githubData.data.user.topRepositories.nodes;

  return (
    <Layout description={siteSubtitle} title={siteTitle}>
      <Sidebar isIndex />
      <Page>
        <Projects edges={edges} repositories={repositories} />
      </Page>
    </Layout>
  );
};

// TODO:
// Template: Split tweets from project
export const query = graphql`
  query {
    allMarkdownRemark(
      filter: {
        frontmatter: { template: { in: ["project", "tweet"] }, draft: { ne: true } }
      }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date
            description
            project
            tweet
          }
        }
      }
    }
    githubData {
      data {
        user {
          topRepositories {
            nodes {
              name
              description
              url
              stargazers {
                totalCount
              }
              isArchived
              pushedAt
              languages {
                nodes {
                  name
                  color
                }
              }
              repositoryTopics {
                nodes {
                  topic {
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default ProjectsListTemplate;
