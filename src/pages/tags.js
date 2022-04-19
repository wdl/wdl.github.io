import React from "react"
import { graphql, navigate } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import TagCard from "../components/tag-card"

var kebabCase = require("lodash.kebabcase")

const TagsPage = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    },
  },
  location,
}) => {

  return (
    <Layout location={location} title={title}>
      <Seo
        title="All Tags"
        keywords={[`javascript`, `react`]}
      />
      <div className="tag-list">
        <h1>Tags</h1>
        <table>
          <tbody>
            {group.map(tag => (
              <tr key={tag.fieldValue} onClick={() => { navigate(`/tags/${kebabCase(tag.fieldValue)}/`) }}>
                <td className="tag-name"><TagCard tag={tag.fieldValue} isCard={false} isKebabCase={false} /></td>
                <td className="post-count">{tag.totalCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  )
}

export default TagsPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
