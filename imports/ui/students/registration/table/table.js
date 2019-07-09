import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import { Table, Input, Button, Icon, Divider, Tag, Popconfirm } from "antd";
import Highlighter from "react-highlight-words";

const data = [
  {
    key: "1",
    name: "اندیشه اسلامی 1",
    id: 37445,
    group: 2,
    credit: 2,
    registered: 46,
    instructor: "امید آهنچی",
    tags: ["عدم تطابق حنسیت"]
  },
  {
    key: "2",
    name: "طراحی سیستم های دیجیتال",
    id: 40223,
    group: 1,
    credit: 3,
    registered: 35,
    instructor: "سیاوش بیات سرمدی",
    tags: ["مجاز"]
  },
  {
    key: "3",
    name: "طراحی الگوریتم",
    id: 40354,
    group: 1,
    credit: 3,
    registered: 61,
    instructor: "حمید ضرابی زاده",
    tags: ["عدم رعایت پیش نیازی"]
  },
  {
    key: "4",
    name: "سیستم های عامل",
    id: 40424,
    group: 1,
    credit: 3,
    registered: 30,
    instructor: "مهدی خرازی",
    tags: ["مجاز"]
  },
  {
    key: "5",
    name: "جبرخطی",
    id: 40824,
    group: 1,
    credit: 3,
    registered: 80,
    instructor: "ابولفضل مطهری",
    tags: ["مجاز"]
  }
];

export default class RegistrationTable extends Component {
  state = {
    searchText: ""
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
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
        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    )
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  render() {
    const columns = [
      {
        title: "شماره درس",
        dataIndex: "id",
        key: "id"
      },
      {
        title: "گروه",
        dataIndex: "group",
        key: "group"
      },
      {
        title: "واحد",
        dataIndex: "credit",
        key: "credit"
      },
      {
        title: "نام درس",
        dataIndex: "name",
        key: "name",
        render: text => <a href="javascript:;">{text}</a>
      },
      {
        title: "تعداد ثبت نامی",
        dataIndex: "registered",
        key: "registered"
      },
      {
        title: "نام استاد",
        dataIndex: "instructor",
        key: "instructor"
      },
      {
        title: "وضعیت",
        key: "tags",
        dataIndex: "tags",
        render: tags => (
          <span>
            {tags.map(tag => {
              let color = "blue";
              if (tag === "عدم تطابق حنسیت") {
                color = "volcano";
              }
              if (tag === "عدم رعایت پیش نیازی") {
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
        )
      },
      {
        title: "عملیات",
        key: "action",
        render: (text, record) => (
          <Popconfirm title="آیا از حذف این درس مطمئن هستید?">
            <a href="javascript:;">حذف</a>
          </Popconfirm>
        )
      }
    ];
    return (
      <Table
        className="rtl"
        columns={columns}
        dataSource={data}
        size="middle"
        bordered
        title={() => "لیست دروس"}
        footer={() => "تعداد واحد اخذ شده: 14"}
      />
    );
  }
}
