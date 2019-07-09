import {Meteor} from "meteor/meteor";
import React, {Component} from "react";
import {Table, Input, Button, Icon, Divider, Tag, Popconfirm} from "antd";
import Highlighter from "react-highlight-words";

const data = [
  {
    key: "1",
    id: "95105011",
    name: "داود وکیلی",
    gender: "مرد",
    level: "کارشناسی ارشد",
    credit: 10,
    major: "مهندسی کامپیوتر",
    tags: ["مجاز"],
  },
  {
    key: "2",
    id: "95105022",
    name: "علیرضا علیپور",
    gender: "مرد",
    level: "کارشناسی",
    credit: 15,
    major: "علوم کامپیوتر",
    tags: ["مجاز"],
  },
  {
    key: "3",
    id: "95105067",
    name: "یاسر خدایی",
    gender: "مرد",
    level: "کارشناسی",
    credit: 17,
    major: "علوم کامپیوتر",
    tags: ["مجاز"],
  },
  {
    key: "4",
    id: "95105055",
    name: "مهدی سلیمانی",
    gender: "مرد",
    level: "کارشناسی",
    credit: 13,
    major: "علوم کامپیوتر",
    tags: ["مجاز"],
  },
  {
    key: "5",
    id: "94108900",
    name: "لیلا کاظمی",
    gender: "زن",
    level: "کارشناسی",
    credit: 14,
    major: "مهندسی برق",
    tags: ["عدم رعایت پیشنیازی"],
  },
];

export default class RegistrationTable extends Component {
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
        title: "شماره دانشجویی",
        dataIndex: "id",
        key: "id",
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
        title: "جنسیت",
        dataIndex: "gender",
        filters: [{ text: "مرد", value: "male" }, { text: "زن", value: "female" }],
        key: "gender",
      },
      {
        title: "مقطع",
        dataIndex: "level",
        key: "level",
        ...this.getColumnSearchProps("level"),
      },
      {
        title: "رشته تحصیلی",
        dataIndex: "major",
        key: "major",
        ...this.getColumnSearchProps("major"),
      },
      {
        title: "تعداد واحد",
        dataIndex: "credit",
        key: "credit",
      },
      {
        title: "وضعیت",
        key: "tags",
        dataIndex: "tags",
        render: tags => (
          <span>
        {tags.map(tag => {
          let color = "blue";
          if (tag === "gender") {
            color = "volcano";
          }
          if (tag === "عدم رعایت پیشنیازی") {
            color = "red";
          }
          if (tag === "مجاز") {
            color = "green";
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
        title: "عملیات",
        key: "action",
        render: (text, record) => (
          <Popconfirm title="آیا از حذف این دانشجو مطمئن هستید؟">
            <a href="javascript:;">حذف</a>
          </Popconfirm>
        ),
      },
    ];
    return <Table className="rtl"
                  columns={columns}
                  dataSource={data}
                  size="middle"
                  bordered
                  title={() => "لیست دانشجویان ثبت نامی"}
                  footer={() => ""}/>;
  }
}
