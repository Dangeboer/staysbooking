import React from "react";
import { Form, Input, InputNumber, Button, message } from "antd";
import { uploadStay } from "../utils";

const layout = {
  labelCol: { span: 8 }, // 字的长度
  wrapperCol: { span: 16 }, //文本框的长度
};

class UploadStay extends React.Component {
  state = {
    loading: false,
  };

  fileInputRef = React.createRef();

  // 用户的提交按钮
  // FormData是一种特殊的格式，键值对
  handleSumbit = async (values) => {
    const formData = new FormData();
    const { files } = this.fileInputRef.current;

    if (files.length > 5) {
      message.error("You can at most upload 5 pictures");
      return;
    }

    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }

    formData.append("name", values.name);
    formData.append("address", values.address);
    formData.append("description", values.description);
    formData.append("guest_number", values.guest_number);

    this.setState({
      loading: true,
    });

    try {
      await uploadStay(formData);
      message.success("upload successfully");
    } catch (error) {
      message.error(error.message);
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  // Input是输入，InputNumber是专门输入数字的，Input.TextArea是多行文本输入组件
  render() {
    return (
      <Form
        {...layout}
        name="nest-messages"
        onFinish={this.handleSumbit}
        style={{ maxWidth: 1000, margin: "auto" }}
      >
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="address" label="Address" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true }]}
        >
          <Input.TextArea autoSize={{ minRows: 2, maxRows: 6 }} />
        </Form.Item>
        <Form.Item
          name="guest_number"
          label="Guest Number"
          rules={[{ required: true, type: "number", min: 1 }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item name="picture" label="Picture" rules={[{ required: true }]}>
          {/*前后端传输文件*/}
          <input
            type="file"
            accept="image/png, image/jpeg"
            ref={this.fileInputRef}
            multiple={true}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit" loading={this.state.loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default UploadStay;
