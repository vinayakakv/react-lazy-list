import React, { useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"

type Props<T> = {
  list: T[]
  initialSize: number
  increment: number
  renderer: (item: T) => React.ReactNode
  showAll?: boolean
  wrapper: React.FC<{ children: React.ReactNode }>
}

export function LazyList<T>({
  list,
  initialSize,
  increment,
  renderer,
  showAll = false,
  wrapper: Wrapper,
}: Props<T>) {
  const [displayedList, setDislayedList] = useState(
    showAll ? list : list.slice(0, initialSize)
  )
  const startIndex = displayedList.length
  const hasMore = startIndex < list.length
  return (
    <InfiniteScroll
      hasMore={hasMore}
      loader={<p>...</p>}
      dataLength={displayedList.length}
      next={() => {
        setDislayedList([
          ...displayedList,
          ...list.slice(startIndex, startIndex + increment),
        ])
      }}
      style={{ overflow: "initial" }}
    >
      <Wrapper>{displayedList.map(item => renderer(item))}</Wrapper>
    </InfiniteScroll>
  )
}
