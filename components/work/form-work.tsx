import * as React from 'react';
import { Breadcrumb, Button, Col, Form, Image, Input, Row, Spin, Upload, UploadFile, UploadProps } from 'antd';
import { LeftOutlined, RollbackOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import { addNewWork, updateWork } from 'store/workSlice';
import { useRouter } from 'next/router';
// import { RootState } from 'store/store';
import uuid from 'core/uuid';
import { RootState } from 'store/store';
import useSWR from 'swr';

export interface Work {
  title?: string,
  subTitle?: string,
  description?: string,
  image: string
}
export interface WorkUpdateProps {
  workId?: string | undefined
}
const fetcher = async () => {
  const response = await fetch('https://6274e2bf345e1821b230ebee.mockapi.io/works');
  return await response.json();
};
export default function FormWork({ workId }: WorkUpdateProps) {
  const worksList = useSelector((state: RootState) => state.works.works);
  console.log(worksList);
  const { data, mutate } = useSWR('https://6274e2bf345e1821b230ebee.mockapi.io/works', fetcher);

  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tabList, setTabList] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [isLoading, setIsloading] = useState(false);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const router = useRouter();
  useEffect(() => {
    if (workId) {
      (async () => {
        const response = await fetch(`https://6274e2bf345e1821b230ebee.mockapi.io/works/${workId}`);
        const data = await response.json();
        const { title, subTitle, tabList, shortDescription, thumbnailUrl } = data;
        setTitle(title);
        setSubTitle(subTitle);
        setTabList(tabList);
        setDescription(shortDescription);
        setFileList(thumbnailUrl);
      })()
    }
    form.setFieldsValue({
      title: title,
      subTitle: subTitle,
      description: description,
      tabList: tabList,

    });
  }, [workId, title, subTitle])
  const onFinish = (values: Work) => {
    const index = (worksList).findIndex((object: any) => object.id === workId);
    console.log(index);

    const data = {
      title: values.title,
      subTitle: values.subTitle,
      shortDescription: values.description,
      thumbnailUrl: fileList,
    }
    if (index !== -1) {
      (async () => {
        setIsloading(true);
        await axios.put(`https://6274e2bf345e1821b230ebee.mockapi.io/works/${workId}`, { id: workId, ...data }).then((res) => {
        });
        await dispatch(updateWork({ id: workId, data }));
        await mutate();

        setIsloading(false);
      })();
      router.push(
        {
          pathname: '/works',

        },
      )
    } else {
      (async () => {
        setIsloading(true);
        await axios.post(`https://6274e2bf345e1821b230ebee.mockapi.io/works`, { id: uuid(), ...data }).then((res) => {
        })
        await dispatch(addNewWork({ id: uuid(), ...data }));
        await mutate();
        setIsloading(false);

      })();
      router.push(
        {
          pathname: '/works',
        },
      )
    }

  }
  const handleUpload: UploadProps['onChange'] = ({ fileList }) => {
    setFileList(fileList);
  };

  return (
    <>
      {
        isLoading ? (
          <div className='backend'>
            <Spin className='position-center' size="large"></Spin>
          </div>
        ) : null
      }
      <div className='container'>
        <Row className='align-items-center'>
          <Col span={4}>
            <Breadcrumb>
              <Breadcrumb.Item href='/works'>
                <LeftOutlined /> Home</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
          <Col span={20} className="form-work-title">
          </Col>
        </Row>
        <Form name='form-work' onFinish={onFinish} form={form} labelCol={{ span: 24 }} >
          <Form.Item label="Title" name="title">
            <Input placeholder='Title...' />
          </Form.Item>
          <Form.Item label="SubTitle" name="subTitle">
            <Input placeholder='SubTitle...' />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input placeholder='Description...' />
          </Form.Item>
          <Form.Item label="Image" name="image">
            <Upload
              listType="picture-card"
              fileList={fileList}
              // onPreview={handlePreview}
              onChange={handleUpload}
              beforeUpload={() => false}
            >
              <Button>Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 11, span: 13 }}>
            <Button type="primary" className='btn-color' htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        {/* <AdvancedImage cldImg={myImage} /> */}
      </div>
    </>
  );
}
