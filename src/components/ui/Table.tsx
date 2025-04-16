/**
 * @fileoverview A reusable responsive table component with pagination and row actions for history and bookmark views.
 */

import React, { useState } from 'react';
import { 
    Table as MUITable,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    CircularProgress,
    Box,
    useTheme,
    useMediaQuery,
    IconButton,
    Tooltip
} from '@mui/material';
import { DateTime } from 'luxon';
import Image from 'next/image';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTruncate } from '../custom-hooks';

/**
 * Type definition for table column configuration
 * @interface Column
 * @property {string} id - Unique identifier for the column
 * @property {string} label - Display label for the column header
 * @property {string} [width] - Optional width for the column
 * @property {boolean} [hideOnMobile] - Whether to hide the column on mobile devices
 * @property {function} [render] - Optional custom render function for the column
 */
interface Column {
    id: string;
    label: string;
    width?: string;
    hideOnMobile?: boolean;
    render?: (row: TableData) => React.ReactNode;
}

/**
 * Type definition for table row data
 * @interface TableData
 * @property {string} uuid - Unique identifier for the row
 * @property {string} title - Title of the fact check
 * @property {string} [content5wh] - 5W1H content of the fact check
 * @property {string[]} [summary] - Summary points of the fact check
 * @property {string} createdAt - Creation timestamp
 * @property {boolean} [isBookmarked] - Whether the item is bookmarked
 * @property {function} [onBookmark] - Callback for bookmark action
 * @property {function} [onDelete] - Callback for delete action
 */
export interface TableData {
    uuid: string;
    title: string;
    content5wh?: string;
    summary?: string[];
    createdAt: string;
    isBookmarked?: boolean;
    onBookmark?: (uuid: string) => void;
    onDelete?: (uuid: string) => void;
}

/**
 * Type definition for table props
 * @interface TableProps
 * @property {TableData[]} data - Array of table data
 * @property {number} totalItems - Total number of items for pagination
 * @property {number} page - Current page number
 * @property {boolean} [loading] - Loading state of the table
 * @property {function} onPageChange - Callback for page change
 * @property {boolean} [isBookmarkView] - Whether the table is in bookmark view
 */
interface TableProps {
    data: TableData[];
    totalItems: number;
    page: number;
    loading?: boolean;
    onPageChange: (page: number) => void;
    isBookmarkView?: boolean;
}

/**
 * A reusable table component with pagination for history and bookmark views
 * @param {TableProps} props - The props for the Table component
 * @returns {JSX.Element} The rendered Table component
 */
