const columns = [
    {
        label: "名称",
        field: "name",
        width: '200px'
    },
    {
        label: "分组编码",
        field: "groupCode",
        width: '200px'

    },
    {
        label: "编码",
        field: "code",
        width: '100px'
    },
    {
        label: "值",
        field: "value",
        width: '200px'
    },
    {
        label: "描述",
        field: "description",
        width: '200px'
    },
    {
        label: "优先级",
        field: "priority",
        width: '100px'
    },
    {
        label: "创建时间",
        field: "gmtCreate",
        type: "datetime",
        width: '200px'
    },
    {
        label: "最后一次修改时间",
        field: "gmtModified",
        type: "datetime",
        width: '200px'
    }
];

export default columns;