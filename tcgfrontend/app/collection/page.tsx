"use client"

import { useGetCardsQuery } from "../state/api"
import Header from "../(components)/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
    { field: "productId", headerName: "ID", width: 90},
    { field: "name", headerName: "Card Name", width: 200},
    { field: "num", headerName: "Card Num", width: 150},
    { field: "set", headerName: "Card Set", width: 200},
    { field: "price", headerName: "Price", width: 110, type: "number", 
        valueGetter: (value, row) => `${row.price}`
    },
    { field: "rarity", headerName: "Rarity", width: 100},
    { field: "quantity", headerName: "Quantity", width: 150, type: "number"},

]


const Collection = () => {
    const {data: cards, isError, isLoading} = useGetCardsQuery();
    
    if (isLoading) {
        return <div className="py-4">Loading...</div>
    }

    if (isError || !cards) {
        return (
            <div className="text-center text-red-500 py-4">
                Failed to fetch products
            </div>
        )
    }
  return (
    <div className="flex flex-col">
    <Header name="Collection" />
    <DataGrid
        rows={cards}
        columns={columns}
        getRowId={(row) => row.cardId}
        checkboxSelection
        className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
    />
    </div>
  )
}

export default Collection