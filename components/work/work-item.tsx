import { Work } from '@/models/work';
import { SmileOutlined } from '@ant-design/icons';
import { Avatar, Badge, Button, Card, Col, Divider, Image, message, notification, Popconfirm, Row } from 'antd';
import Meta from 'antd/lib/card/Meta';
import axios from 'axios';
import Link from 'next/link';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { deleteWork } from 'store/workSlice';

export interface WorkItemProps {
  work: Work;
  pathName?: string
}

export default function WorkItem({ work, pathName }: WorkItemProps) {
  
  const [show, setShow] = React.useState(true);
  const dispatch = useDispatch();
  const confirm = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined, id: string) => {
    notification.open({
      message: "Login success",
      icon: <SmileOutlined style={{ color: '#108ee9' }} />,
      className: "notification-success",
      duration: 10000
    });
    // message.success(`Delete Success`);
    dispatch(deleteWork(id));
    axios.delete(`https://6274e2bf345e1821b230ebee.mockapi.io/works/${id}`).then((res) => {
      console.log(res);
    });
  };
  const cancel = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined) => {
    console.log(e);
    notification.open({
      message: "Login failed",
      icon: <SmileOutlined style={{ color: '#108ee9' }} />,
      className: "notification-danger",
      duration: 10000
    });
  };
  const handleUpdateClick = (work: any) => {
    console.log(work);
  }
  return (
    <>
      <Card
        className='flex mt-10 mb-10 align-items-center'
        cover={<Image alt='example' src={work.thumbnailUrl[0].thumbUrl} />}
        bordered={false}
        hoverable={true}
      >
        <div className='post'>
          <Row>
            <Col className='post-content'>
              <div>
                <h3 className='post-title'>{work.title}</h3>
              </div>
              <div className='post-time'>
                <Badge
                  count={2022}
                  overflowCount={9999}
                  style={{ backgroundColor: '#142850' }}
                />

                <span className='sub-title'>{work.tagList}</span>
              </div>
              <p className='post-description'>{work.shortDescription}</p>
            </Col>

            <Col className='mt-10 group-btn'>
              {
                pathName !== "" ? (
                  <>
                    <Popconfirm
                      title="Are you sure to delete this task?"
                      onConfirm={(e) => { confirm(e, work.id) }}
                      onCancel={cancel}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button type='primary' danger className='mb-10'>Delete</Button>
                    </Popconfirm>
                    <Link href={`works/update/${work.id}`}>
                      <a>
                        <Button type='primary' onClick={() => { handleUpdateClick(work) }}>Update</Button>
                      </a>
                    </Link>
                  </>
                ) : (null)
              }
            </Col>
          </Row>
        </div>

      </Card>
      <Divider />
    </>
  );
}
