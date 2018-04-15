import React from 'react'
import ReactDOM from 'react-dom'
// import Login from './pages/login'
// import router from './router.js'
import { Provider } from 'react-redux'
import { LocaleProvider, DatePicker, message, Layout, Steps  } from 'antd'
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/lib/locale-provider/zh_CN'
import { Button, Icon, Dropdown, Row, Col, Affix , Menu, Breadcrumb, Pagination } from 'antd'
import './app.less'
import PropTypes from 'prop-types'

const Step = Steps.Step
const {SubMenu, Divider, Item }  = Menu
const {Header, Sider, Content, Footer,  }  = Layout
class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this)
    this.handleVisibleChange = this.handleVisibleChange.bind(this)
    this.handleShowSizeChange = this.handleShowSizeChange.bind(this)
    this.handleShowTotal = this.handleShowTotal.bind(this)
    this.itemRender = this.itemRender.bind(this)
    this.state = {
      date: '',
      visible: false
    };
  }
  handleClick(e) {
    message.info(`click item is ${e.key}`)
    if (e.key === '2') {
      this.setState({
        visible: false
      })
    }
  }
  handleShowSizeChange(current, pageSize) {
    console.log(current, pageSize)
  }
  handleVisibleChange(flag) {
    this.setState({ visible: flag });
  }
  handleShowTotal(total) {
    return `Total ${total} items`
  }

  itemRender(current, type, originalElement) {
    if (type === 'prev') {
      return <a>Previous</a>
    } else if (type === 'next') {
      return <a>Next</a>
    }
    return originalElement
  }
  render() {
    const menu = (
      <Menu onClick={this.handleClick} >
    <Menu.Item key="1">1st item</Menu.Item>
    <Menu.Item key="2">2nd item</Menu.Item>
    <SubMenu title="sub menu">
      <Item>4-1</Item>
      <Item>4-2</Item>
    </SubMenu>
    <SubMenu title={<span><Icon type="setting">Navigation</Icon></span>}>
        <Menu.ItemGroup title="item 1">
          <Menu.Item key="setting3">opt3</Menu.Item>
          <Menu.Item key="setting4">opt4</Menu.Item>
          <Menu.ItemGroup title="item 2">
              <Menu.Item key="s5">s5</Menu.Item>
              <Menu.Item key="s6">s6</Menu.Item>
          </Menu.ItemGroup>
          <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
        </Menu.ItemGroup>
    </SubMenu>
    <Menu.Divider />
    <Menu.Item key="3" disabled>3rd item</Menu.Item>
  </Menu>
    )
    return (
      <LocaleProvider locale={zhCN}>
        <div className="test" style={{ border: "1px solid black" }}>
          <h2>按钮</h2>
          <Button type="primary" disabled loading>Primary</Button>
          <Button size="large" icon="link">Default</Button>
          <Button type="dashed" size="small">Dashed
                <Icon></Icon>
          </Button>
          <Dropdown overlay={menu} placement="topRight" trigger={['click']} 
          onVisibleChange={this.handleVisibleChange} visible={this.state.visible}>
                <Button>
                  Actions <Icon type="down"></Icon>
                </Button>
          </Dropdown>
          <Dropdown.Button overlay={menu}>Dropdown.Button</Dropdown.Button>
          <Button.Group size="large">
          <Button type="primary">
            <Icon type="left" />Backward
          </Button>
          <Button type="primary">
            Forward<Icon type="right" />
          </Button>
        </Button.Group>
          <Button type="danger" ghost href="http:www.baidu.com" shape="circle" target="blank">Danger</Button>
          <hr />
          <h2>鼠标</h2>
          <Icon type="link" />
          <Icon type="step-backward" />
          <Icon type="check-circle" />
          <Icon type="behance-square" style={{ fontSize: 26, color: '#fcs' }} spin />
          <hr />
          <h2>栅格</h2>
          <Row className="row">
            <Col span={12}>一栏</Col>
            <Col span={12}>a栏</Col>
          </Row>
          <Row className="row" gutter={24} align="right">
            <Col span={8}>一栏</Col>
            <Col span={8} offset={4}>a栏</Col>
            <Col span={4}>a栏</Col>
          </Row>
          <Row className="row" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={6} push={18}>a</Col>
            <Col span={18} pull={6}>b</Col>
          </Row>
          <Row className="row" justify="center" type="flex" align="bottom">
            <Col span={6} order={3}>a</Col>
            <Col span={6}>b</Col>
            <Col span={6} className="myTop" order={1}>c</Col>
            {/* <Col span={6}>b</Col> */}
          </Row>
          <hr />

          <h2>布局</h2>
          <Layout>
            <Header>header</Header>
            <Layout style={{height: 100 }}>
              <Sider  collapsed={false} collapsedWidth={0} collapsible={true}>left sidebar</Sider>
              <Content>main content</Content>
            </Layout>
            <Footer>footer</Footer>
          </Layout>
          <hr />
          <h2>导航</h2>
          <Affix offsetTop={100}>offsetTop</Affix>
          <Affix offsetBottom={100} target={()=> window}>offsetBottom
            <span style={{position: 'absolute'}}>hello</span>
          </Affix>

          {/* <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item><a href="">Application a</a></Breadcrumb.Item>
            <Breadcrumb.Item><a href="">Application b</a></Breadcrumb.Item>
          </Breadcrumb> */}
          <Breadcrumb separator="&">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item><a href="">Application Center</a></Breadcrumb.Item>
          <Breadcrumb.Item><a href="">Application List</a></Breadcrumb.Item>
          <Breadcrumb.Item>An Application</Breadcrumb.Item>
        </Breadcrumb>

        <Pagination showQuickJumper showTotal={this.handleShowTotal} showSizeChanger onShowSizeChange={this.handleShowSizeChange} defaultCurrent={3} total={100}></Pagination>
         <Pagination total={500} itemRender={this.itemRender} defaultCurrent={5}></Pagination> 

          <Steps current={1} size="small" status="error">
            <Step title="Finished" description="This is a description" icon="user"/>
            <Step title="In Progress" description="This is a description" icon="solution"/>
            <Step title="Waiting" description="This is a description" icon={<Icon type="smile-o"/>}/>
          </Steps>

          <hr/>
        </div>
      </LocaleProvider>
    );
  }
}


ReactDOM.render(
  <App />,
  document.getElementById("root")
)

App.propTypes = {
  gutter: PropTypes.number
}
