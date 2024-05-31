import './App.css';
import React, { useState } from 'react';
import { Layout, Menu, Select } from 'antd';
import Transactions from './components/Transactions';
import Stats from './components/Stats';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';


const { Header, Content } = Layout;


const navItems = [
  {
    key: 1,
    label: ( <NavLink to="/">Transactions</NavLink> )
  },
  {
    key: 2,
    label: ( <NavLink to="/stats">Stats</NavLink> )
  }
];
const options = [
  "All Months",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];


const App = () => {
  let [month, setMonth] = useState(3);

  const handleMonthChange = (value) => {
    setMonth(parseInt(value));
  };

  return (
    <BrowserRouter>
        <Header style={{ background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 48px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Select
            size="medium"
            defaultValue={options[month]}
            onChange={handleMonthChange}
            style={{ width: 100, marginRight: 20 }}
            options={options.map((text, i) => ({
              value: i,
              label: text
            }))}
          />
          <Menu
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            items={navItems}
            style={{ flex: 1 }}
          />
        </div>
      </Header>
      
      <Layout>

        <Content
          style={{
            padding: "0px 48px",
            backgroundColor: "white",
            minHeight: 600
          }}
        >
          
          <Routes>
            <Route path="/" element={
              <Transactions month={month} monthText={options[month]} />
            } />
            <Route path="/stats" element={
              <Stats month={month} monthText={options[month]} />
            } />
          </Routes>

        </Content>
      
      </Layout>
    </BrowserRouter>
  );
};

export default App;
