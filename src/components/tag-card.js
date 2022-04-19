/**
 * TagCard component
 */

import * as React from "react"
import uniqolor from "uniqolor";
import kebabCase from "lodash.kebabcase"

import store from "../redux/store";

const TagCard = ({ tag }) => {

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

    return (
        <span className="tag-card" style={{backgroundColor: tagColor.color}}>
            {kebabCase(tag)}
        </span>
    )
}

export default TagCard
