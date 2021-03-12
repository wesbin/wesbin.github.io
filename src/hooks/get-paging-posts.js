import { useStaticQuery, graphql } from "gatsby"
export const GetPagingPosts = () => {
  const { allMarkdownRemark } = useStaticQuery(
    graphql`
      query GetPagingPosts {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 5
          ) {
          nodes {
            excerpt
            fields {
              slug
            }
            frontmatter {
              date(formatString: "MMMM DD, YYYY")
              title
              description
            }
          }
        }
      }
    `
  )
  return allMarkdownRemark.nodes
}