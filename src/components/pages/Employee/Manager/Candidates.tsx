import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react'
import { Dropdown } from 'react-bootstrap';
import "./Candidates.css";
import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface Props {

}
const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'fullName', headerName: 'Last name', width: 160 },
    {
      field: 'age',
      headerName: 'Age',
      width: 60,
    },
    { field: 'address', headerName: 'Address', width: 200 },
    { field: 'email', headerName: 'Email', width: 170 },
    { field: 'gender', headerName: 'Gender', width: 90 },
    { field: 'dob', headerName: 'Date of birth', width: 130 },
    { field: 'phone', headerName: 'Phone', width: 130 },
    { field: 'workstatus', headerName: 'Work status', width: 130 },
    { field: 'specialty', headerName: 'Specialty', width: 200 },
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
    { id: 1, fullName: "Lương Hồ Đắc Đạt", age: 23, address: "Bình Chánh, TP.HCM", email: "datlhd@fsoft.com.vn", gender: "Male", dob: "14/12/2000", phone: "0774816851", workstatus: "Not yet", specialty: "Developer, Designer"  },
    { id: 2, fullName: "Phạm Thành Long", age: 23, address: "Biên Hòa, Đồng Nai", email: "longpt23@fsoft.com.vn", gender: "Male", dob: "13/09/2000", phone: "0123456789", workstatus: "FPT Software", specialty: "Developer"  },
    { id: 3, fullName: "Nguyễn Thị A", age: 23, address: "Bình Chánh, TP.HCM", email: "Ant@fsoft.com.vn", gender: "Female", dob: "14/12/2000", phone: "0774816851", workstatus: "Not yet", specialty: "Developer, Designer"  },
    { id: 4, fullName: "Lương Hồ Đắc Đạt", age: 23, address: "Bình Chánh, TP.HCM", email: "datlhd@fsoft.com.vn", gender: "Male", dob: "14/12/2000", phone: "0774816851", workstatus: "Not yet", specialty: "Developer, Designer"  },
    { id: 5, fullName: "Lương Hồ Đắc Đạt", age: 23, address: "Bình Chánh, TP.HCM", email: "datlhd@fsoft.com.vn", gender: "Male", dob: "14/12/2000", phone: "0774816851", workstatus: "Not yet", specialty: "Developer, Designer"  },
    { id: 6, fullName: "Lương Hồ Đắc Đạt", age: 23, address: "Bình Chánh, TP.HCM", email: "datlhd@fsoft.com.vn", gender: "Male", dob: "14/12/2000", phone: "0774816851", workstatus: "Not yet", specialty: "Developer, Designer"  },
    { id: 6, fullName: "Lương Hồ Đắc Đạt", age: 23, address: "Bình Chánh, TP.HCM", email: "datlhd@fsoft.com.vn", gender: "Male", dob: "14/12/2000", phone: "0774816851", workstatus: "Not yet", specialty: "Developer, Designer"  },
    { id: 6, fullName: "Lương Hồ Đắc Đạt", age: 23, address: "Bình Chánh, TP.HCM", email: "datlhd@fsoft.com.vn", gender: "Male", dob: "14/12/2000", phone: "0774816851", workstatus: "Not yet", specialty: "Developer, Designer"  },
  ];

const Candidates: FC<Props> = (props) => {
    return (
        <div id='Candidates'>
            <h2>Candidates</h2>
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
                    <button className='btn-search'>Tìm</button>
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

export default Candidates