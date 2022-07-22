import { MainLayout } from '@/components/layout';
import type { GetStaticProps, NextPage } from 'next';
import WorkList from '@/components/work/work-list';
import { Work } from '@/models/work';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getAllWork } from 'store/workSlice';
import { Breadcrumb, Button, Col, Image, Row } from 'antd';
import { LeftOutlined, PlusOutlined } from '@ant-design/icons';
import Link from 'next/link';
import useSWR from 'swr';
import bg from "../../images/bg.jpg";

export interface WorksPageProps {
  works: Work[];

}
const fetcher = async () => {
  const response = await fetch('https://6274e2bf345e1821b230ebee.mockapi.io/works');
  return await response.json();
};
export default function WorksPage({ works }: WorksPageProps) {
  const router = useRouter();
  const { data,mutate } = useSWR('https://6274e2bf345e1821b230ebee.mockapi.io/works', fetcher);
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(getAllWork(works));
    (async () => {
      const response = await fetch(
        `https://6274e2bf345e1821b230ebee.mockapi.io/works`
      );
      const data = (await response.json());      
      dispatch(getAllWork(data));
    })();
    
  }, []);

  return (
    <>
      <div className='section section-works'>
        <div className='container'>
          <div className='works-content'>
            <Row className='justify-content-between align-items-center mb-20'>
              <Col>
                <Breadcrumb>
                  <Breadcrumb.Item href='/'>
                    <LeftOutlined /> Home</Breadcrumb.Item>
                </Breadcrumb>
              </Col>
              <Col>
                <Link href="/works/create">
                  <Button type="primary" icon={<PlusOutlined />}>Create</Button>
                </Link>
              </Col>
            </Row>
          </div>
          <div className='works-body'>
            <WorkList lengthData={works.length} listData={works} pathName={router.pathname}></WorkList>
          </div>
        </div>
      </div>

    </>

  );
}
WorksPage.Layout = MainLayout;

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch("https://6274e2bf345e1821b230ebee.mockapi.io/works");
  const data = (await response.json()).reverse();
  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      works: data
    },
  }
}

