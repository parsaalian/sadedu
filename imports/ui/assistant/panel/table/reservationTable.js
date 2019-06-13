import {Meteor} from "meteor/meteor";
import React, {Component} from "react";
import {Table, Input, Button, Icon, Divider, Tag, Popconfirm} from "antd";
import Highlighter from "react-highlight-words";

const data = [
  {
    key: "1",
    id: "96105771",
    name: "Sasha Obama",
    gender: "Female",
    level: "BSc",
    credit: 12,
    major: "Computer Engineering",
    tags: ['prerequistics'],
  },
  {
    key: "2",
    id: "95105022",
    name: "Joe Black",
    gender: "Male",
    level: "BSc",
    credit: 16,
    major: "Computer Engineering",
    tags: ['eligible'],
  },
  {
    key: "3",
    id: "95105067",
    name: "Jim Green",
    gender: "Male",
    level: "MSc",
    credit: 15,
    major: "Computer Engineering",
    tags: ['eligible'],
  },
];

export default class ReservationTable extends Component {
  state = {
    searchText: "",
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
      <div style={{padding: 8}}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{width: 188, marginBottom: 8, display: "block"}}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{width: 90, marginRight: 8}}
        >
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{width: 90}}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{color: filtered ? "#1890ff" : undefined}}/>
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{backgroundColor: "#ffc069", padding: 0}}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ),
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({searchText: selectedKeys[0]});
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({searchText: ""});
  };

  render() {
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        ...this.getColumnSearchProps("id"),
        render: text => <a href="javascript:;">{text}</a>,
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        ...this.getColumnSearchProps("name"),
      },
      {
        title: 'Gender',
        dataIndex: 'gender',
        filters: [{text: 'Male', value: 'male'}, {text: 'Female', value: 'female'}],
        key: 'gender',
      },
      {
        title: 'Level',
        dataIndex: 'level',
        key: 'level',
        ...this.getColumnSearchProps("level"),
      },
      {
        title: 'major',
        dataIndex: 'major',
        key: 'major',
        ...this.getColumnSearchProps("major"),
      },
      {
        title: 'Registered Credits',
        dataIndex: 'credit',
        key: 'credit',
      },
      {
        title: 'Status',
        key: 'tags',
        dataIndex: 'tags',
        render: tags => (
          <span>
        {tags.map(tag => {
          let color = 'blue';
          if (tag === 'gender') {
            color = 'volcano';
          }
          if (tag === 'prerequistics') {
            color = 'red';
          }
          if (tag === 'eligible') {
            color = 'green';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </span>
        ),
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <Popconfirm title="Are you sure you want to Remove this student?">
            <a href="javascript:;">Remove</a>
            <Divider type="vertical"/>
            <a href="javascript:;">Register</a>
          </Popconfirm>
        ),
      },
    ];
    return <Table columns={columns}
                  dataSource={data}
                  size='middle'
                  bordered
                  title={() => 'Reserved Students List'}
                  footer={() => ''}/>;
  }
}
