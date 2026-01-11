import React from 'react';
import { Pagination } from 'antd';

const TablePagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div
            className="mt-4 text-sm pt-2 flex justify-between items-center px-4"
            style={{
                borderTop: '2px solid var(--main-color)',
                position: 'sticky',
                bottom: 0,
                backgroundColor: 'white',
                zIndex: 10,
            }}
        >
            <p className="text-gray-700">
                Page {currentPage} of {totalPages || 1}
            </p>

            <Pagination
                current={currentPage}
                total={totalPages * 10}
                pageSize={10}
                onChange={onPageChange}
                showSizeChanger={false}
                hideOnSinglePage
                itemRender={(page, type, originalElement) => {
                    if (type === 'prev') {
                        return (
                            <button
                                disabled={currentPage === 1}
                                style={{
                                    border: '1px solid var(--main-color)',
                                    borderRadius: '6px',
                                    padding: '4px 12px',
                                    backgroundColor: currentPage === 1 ? '#e5e7eb' : 'transparent',
                                    color: currentPage === 1 ? '#9ca3af' : 'var(--main-color)',
                                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                                }}
                                onMouseEnter={(e) => {
                                    if (currentPage !== 1) {
                                        e.target.style.backgroundColor = 'var(--main-hover-color)';
                                        e.target.style.color = 'var(--main-text-color)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (currentPage !== 1) {
                                        e.target.style.backgroundColor = 'transparent';
                                        e.target.style.color = 'var(--main-color)';
                                    }
                                }}
                            >
                                Prev
                            </button>
                        );
                    }
                    if (type === 'next') {
                        return (
                            <button
                                disabled={currentPage === totalPages || totalPages === 0}
                                style={{
                                    border: '1px solid var(--main-color)',
                                    borderRadius: '6px',
                                    padding: '4px 12px',
                                    backgroundColor:
                                        currentPage === totalPages || totalPages === 0
                                            ? '#e5e7eb'
                                            : 'transparent',
                                    color:
                                        currentPage === totalPages || totalPages === 0
                                            ? '#9ca3af'
                                            : 'var(--main-color)',
                                    cursor:
                                        currentPage === totalPages || totalPages === 0
                                            ? 'not-allowed'
                                            : 'pointer',
                                }}
                                onMouseEnter={(e) => {
                                    if (currentPage !== totalPages && totalPages !== 0) {
                                        e.target.style.backgroundColor = 'var(--main-hover-color)';
                                        e.target.style.color = 'var(--main-text-color)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (currentPage !== totalPages && totalPages !== 0) {
                                        e.target.style.backgroundColor = 'transparent';
                                        e.target.style.color = 'var(--main-color)';
                                    }
                                }}
                            >
                                Next
                            </button>
                        );
                    }
                    return originalElement;
                }}
            />
        </div>
    );
};

export default TablePagination;
