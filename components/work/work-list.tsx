import { Work } from '@/models/work';
import axios from 'axios';
import { GetStaticProps } from 'next';
import * as React from 'react';
import WorkItem from './work-item';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllWork } from 'store/workSlice';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { RootState } from 'store/store';

export interface WorkListProps {
  pathName: string,
  listData: any[]
}

export default function WorkList({ pathName, listData }: WorkListProps) {
  const worksList = JSON.parse(JSON.stringify(useSelector((state: RootState) => state.works.works))).reverse();
  // const abcd = useSelector((state: RootState) => state.works.works);

  console.log(worksList);

  // const worksList: any = [];
  const dispatch = useDispatch();
  const router = useRouter();
  const namePath = pathName.split("/")[1];
  // useEffect(() => {
  //   // setData(worksList);
  //   (async () => {
  //     const response = await fetch(
  //       `https://6274e2bf345e1821b230ebee.mockapi.io/works`
  //     );
  //     const data = (await response.json());
  //     console.log("data", data);
  //     dispatch(getAllWork(data));
  //   })();
  // }, [router]);

  return <>
    {
      worksList && (

        worksList.map((item: any) => (
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
  </>;
}
