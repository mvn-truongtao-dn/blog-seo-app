import FormWork from '@/components/work/form-work';
import { useRouter } from 'next/router';
import * as React from 'react';

export default function WorkUpdate() {
  const router = useRouter();
  console.log(router.query.workId);

  return (
    <>
      <FormWork workId={router.query.workId as string}></FormWork>
    </>
  );
} 
