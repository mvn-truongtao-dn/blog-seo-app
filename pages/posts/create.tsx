import { useRouter } from 'next/router';
import * as React from 'react';

export interface CreatePostProps {}

export default function CreatePost(props: CreatePostProps) {
  const router = useRouter();
  console.log('About query', router.query);
  // React.useEffect(() => {
  //   //check query availabel
  // }, [])

  return <div>Create Post Page</div>;
}

// export async function getServerSideProps() {
//   return {
//     props: {},
//   };
// } // nếu sử dụng getServerSideProps thì sau khi build nó sẽ trả file JS chớ
//không phải là file HTML