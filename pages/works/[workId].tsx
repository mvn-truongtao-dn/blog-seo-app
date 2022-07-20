import { MainLayout } from '@/components/layout';
import WorkItem from '@/components/work/work-item';
import { Avatar, Badge, Breadcrumb, Col, Row, Spin } from 'antd';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import * as React from 'react';
import Image from 'next/image';
import bg from "../../images/bg.jpg";
import Rectangle5 from "../../images/Rectangle 5.jpg";
import Rectangle6 from "../../images/Rectangle 6.jpg";
import { LeftOutlined } from '@ant-design/icons';


export interface WorkDetailProps {
  work: any
}

export default function WorkDetail({ work }: WorkDetailProps) {
  console.log(work);
  const router = useRouter();
  if (router.isFallback) {
    return <><Spin></Spin></>
  }
  if (!work) return null;
  return (
    <div className='container'>
      <Breadcrumb>
        <Breadcrumb.Item href='/'>
          <LeftOutlined /> WorkList</Breadcrumb.Item>
      </Breadcrumb>
      <div className='mt-20 flex align-items-center'>
       
        <div className="post">
        <Row className='align-items-center'>
          <Col className='mr-20 flex align-items-center'>
            <Avatar src="https://joeschmoe.io/api/v1/random" />
            <span className='post-sub-info post-author'>Amit Das</span>
          </Col>
          <span className='post-sub-info create-time'>
            4 days ago
          </span>
          <Col>
          </Col>
        </Row>
          <Row>
            <Col className='post-content'>
              <div>
                <h3 className='post-title'>{work.title}</h3>
              </div>
              <div className='post-time'>
                <Badge
                  count={2022}
                  overflowCount={9999}
                  style={{ backgroundColor: '#FF7C7C' }}
                />

                <span className='sub-title'>{work.tagList}</span>
              </div>
              <p className='post-description'>{work.shortDescription}</p>
            </Col>
          </Row>
          <Image src={bg} className=""></Image>
          <h1 className='mt-20'>Heading 1</h1>
          <h2>Heading 2</h2>
          <p className='post-description'>{work.shortDescription}</p>
          <Image src={Rectangle5} className="mt-20"></Image>
          <Image src={Rectangle6} className="mt-30"></Image>

        </div>
      </div>
    </div>
  );
}
WorkDetail.Layout = MainLayout;
export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(
    'https://6274e2bf345e1821b230ebee.mockapi.io/works'
  );
  const data = (await response.json()).splice(0, 2);
  return {
    // paths: data.map((work: any) => ({ params: { workId: work.id } })),
    paths: data.map((work: any) => ({ params: { workId: work.id } })),
    fallback: true,
  };
}

export const getStaticProps: GetStaticProps<WorkDetailProps> = async (
  context: GetStaticPropsContext
) => {
  console.log(context);

  const workId = context.params?.workId;
  console.log("context", context.params?.workId);
  if (!workId) return {
    notFound: true
  }
  const response = await fetch(`https://6274e2bf345e1821b230ebee.mockapi.io/works/${workId}`);
  const data = (await response.json());
  // const dulieu = (await response.json()).splice(0, 2);
  // console.log(dulieu);

  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      work: data
    },
    revalidate: 5,
  }
}