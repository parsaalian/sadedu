import {Meteor} from "meteor/meteor";
import React, {Component} from "react";
import {Table, Input, Button, Icon, Divider, Tag, Popconfirm} from "antd";
import Highlighter from "react-highlight-words";

const data = [
  {
    key: '1',
    name: 'اندیشه اسلامی 1',
    id: 37445,
    group: 2,
    instructor: 'امید آهنچی',
  },
  {
    key: '2',
    name: 'طراحی سیستم های دیجیتال',
    id: 40223,
    group: 1,
    instructor: 'سیاوش بیات سرمدی',
  },
  {
    key: '3',
    name: 'طراحی الگوریتم',
    id: 40354,
    group: 1,
    instructor: 'حمید ضرابی زاده',
  },
  {
    key: '4',
    name: 'سیستم های عامل',
    id: 40424,
    group: 1,
    instructor: 'مهدی خرازی',
  },
  {
    key: '4',
    name: 'سیستم های عامل',
    id: 40424,
    group: 2,
    instructor: 'رسول جلیلی',
  },
];

export default class HelpTable extends Component {
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
        title: 'نام درس',
        dataIndex: 'name',
        key: 'name',
        render: text => <a href="javascript:;">{text}</a>,
      },
      {
        title: 'نام استاد',
        dataIndex: 'instructor',
        key: 'instructor',
      },
      {
        title: 'شماره درس',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'گروه',
        dataIndex: 'group',
        key: 'group',
      },
    ];
    return <Table className="rtl"
                  columns={columns}
                  dataSource={data}
                  size="middle"
                  bordered
                  title={() => "جدول کمکی انتخاب واحد"}
                  footer={() => ""}/>;
  }
}
