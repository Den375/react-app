import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import s from "./Paginator.module.css";
import cn from "classnames"
import {useSelector} from "react-redux";
import {getUsersFilter} from "../../../redux/users-selectors";

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage?: number
    onPageChanged?: (pageNumber: number) => void
    portionSize?: number
}

 const Paginator: React.FC<PropsType> = ({totalUsersCount, pageSize,
                                          currentPage= 1, onPageChanged =  () => {},
                                          portionSize= 10}) => {

    let pagesCount = Math.ceil(totalUsersCount / pageSize)

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    const filter = useSelector(getUsersFilter)

     useEffect(() => {
         setPortionNumber(Math.ceil(currentPage/10))
     }, [filter])

     const callback = () => {
         onPageChanged(leftPortionPageNumber - portionSize)
         setPortionNumber(portionNumber - 1)
     }

     const callback2 = () => {
         onPageChanged(leftPortionPageNumber + portionSize)
         setPortionNumber(portionNumber + 1)
     }

    return <div className={s.paginator}>

        { portionNumber > 1 &&
        <button onClick={callback}>PREV</button> }

        {pages.filter(p => p >= leftPortionPageNumber && p<=rightPortionPageNumber)
                .map( p => {
                return <span className={cn(s.pageNumber, {[s.currentPage]: currentPage === p})}
                             onClick={() => onPageChanged(p)}> {p} </span>
            })}

        { portionCount > portionNumber &&
        <button onClick={callback2}>NEXT</button> }

         </div>
}

export default Paginator
