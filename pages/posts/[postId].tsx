import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import * as React from 'react';

export interface PostDetailsProps {
  post: any
}

export default function PostDetails({post}: PostDetailsProps) {
  const router = useRouter();
  if (router.isFallback) {
    return <h1>Loading...</h1>
  }
  if (!post) return null;

  return (
    <div>
      <h1>
        Post Details Page
      </h1>
      <p>{post.title}</p>
      <p>{post.description}</p>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(
    'https://js-post-api.herokuapp.com/api/posts?_page=1'
  );
  const data = await response.json();
  return {
    paths: data.data.map((post: any) => ({ params: { postId: post.id } })),
    // fallback: 'blocking',
    //khi page ma chua co thi nao se tu tao ra
    fallback: true,
    //No se hien thi loading sau do se tao ra 1 trang HTML va render ra
  };
};

export const getStaticProps: GetStaticProps<PostDetailsProps> = async (
  context: GetStaticPropsContext
) => {
  console.log(`getstaticprops`, context.params?.postId);
  const postId = context.params?.postId;
  if (!postId) return {
    notFound: true
  }
  // Server side
  // build - time
  const response = await fetch(
    `https://js-post-api.herokuapp.com/api/posts/${postId}`
  );
  const data = await response.json();

  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      post: data
    },
    revalidate: 5,
    //su dung 
  };
};
