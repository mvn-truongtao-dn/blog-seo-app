import {
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
// import { user } from '../../model/user';
interface PostListProps {
  posts: any[];
}
export default function PostList({ posts }: PostListProps) {
  return (
    <div>
      <h1>Post List Page</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticProps: GetStaticProps<PostListProps> = async (
  context: GetStaticPropsContext
) => {
  // Server side
  // build - time
  const response = await fetch(
    'https://js-post-api.herokuapp.com/api/posts?_page=1'
  );
  const data = await response.json();

  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      posts: data.data.map((x: any) => ({ id: x.id, title: x.title })),
    },
  };
};
