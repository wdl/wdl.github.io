/**
 * TagCard component
 */

import * as React from "react"
import { Link } from "gatsby"
import uniqolor from "uniqolor";
import kebabCase from "lodash.kebabcase"

import store from "../redux/store";

const TagCard = ({ tag, isCard = true, isLink = false, isKebabCase = true }) => {

    let tagColorOption;
    if (store.getState().interface === "light") {
        if (isCard) {
            tagColorOption = {
                saturation: [35, 65],
                lightness: 85,
                differencePoint: 50,
            }
        } else {
            tagColorOption = {
                saturation: [35, 65],
                lightness: 50,
                differencePoint: 50,
            }
        }
    } else {
        tagColorOption = {
            saturation: [35, 65],
            lightness: 15,
            differencePoint: 50,
        }
    }

    const tagColor = uniqolor(tag, tagColorOption)
    const tagClassName = isCard ? "tag-card" : "tag-string"
    const tagStyle = isCard ? { backgroundColor: tagColor.color } : { color: tagColor.color }

    if (isLink) {
        return (
            <Link to={`/tags/${kebabCase(tag)}`} className={tagClassName} style={tagStyle}>
                {isKebabCase ? kebabCase(tag) : tag}
            </Link>
        )
    } else {
        return (
            <span className={tagClassName} style={tagStyle}>
                {isKebabCase ? kebabCase(tag) : tag}
            </span>
        )
    }
}

export default TagCard
