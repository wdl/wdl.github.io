import React from "react"

import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import TagCard from "../components/tag-card"

const Tags = ({ pageContext, data, location }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const siteTitle = data.site.siteMetadata.title
  const tagHeader = `"${tag}" 태그에 총 ${totalCount} 개의 글이 있습니다.`

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title={tagHeader} />
      <headers className="heading-tag-desc">
        <h2><TagCard tag={tag} isCard={false} isKebabCase={false} /></h2>
        <p>총 {totalCount}개의 글</p>
      </headers>
      <ol style={{ listStyle: `none` }}>
        {edges.map(({ node }) => {
          const post = node;

          return (
            <li key={post.fields.slug}>
              <Link to={`/docs${post.fields.slug}`} itemProp="url">
                <article
                  className="post-list-item"
                  itemScope
                  itemType="http://schema.org/Article"
                >
                  <header>
                      <span itemProp="headline">{post.frontmatter.title}</span>
                  </header>
                  <section>
                    {post.frontmatter.description || post.excerpt}
                  </section>
                  <footer>
                    {post.frontmatter.date}
                    { post.frontmatter.tags
                      ? ( <span className="separator">·</span> )
                      : null
                    }
                    {
                      post.frontmatter.tags
                        ? post.frontmatter.tags.map((tag) => {
                          return (
                            <TagCard key={tag} tag={tag} />
                          )
                        })
                        : null
                    }
                  </footer>
                </article>
              </Link>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default Tags

export const pageQuery = graphql`
  query($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { tags: { in: [$tag] } } }
      sort: { fields: [frontmatter___date], order: ASC }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "YYYY-MM-DD")
            title
            description
            tags
          }
        }
      }
    }
  }
`