import { Post } from '@/models/post';
import * as React from 'react';

export interface PostItemProps {
  post: Post;
}

export default function PostItem({ post }: PostItemProps) {
    if (!post) return null;
    return (
    <div className='post'>
      <h3 className='post-title'>{post.title}</h3>
      <div className='post-time'>
        <span>12 Feb 2020</span>
        
        <span className='sub-title'>{post.tagList.join(", ")}</span>
      </div>
      <p className='post-description'>{post.description}</p>
    </div>
  );
}
