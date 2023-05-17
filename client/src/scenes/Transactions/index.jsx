import React, { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { useGetTransactionsQuery } from 'state/api'
import Header from 'components/Header'
import { useTheme } from '@emotion/react'
import { Box } from '@mui/material'
import DataGridCustomToolbar from 'components/DataGridCustomToolbar'


const Transactions = () => {
    const theme = useTheme()
    const {data, isLoading} = useGetTransactionsQuery()
    console.log(data)
    const columns = [
        {
            field: '_id',
            headerName: 'Transaction ID',
            flex: 1,
        },
        {
            field: 'userId',
            headerName: 'User ID',
            flex: 1,
        },
        {
            field: 'createdAt',
            headerName: 'CreatedAt',
            flex: 1,
        },
        // {
        //     field: 'products',
        //     headerName: 'Product ID',
        //     flex: 1,
        //     // sortable: false,
        //     // renderCell: (params) => params.value.length
        // },
        {
            field: 'cost',
            headerName: 'Cost',
            flex: 1,
            renderCell: (params) => `$${Number(params.value).toFixed(2)}`
        },
    ]
  return (
    <Box m='1.5rem 2.5rem'>
        <Header title='TRANSACTIONS' subtitle='Entire list of transactions'/>
        <Box height='80vh'
        sx={{
            "& .MuiDataGrid-root": {
                border: 'none'
            },
            "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme.palette.background.alt,
                color: theme.palette.secondary[100],
                borderBottom: 'none'
            },
            "& .MuiDataGrid-cell": {
                borderBottom: 'none'
            },
            "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme.palette.primary.light
            },
            "& .MuiDataGrid-footerContainer": {
                backgroundColor: theme.palette.primary.alt,
                color: theme.palette.secondary[100],
                borderTop: 'none'
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `${theme.palette.secondary[200]} !important`
            }
        }}>
            <DataGrid
                loading={isLoading || !data}
                getRowId={(row) => row._id}
                rows={data || []}
                columns={columns}
                components={{
                    Toolbar: DataGridCustomToolbar
                }}
            />
        </Box>
    </Box>
  )
}

export default Transactions
