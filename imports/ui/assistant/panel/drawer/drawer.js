import {Drawer, Form, Button, Col, Row, Input, Select, DatePicker, TimePicker, Icon, Upload, InputNumber} from "antd";
import React, {Component} from "react";

const {Option} = Select;

class DrawerForm extends Component {
  state = {visible: false};

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <div>
        <Button type="primary" onClick={this.showDrawer}>
          <Icon type="edit"/> Edit Information
        </Button>
        <Drawer
          title="Edit Course Information"
          width={720}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item label="Credits">
                  {(<InputNumber defaultValue="3" min={0} max={4}/>)}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Group">
                  {(<InputNumber defaultValue="2" min={1} max={4}/>)}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Capacity">
                  {(<InputNumber defaultValue="30" min={0} max={100}/>)}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Reserve Capacity">
                  {(<InputNumber defaultValue="10" min={0} max={25}/>)}
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Instructor(s)">
                  {getFieldDecorator('name', {
                    rules: [{required: true, message: 'Please enter instructor(s) name'}],
                  })(<Input placeholder="Please enter instructor(s) name"/>)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Course Website">
                  {getFieldDecorator('url', {
                    rules: [{required: true, message: 'Please enter url'}],
                  })(
                    <Input
                      style={{width: '100%'}}
                      addonBefore="http://"
                      addonAfter=".edu"
                      placeholder="Please enter url"
                    />,
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Level">
                  {getFieldDecorator('level', {
                    rules: [{required: true, message: 'Please choose the level'}],
                  })(
                    <Select placeholder="Please choose the level">
                      <Option value="bsc">BSc</Option>
                      <Option value="msc">MSc</Option>
                      <Option value="phd">Phd</Option>
                    </Select>,
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Pre-requisites">
                  {getFieldDecorator('select-multiple', {
                    rules: [
                      {required: true, message: 'Please select pre-requisites!', type: 'array'},
                    ],
                  })(
                    <Select mode="multiple" placeholder="Please select pre-requisites">
                      <Option value="40-414">40-414</Option>
                      <Option value="40-415">40-415</Option>
                      <Option value="40-416">40-416</Option>
                    </Select>,
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item label="Class Time">
                  {getFieldDecorator('time-picker')(<TimePicker/>)}
                </Form.Item>
              </Col>
              <Col span={9}>
                <Form.Item label="Class Place">
                  {getFieldDecorator('text')(<Input placeholder="Please enter class place"/>)}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Exam Date and Time">
                  {getFieldDecorator('date-time-picker')(
                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>,
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="Course Description">
                  {getFieldDecorator('description', {
                    rules: [
                      {
                        required: true,
                        message: 'please enter url description',
                      },
                    ],
                  })(<Input.TextArea rows={4} placeholder="please enter url description"/>)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Course Syllabus">
                  <div className="dropbox">
                    {getFieldDecorator('dragger', {
                      valuePropName: 'fileList',
                      getValueFromEvent: this.normFile,
                    })(
                      <Upload.Dragger name="files" action="/upload.do">
                        <p className="ant-upload-drag-icon">
                          <Icon type="inbox"/>
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                      </Upload.Dragger>,
                    )}
                  </div>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Course Calendar">
                  <div className="dropbox">
                    {getFieldDecorator('dragger', {
                      valuePropName: 'fileList',
                      getValueFromEvent: this.normFile,
                    })(
                      <Upload.Dragger name="files" action="/upload.do">
                        <p className="ant-upload-drag-icon">
                          <Icon type="inbox"/>
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                      </Upload.Dragger>,
                    )}
                  </div>
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <div
            style={{
              position: 'absolute',
              left: 0,
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e9e9e9',
              padding: '10px 16px',
              background: '#fff',
              textAlign: 'right',
            }}
          >
            <Button onClick={this.onClose} style={{marginRight: 8}}>
              Cancel
            </Button>
            <Button onClick={this.onClose} type="primary">
              Save
            </Button>
          </div>
        </Drawer>
      </div>
    );
  }
}

const EditInfo = Form.create()(DrawerForm);
export default EditInfo;
