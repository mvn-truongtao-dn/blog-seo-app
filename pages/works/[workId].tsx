import WorkItem from '@/components/work/work-item';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import * as React from 'react';

export interface WorkDetailProps {
  work: any
}

export default function WorkDetail({ work }: WorkDetailProps) {
  console.log(work);
  const router = useRouter();
  if (router.isFallback) {
    return <h1>Loading...</h1>
  }
  if (!work) return null;
  return (
    <div className='container'>
      <h1>Hello</h1>
      <WorkItem work={work}></WorkItem>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(
    'https://6274e2bf345e1821b230ebee.mockapi.io/works'
  );
  const data = (await response.json()).splice(0,2);
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