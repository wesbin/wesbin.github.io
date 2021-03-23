import { useStaticQuery, graphql } from "gatsby"

const GetCategory = () => {
  const { allMarkdownRemark } = useStaticQuery(
    graphql`
      query GetCategory {
        allMarkdownRemark {
          group(field: frontmatter___category) {
            fieldValue
            totalCount
          }
        }
      }
    `
  )
  return allMarkdownRemark.group
}

export default GetCategory
