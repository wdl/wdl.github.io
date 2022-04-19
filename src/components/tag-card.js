/**
 * TagCard component
 */

import * as React from "react"
import { Link } from "gatsby"
import uniqolor from "uniqolor";
import kebabCase from "lodash.kebabcase"

import store from "../redux/store";

const TagCard = ({ tag, isLink = false }) => {

    let tagColorOption;
    if (store.getState().interface === "light") {
        tagColorOption = {
            saturation: [35, 65],
            lightness: 85,
            differencePoint: 50,
        }
    } else {
        tagColorOption = {
            saturation: [35, 65],
            lightness: 15,
            differencePoint: 50,
        }
    }

    const tagColor = uniqolor(tag, tagColorOption)

    if (isLink) {
        return (
            <Link to={`/tags/${kebabCase(tag)}`} className="tag-card" style={{backgroundColor: tagColor.color}}>
                {kebabCase(tag)}
            </Link>
        )
    } else {
        return (
            <span className="tag-card" style={{backgroundColor: tagColor.color}}>
                {kebabCase(tag)}
            </span>
        )
    }
}

export default TagCard
