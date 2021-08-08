import { Form, Input, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import api from '../utils/api';
import showError from '../utils/showError';



function SignUp() {

  const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
  };

/* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  }; 

  const history = useHistory();

  const onFinish = async (values: any) => { 
    console.log("VALUES:",values);

    try {
      await api.post("/users/register", values);
      history.push("/login", { newSignUp: true });
    } catch (error) {
      console.log({ error });
      showError((error).response.data.errorMessage);
      //showError((error as any).response.data.errorMessage);
    }
  };


    return(

        // <div>
        //     <h1>SingUp</h1>
        // </div>
        <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
          <h2 style={{ textAlign : "center", marginBottom: 40 }}>Register for an account</h2>
            <Form.Item 
              name="userName" 
              label="userName" 
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: 'Please input your password!', min: 6 }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ type: 'email', required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="full_name" label="Full Name">
                <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                Submit
                </Button>
            </Form.Item>
        </Form>
    );
}

export default SignUp;