import React from 'react';
import { Form, Input, Button } from "antd";
import { connect } from 'react-redux';
import axios from 'axios';


const FormItem = Form.Item;

class CustomForm extends React.Component {

    handleFormSubmit = (event, requestType, articleID) => {
//        event.preventDefault();

        const title = event.target.elements.title.value;
        const content = event.target.elements.content.value;
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: this.props.token
        }
        console.log(title);

        switch ( requestType ) {
            case 'post':
                return axios.post('http://127.0.0.1:8000/api/', {
                    title: title,
                    content: content

                })

                    .then(res => console.log(res))
                    .catch(error => console.err(error));
                    

            case 'put':
                return axios.put(`http://127.0.0.1:8000/api/${articleID}/`, {
                    title: title,
                    content: content

                })
                    .then(res => console.log(res))
                    .catch(error => console.err(error));

        }
    }

    render() {
        return (
            <div>
                <Form onSubmit={(event) => this.handleFormSubmit(
                    event,
                    this.props.requestType,
                    this.props.articleID)}>
                    <FormItem label="Title">
                        <Input name="title" placeholder="Put a title here" />
                    </FormItem>
                    <FormItem label="Content">
                        <Input name="content" placeholder="Enter some content  ... " />
                    </FormItem>
                    <FormItem >
                <Button type="primary" htmlType="submit">{this.props.btnText}</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      token: state.token !== null
  
    }
  }


  export default connect(mapStateToProps)(CustomForm);