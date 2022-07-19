import * as React from 'react';
import { authApi } from '@/api-client/index';
import { useAuth } from '@/hooks/index';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, notification, Spin } from 'antd';
import { LoginPayload } from '@/models/auth';
import { SmileOutlined } from '@ant-design/icons';
export interface User {
  username: string,
  city: string;
  email: string
}
export default function LoginPage() {
  const router = useRouter();
  const { profile, error, login, mutate } = useAuth({ revalidateOnMount: false });
  const [infoUser, setInfoUser] = useState<User>();
  const [isLoadingForm, setIsLoadingForm] = useState<boolean>();
  const [isLoading, setIsloading] = useState(false);
  useEffect(() => {
    // setIsLoadingForm(isLoading);
    setInfoUser(profile);

  }, []);
  console.log("Info", infoUser);



  const onFinish = async (values: LoginPayload) => {
    console.log(values);
    console.log("infoUser", infoUser);
    setIsloading(true)
    // await login(values.username, values.password);
    try {
      await authApi.login({
        username: values.username,
        password: values.password,
      });
      await mutate();
      router.push('/')
      notification.open({
        message: "Login success",
        icon: <SmileOutlined rotate={180} style={{ color: '#108ee9' }} />,
        className: 'notification-success'
      });
    } catch (error) {
      notification.open({
        message: "Login failed",
        icon: <SmileOutlined style={{ color: '#108ee9' }} />,
        className: 'notification-danger'
      });
    }
    setIsloading(false);
  }


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

        <h1 style={{ textAlign: "center" }}>Login Page</h1>
        <Form
          name='form-user'
          labelCol={{ span: 24 }}
          // wrapperCol={{ span: 8 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          {/* <div className="form-box"> */}

          <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' }]}

          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password autoFocus />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ span: 24 }}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ span: 24 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
          {/* </div> */}
        </Form>
      </div>
    </>
  );
}
