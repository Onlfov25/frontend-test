import React from 'react'
import ReactDOM from 'react-dom'
import { AutoComplete } from 'antd'
import { Cascader, DatePicker } from 'antd'
import { Form, Icon, Input, Button, Modal, Radio } from 'antd'
import moment from 'moment'
import 'moment/locale/zh-cn'

const FormItem = Form.Item
moment.locale('zh-cn')
const { MonthPicker, RangePicker, WeekPicker } = DatePicker
class App extends React.Component {
    
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit() {

    }
    render() {
        return (

       <Modal title="Create new collection" visible>
           <Form layout="vertical">
               <FormItem validateStatus="error" hasFeedback help="cuowu">
                   <Input />
               </FormItem>
               <FormItem>
                   <Radio.Group>
                       <Radio value="public">Public</Radio>
                       <Radio value="private">private</Radio>
                   </Radio.Group>
               </FormItem>
           </Form>
       </Modal> 
        )
    }
}
ReactDOM.render (
    <App />,
    document.getElementById('root')
)