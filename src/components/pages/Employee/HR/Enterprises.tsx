import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { FC } from 'react';
import { Dropdown } from 'react-bootstrap';
import "./Enterprises.css";

interface Props {

}
const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'fullName', headerName: 'Last name', width: 160 },
    { field: 'address', headerName: 'Address', width: 200 },
    { field: 'email', headerName: 'Email', width: 170 },
    { field: 'phone', headerName: 'Phone', width: 130 },
    { field: 'status', headerName: 'Status', width: 130 },
    // {
    //   field: 'fullName',
    //   headerName: 'Full name',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params: GridValueGetterParams) =>
    //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    // },
    // {
    //     field: 'action',
    //     headerName: 'Action',
    //     sortable: false,
    //     renderCell: (params) => {
    //       const onClick = (e: any) => {
    //         e.stopPropagation(); // don't select this row after clicking
    
    //         const api: GridApi = params.api;
    //         const thisRow: Record<string, GridKeyValue> = {};
    
    //         api
    //           .getAllColumns()
    //           .filter((c) => c.field !== '__check__' && !!c)
    //           .forEach(
    //             (c) => (thisRow[c.field] = params.getValue(params.id, c.field)),
    //           );
    
    //         return alert(JSON.stringify(thisRow, null, 4));
    //       };
    
    //       return <Button onClick={onClick}>Click</Button>;
    //     },
    //   },

  ];
  
  const rows = [
    { id: 1, fullName: "FPT Software", address: "Lot E3, D2 street, High-tech park Long Thạnh Mỹ Ward 9 District, Long Thạnh Mỹ, Quận 9, Thành phố Hồ Chí Minh 71216", email: "fsoft@fsoft.com.vn", phone: "0774816851", status: "Active" },
  ];

const Enterprises: FC<Props> = (props) => {
    return (
        <div id='Enterprises'>
            <h2>Enterprises</h2>
            <div className="candidates-container">
                <div className="filter">
                    <div className="form-input">
                        <div className="input-icon">
                            <FontAwesomeIcon icon={faMagnifyingGlass} className="icon" />
                        </div>
                        <input type="text" placeholder='Enter search keywords' />
                    </div>
                    <Dropdown className="specialty-dropdown">
                        <Dropdown.Toggle variant="success" id="dropdown-basic" className='specialty'>
                            <span>All Specialty</span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className='specialty-menu'>
                            <div>
                                <Dropdown.Item className='specialty-item'>Developer</Dropdown.Item>
                            </div>
                        </Dropdown.Menu>
                    </Dropdown>
                    <button className='btn-search'>Search</button>
                </div>
                <div style={{ height: 500, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        autoPageSize
                        pagination
                        checkboxSelection
                    />
                </div>
            </div>
        </div>
    )
}

export default Enterprises