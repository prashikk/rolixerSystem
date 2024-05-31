import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Table, Input, message, Image } from 'antd';
import axios from 'axios';

const { Search } = Input;

const columns = [
    {
        title: "#",
        dataIndex: "id",
        width: 40,
    },
    {
        title: "Title",
        dataIndex: "title",
        width: 200,
    },
    {
        title: "Price",
        dataIndex: "price",
        render: (price) => parseFloat(price).toFixed(2),
        width: 80
    },
    {
        title: "Description",
        dataIndex: "description",
    },
    {
        title: "Category",
        dataIndex: "category",
        width: 120
    },
    {
        title: "Sold",
        dataIndex: "sold",
        render: (sold) => (sold ? "Yes" : "No"),
        width: 50
    },
    {
        title: "Date",
        dataIndex: "dateOfSale",
        render: (date) => moment(date).format("DD MMM YYYY"),
        width: 100
    },
    {
        title: "Image",
        dataIndex: "image",
        render: (url) => <Image src={url} alt="Product Image" width={60} />,
        width: 80
    }
];

function Transactions({ month, monthText }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10
        }
    });

    const getData = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`https://roxiler-pvpf.onrender.com/transactions`, {
                params: {
                    month,
                    page: tableParams.pagination.current,
                    limit: tableParams.pagination.pageSize,
                    search: tableParams.search
                }
            });

            setData(data.transactions);
            setLoading(false);
            setTableParams({
                ...tableParams,
                pagination: {
                    ...tableParams.pagination,
                    total: data.totalCount,
                }
            });
            message.success('Data loaded successfully');
        } catch (error) {
            console.log(error);
            message.error('Error loading data');
        }
    };

    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            ...tableParams,
            pagination
        });

        // Clear dataSource when pageSize changes to avoid showing incorrect data
        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setData([]);
        }
    };

    const handleSearch = (value) => {
        setTableParams({
            ...tableParams,
            search: value
        });
    };

    useEffect(() => {
        getData();
    }, [JSON.stringify(tableParams), month]);

    return (
        <div>

            <Table
                columns={columns}
                rowKey={(record) => record.id}
                dataSource={data}
                pagination={tableParams.pagination}
                loading={loading}
                onChange={handleTableChange}
                size='meduim'
                bordered
                title={() => <strong>Transactions for {monthText}</strong>}
                scroll={{ y: 540 }}
            />
        </div>
    );
}

export default Transactions;
