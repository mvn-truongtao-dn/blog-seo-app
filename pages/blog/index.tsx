import * as React from 'react';
import { Button, Divider } from 'antd';
import { MainLayout } from '@/components/layout';
import { Post } from '@/models/post';
import PostItem from '@/components/post/post-item';
import { GetStaticProps } from 'next';
import getPostList from 'utils/posts';
export interface BlogPageProps {
  posts: Post[];
}
export default function BlogPage({ posts }: BlogPageProps) {
  console.log(posts);

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
  return (
    <div className='blog-page'>
      <div className='section-posts'>
        <div className='container2'>
          <div className='posts-content'>
            <div className='posts-header'>
              <h2 className='section-title'>Blog</h2>
            </div>
            <div className='posts-body'>
              {posts.map((item) => (
                <div key={item.id}>
                  <PostItem post={item}></PostItem>
                  <Divider />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
BlogPage.Layout = MainLayout;

export const getStaticProps: GetStaticProps<BlogPageProps> = async () => {
  const postList = await getPostList();
  return {
    props: {
      posts: postList,
    },
  };
};
