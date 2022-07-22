import * as React from 'react';
import WorkItem from './work-item';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { RootState } from 'store/store';
import { Pagination, PaginationProps, Spin } from 'antd';
import { useState } from 'react';

export interface WorkListProps {
  pathName: string,
  listData: any[],
  lengthData?: number
}

export default function WorkList({ pathName, listData, lengthData }: WorkListProps) {
  const worksList = JSON.parse(JSON.stringify(useSelector((state: RootState) => state.works.works))).reverse();
  const [currentPage, setCurrentPage] = useState(1);
  const currentPageData = React.useRef(1);
  const [dataPerPage, setDataPerPage] = useState(10);
  let indexOfLastData = currentPageData.current * dataPerPage;
  let indexOfFirstData = indexOfLastData - dataPerPage;
  let currentData = worksList.slice(indexOfFirstData, indexOfLastData);
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(worksList.length / dataPerPage); i++) {
    pageNumber.push(i);
  }
  const namePath = pathName.split("/")[1];
  const handleClickPaginate: PaginationProps['onChange'] = (pageNumber) => {
    console.log(pageNumber);
    setCurrentPage(pageNumber);
    currentPageData.current = pageNumber;
  }

  return <>
    {
      currentData.length === 0 ? (<Spin className='block-center'></Spin>) : (

        currentData.map((item: any) => (
          <div key={item.id}>
            {
              pathName.split("/")[1] == "" ? (<Link key={item.id} href={`/works/${item.id}`}>
                <a>
                  <WorkItem key={item.id} work={item} pathName={namePath} ></WorkItem>
                </a>
              </Link>) :
                (
                  <WorkItem key={item.id} work={item} pathName={namePath} ></WorkItem>
                )
            }
          </div>
        ))
      )

    }
    <Pagination style={{ textAlign: "center" }} defaultCurrent={1} total={lengthData} onChange={handleClickPaginate} />

  </>
}
