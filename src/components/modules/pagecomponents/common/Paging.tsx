import React, {Dispatch, FC, SetStateAction} from 'react'
import { Pagination } from 'react-bootstrap';

interface Props {
    pageTotal: number;
    currentPage: number;
    setCurrentPage: Dispatch<SetStateAction<number>>
}
    
export const Paging: FC<Props> = ({pageTotal, currentPage, setCurrentPage}) => {

    const items = [];

    function onPageChange(pageNo: number) {
        setCurrentPage(pageNo)
    }

    const prevPage = () => {
        if(currentPage - 1 >= 0) {
            setCurrentPage(currentPage - 1);
        }
    }

    const nextPage = () => {
        if(currentPage + 1 <= pageTotal) {
            setCurrentPage(currentPage + 1);
        }
    }


    // Loop through the total number of pages and generate a Pagination.Item for each page
    for (let pageNo = 0; pageNo <= pageTotal; pageNo++) {
        items.push(
            <Pagination.Item
                key={pageNo}
                active={pageNo === currentPage}
                onClick={() => onPageChange(pageNo)}
            >
                {pageNo + 1}
            </Pagination.Item>
        );
    }

    return (
        <Pagination className='paging mt-24'>
            <Pagination.Prev onClick={() => { prevPage() }} />
            <Pagination>{items}</Pagination>
            <Pagination.Next onClick={() => { nextPage() }} />
        </Pagination>
    );

}