const Table: React.FC<TableProps> = ({
    data,
    totalItems,
    page,
    loading = false,
    onPageChange,
    isBookmarkView = false
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const router = useRouter();

    // Column definitions
    const columns: Column[] = [
        {
            id: 'title',
            label: 'Title',
            width: '20%',
            render: (row: TableData) => (
                <div className="text-[#383E42] truncate hover-bold">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {useTruncate(row.title || 'No title', 40)}
                    </ReactMarkdown>
                </div>
            )
        },
        {
            id: 'content',
            label: 'Content',
            width: '55%',
            hideOnMobile: true,
            render: (row: TableData) => (
                <div className="text-[#545C62] truncate hover-bold">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {useTruncate(row.content5wh || row.summary?.join(' ') || 'No content available', 40)}
                    </ReactMarkdown>
                </div>
            )
        },
        {
            id: 'createdAt',
            label: 'Date',
            width: '15%',
            render: (row: TableData) => {
                const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                const parsedDate = DateTime.fromISO(row.createdAt, { zone: userTimeZone });
                return (
                    <div className="text-[#545C62] hover-bold">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            { row?.createdAt }
                        </ReactMarkdown>
                    </div>
                );
            }
        },
        {
            id: 'actions',
            label: 'Actions',
            width: '10%',
            render: (row: TableData) => (
                <div className="flex items-center gap-2">
                    {!isBookmarkView && (
                        <Tooltip title={row.isBookmarked ? "Remove Bookmark" : "Add Bookmark"}>
                            <IconButton 
                                size="small"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    row.onBookmark?.(row.uuid);
                                }}
                            >
                                {row.isBookmarked ? (
                                    <BookmarkIcon sx={{ color: '#4582C4' }} />
                                ) : (
                                    <BookmarkBorderIcon sx={{ color: '#545C62' }} />
                                )}
                            </IconButton>
                        </Tooltip>
                    )}
                    <Tooltip title="Delete">
                        <IconButton 
                            size="small"
                            onClick={(e) => {
                                e.stopPropagation();
                                row.onDelete?.(row.uuid);
                            }}
                        >
                            <DeleteIcon sx={{ color: '#545C62' }} />
                        </IconButton>
                    </Tooltip>
                </div>
            )
        }
    ];

    const handleRowClick = (uuid: string) => {
        router.push(`/history/${uuid}`);
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                <CircularProgress sx={{ color: '#4582C4' }} />
            </Box>
        );
    }

    if (!data.length) {
        return (
            <Box sx={{ textAlign: 'center', p: 3 }}>
                <div className="flex items-center justify-center flex-col gap-4">
                    <div className="flex items-center justify-center w-[50%] font-bold flex-col p-3 rounded-[1rem] gap-3 text-xl">
                        <span>
                            <Image
                                src={require('../../../public/icons/no_history.svg')}
                                alt="no data"
                                width={150}
                                height={150}
                                priority
                            />
                        </span>
                        <h1 className="font-[700] text-2xl text-[#383E42]">No items found</h1>
                        <span className='text-[#545C62]'>{isBookmarkView ? 'Your bookmarked items will appear here' : 'Your recent queries will appear here'}</span>
                    </div>
                </div>
            </Box>
        );
    }

    return (
        <Paper 
            className="w-full bg-[#F8FBFE] px-6" 
            elevation={0}
            sx={{
                '& .MuiTableCell-root': {
                    borderBottom: 'none',
                    padding: '16px 8px',
                },
            }}
        >
            <TableContainer>
                <MUITable className='px-6'>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                !isMobile || !column.hideOnMobile ? (
                                    <TableCell
                                        key={column.id}
                                        style={{ width: column.width }}
                                        className="text-[#383E42] font-medium"
                                    >
                                        {column.label}
                                    </TableCell>
                                ) : null
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <TableRow
                                key={row.uuid}
                                hover
                                onClick={() => handleRowClick(row.uuid)}
                                className="cursor-pointer transition-colors duration-200 group"
                                sx={{
                                    '&:hover': {
                                        backgroundColor: '#E8F8FD !important'
                                    },
                                    '&:hover .hover-bold': {
                                        fontWeight: 500
                                    }
                                }}
                            >
                                {columns.map((column) => (
                                    !isMobile || !column.hideOnMobile ? (
                                        <TableCell key={column.id}>
                                            {column.render ? column.render(row) : row[column.id as keyof TableData]?.toString()}
                                        </TableCell>
                                    ) : null
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </MUITable>
            </TableContainer>
            <TablePagination
                component="div"
                count={totalItems}
                page={page}
                onPageChange={(_, newPage) => onPageChange(newPage)}
                rowsPerPage={10}
                rowsPerPageOptions={[10]}
                sx={{
                    '.MuiTablePagination-select': {
                        display: 'none',
                    },
                    '.MuiTablePagination-selectLabel': {
                        display: 'none',
                    },
                    '.MuiTablePagination-displayedRows': {
                        color: '#545C62',
                    },
                    '.MuiTablePagination-actions': {
                        color: '#4582C4',
                        button: {
                            '&:hover': {
                                backgroundColor: '#F3F5F6',
                            },
                            '&.Mui-disabled': {
                                color: '#545C62',
                            }
                        }
                    }
                }}
            />
        </Paper>
    );
};

export default Table; 