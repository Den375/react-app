import React from "react";
import s from "./Paginator.module.css";

export const Paginator = props => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    if (pagesCount > 20) {pagesCount = 20}
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return <div>
            {pages.map( p => {
                return <span className={props.currentPage === p ? s.currentPage : null}
                             onClick={() => props.onPageChanged(p)}> {p} </span>
            })}
         </div>
}

