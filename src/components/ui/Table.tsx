
import React from 'react';

export interface Column {
  title: string;
  dataIndex?: string;
  key: string;
  render?: (text: any, record: any) => React.ReactNode;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
}

interface TableProps {
  columns: Column[];
  dataSource: any[];
  rowKey?: string;
  className?: string;
  rowClassName?: string;
  pagination?: any; // To support AntD API but we might ignore it for now or implement simple logic
}

export const Table = ({ columns, dataSource, rowKey = 'id', className, pagination }: TableProps) => {
  return (
    <div className={`overflow-x-auto rounded-3xl border border-[#e8d5c4] shadow-sm ${className || ""}`}>
        <table className="w-full text-left border-collapse">
            <thead>
                <tr className="bg-[#f8f4ef] text-[#5c4028] border-b border-[#e8d5c4]">
                    {columns.map(col => (
                        <th 
                          key={col.key} 
                          className={`px-6 py-5 font-bold text-sm uppercase tracking-wider ${col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'}`}
                          style={{ fontFamily: "'Quicksand', sans-serif" }}
                        >
                            {col.title}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-[#f5ebe0]">
                {dataSource && dataSource.length > 0 ? (
                  dataSource.map((row, index) => (
                      <tr key={row[rowKey] || index} className="hover:bg-[#fef9f3] transition-colors duration-200">
                          {columns.map(col => (
                              <td 
                                key={col.key} 
                                className={`px-6 py-4 text-[#5c4028] ${col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'}`}
                                style={{ fontFamily: "'Quicksand', sans-serif" }}
                              >
                                  {col.render ? col.render(row[col.dataIndex!], row) : row[col.dataIndex!]}
                              </td>
                          ))}
                      </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={columns.length} className="px-6 py-12 text-center text-[#8b6f47]">
                      No data found
                    </td>
                  </tr>
                )}
            </tbody>
        </table>
    </div>
  );
};
