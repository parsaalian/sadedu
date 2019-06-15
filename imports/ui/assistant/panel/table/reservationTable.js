import {Meteor} from "meteor/meteor";
import React, {Component} from "react";
import {Table, Input, Button, Icon, Divider, Tag, Popconfirm} from "antd";
import Highlighter from "react-highlight-words";

const data = [
  {
    key: "1",
    id: "96105771",
    name: "ارغوان موسوی",
    gender: "زن",
    level: "کارشناسی",
    credit: 12,
    major: "مهندسی کامپیوتر",
    tags: ['عدم رعایت پیشنیازی'],
  },
  {
    key: "2",
    id: "95105022",
    name: "علی حمیدی",
    gender: "مرد",
    level: "کارشناسی",
    credit: 16,
    major: "مهندسی کامپیوتر",
    tags: ['مجاز'],
  },
  {
    key: "3",
    id: "95105067",
    name: "حسین راد",
    gender: "مرد",
    level: " کارشناسی ارشد",
    credit: 15,
    major: "مهندسی کامپیوتر",
    tags: ['مجاز'],
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
        title: 'شماره دانشجویی',
        dataIndex: 'id',
        key: 'id',
        ...this.getColumnSearchProps("id"),
        render: text => <a href="javascript:;">{text}</a>,
      },
      {
        title: "نام و نام خانوادگی",
        dataIndex: "name",
        key: "name",
        ...this.getColumnSearchProps("name"),
      },
      {
        title: 'جنسیت',
        dataIndex: 'gender',
        filters: [{ text: 'مرد', value: 'male' }, { text: 'زن', value: 'female' }],
        key: 'gender',
      },
      {
        title: 'مقطع',
        dataIndex: 'level',
        key: 'level',
        ...this.getColumnSearchProps("level"),
      },
      {
        title: 'رشته تحصیلی',
        dataIndex: 'major',
        key: 'major',
        ...this.getColumnSearchProps("major"),
      },
      {
        title: 'تعداد واحد',
        dataIndex: 'credit',
        key: 'credit',
      },
      {
        title: 'وضعیت',
        key: 'tags',
        dataIndex: 'tags',
        render: tags => (
          <span>
        {tags.map(tag => {
          let color = 'blue';
          if (tag === 'gender') {
            color = 'volcano';
          }
          if (tag === 'عدم رعایت پیشنیازی') {
            color = 'red';
          }
          if (tag === 'مجاز') {
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
        title: 'عملیات',
        key: 'action',
        render: (text, record) => (
          <Popconfirm title="آیا از حذف این دانشجو مطمئن هستید؟">
            <a href="javascript:;">حذف</a>
            <Divider type="vertical"/>
            <a href="javascript:;">ثبت نام</a>
          </Popconfirm>
        ),
      },
    ];
    return <Table columns={columns}
                  dataSource={data}
                  size='middle'
                  bordered
                  title={() => 'لیست دانشجویان رزرو'}
                  footer={() => ''}/>;
  }
}
