import * as React from 'react';

export default class Header extends React.Component {
  render() {
    return (
      <Layout>
        <Header>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item><Link to={`${this.props.match.path}/consumers`}>Consumers</Link></Menu.Item>
            <Menu.Item><Link to={`${this.props.match.path}/producers`}>Producers</Link></Menu.Item>
            <Row type="flex" justify="end">
              <Col>
                <AccountMenu />
              </Col>
            </Row>
          </Menu>
        </Header>
        <Content>
          <SiderContent match={this.props.match} />
        </Content>
      </Layout>
    );
  }
}
