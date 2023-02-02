import { Component } from "react";
import { Tabs } from 'antd';

import './header.scss';


class Header extends Component {

  onTabChange = (key) => {
      console.log(key);
  }

  items = [
      {
        key: '1',
        label: `Search`,
      },
      {
        key: '2',
        label: `Rated`,
      },
  ]

  render() {
    return (
        <header className="app-header">
          <div className="app-header__tabs-wrapper">
            <Tabs defaultActiveKey="1" 
                  items={this.items} 
                  onChange={this.onTabChange} />
          </div>
        </header>
    )
  }
}

export default Header;