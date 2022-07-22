import { MainLayout } from '@/components/layout';
import type { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import avatar from '../images/avatar.png';

import PostItem from '@/components/post/post-item';
import { Post } from '@/models/index';
import WorkList from '@/components/work/work-list';
import { Seo } from '@/components/common';
import { Work } from '@/models/work';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getAllWork } from 'store/workSlice';
import useTrans from '@/hooks/use-trans';
import { Empty } from 'antd';

export interface HomeProps {
  works: Work[]
}
const Home = ({ works }: HomeProps) => {
  const router = useRouter();
  const trans = useTrans();

  const postList: Post[] = [
    {
      id: '1',
      slug: '',
      title: 'Making a design system from scratch',
      publishedDate: '1657178072355',
      tagList: ['Design', 'Pattern'],
      description:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
    },
    {
      id: '2',
      slug: '',

      title: 'Creating pixel perfect icons in Figma',
      publishedDate: '1657178072355',
      tagList: ['Figma', 'Icon Design'],
      description:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
    },
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllWork(works));
  }, []);
  if (!works) return <><Empty /></>
  return (
    <>
      <Seo
        data={{
          title: 'NextJS Tutorials || TruongTao',
          description: 'Step by step tutorials to build a full CRUD website using NextJS for beginner',
          thumbnailUrl: 'https://res.cloudinary.com/monstar-lab/image/upload/w_100/v1657180651/learn-nextjs/item1_eozham.jpg',
          url: 'https://learn-nextjs-lovat-ten.vercel.app/',
        }}
      />
      <div className='section-hero'>
        <div className='container'>
          <div className='hero-content'>
            <div className='hero-inner'>
              <h2 className='hero-title'>
                Hi, I am Jonh, <br></br>
                Creative Technologist
              </h2>
              <p className='hero-description'>
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet sint. Velit officia consequat duis enim velit mollit.
                Exercitation veniam consequat sunt nostrud amet.
              </p>
            </div>
            <div className='hero-avatar'>
              <Image src={avatar} alt="abc"></Image>

            </div>
          </div>
          <div className='btn-hero'>
            <button className='btn btn-orange-pink'>{trans.home.download} Resume</button>
          </div>
        </div>
      </div>
      <div className='section section-posts'>
        <div className='container'>
          <div className='posts-content'>
            <div className='posts-header'>
              <h5 className='section-title'>Recent posts</h5>
              <a className='posts-view' href='#'>
                View all
              </a>
            </div>
            <div className='posts-body'>
              {postList.map((item: Post) => (
                <PostItem key={item.id} post={item}></PostItem>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className='section section-works'>
        <div className='container'>
          <div className='works-content'>
            <div className='section-title'>Feature works</div>
          </div>
          <div className='works-body'>
            <WorkList lengthData={works.length} listData={works} pathName={router.pathname}></WorkList>
          </div>
        </div>
      </div>
    </>
  );
};
Home.Layout = MainLayout;
export default Home;
export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch("https://6274e2bf345e1821b230ebee.mockapi.io/works");
  const data = (await response.json());
  if (!data) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      works: data
    }
    , revalidate: 5
  }
}