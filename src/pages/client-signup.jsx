import { Button, Form, Popover, Steps } from 'antd';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import StepOne from '../components/company-signup/step-one.jsx';
import StepThree from '../components/company-signup/step-three.jsx';
import StepTwo from '../components/company-signup/step-two.jsx';

const { Step } = Steps;

const steps = [
  {
    title: 'Verify Password',
    content: <StepOne />,
  },
  {
    title: 'Company Info',
    content: <StepTwo />,
  },
  {
    title: 'Contact Info',
    content: <StepThree />,
  },
];

const customDot = (dot, { status, index }) => (
  <Popover
    content={
      <span>
        Step {index + 1} status: {status}
      </span>
    }
  >
    {dot}
  </Popover>
);

const ClientSignup = () => {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();

  const next = async () => {
    try {
      await form.validateFields();
      setCurrent(current + 1);
    } catch (_error) {
      // console.log('Validation Failed:', error);
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const onFinish = async () => {
    // try {
    //   const values = await form.validateFields();
    //   console.log('Form Values:', values);
    // } catch (_error) {
    //   console.log('Validation Failed:', error);
    // }
  };

  return (
    <>
      <Helmet>
        <title>Signup</title>
      </Helmet>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: '3vh',
        }}
      >
        <div style={{ width: 850 }}>
          <Steps current={current} progressDot={customDot}>
            {steps.map((item) => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
        </div>
        <Form
          form={form}
          initialValues={{ remember: true, acceptTerms: true }}
          layout="vertical"
          requiredMark={false}
          style={{ marginTop: 70, width: 450 }}
        >
          {steps[current].content}
          <div style={{ marginTop: 24 }}>
            {current < steps.length - 1 && (
              <Button
                block
                onClick={next}
                style={{ marginRight: 8 }}
                type="primary"
              >
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button block onClick={onFinish} type="primary">
                Confirm
              </Button>
            )}
            {current > 0 && (
              <Button block onClick={prev} style={{ marginTop: 15 }}>
                Previous
              </Button>
            )}
          </div>
        </Form>
      </div>
    </>
  );
};

export default ClientSignup;
