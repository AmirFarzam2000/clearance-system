import React, { useState, useRef, useCallback } from 'react';
import { 
  CubeIcon, 
  EllipsisVerticalIcon, 
  FunnelIcon, 
  Bars3Icon,
  EyeIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

interface TableColumn {
  key: string;
  title: string;
  sortable?: boolean;
  filterable?: boolean;
  width?: number;
  minWidth?: number;
  resizable?: boolean;
}

interface TableRow {
  [key: string]: any;
  id?: number;
  title?: string;
  alternativeTitle?: string;
  iso?: string;
  count?: number;
}

interface TableProps {
  columns: TableColumn[];
  data: TableRow[];
  onSort?: (column: string, direction: 'asc' | 'desc') => void;
  onFilter?: (column: string, value: string) => void;
  onEdit?: (row: TableRow) => void;
  onDelete?: (row: TableRow) => void;
  onView?: (row: TableRow) => void;
}

const Table: React.FC<TableProps> = ({
  columns,
  data,
  onEdit,
  onDelete,
  onView
}) => {
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>(() => {
    const widths: Record<string, number> = {};
    columns.forEach(col => {
      widths[col.key] = col.width || 150;
    });
    return widths;
  });

  const [isResizing, setIsResizing] = useState<string | null>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent, columnKey: string) => {
    e.preventDefault();
    setIsResizing(columnKey);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing || !tableRef.current) return;

    const rect = tableRef.current.getBoundingClientRect();
    const newWidth = e.clientX - rect.left;
    const minWidth = columns.find(col => col.key === isResizing)?.minWidth || 100;

    if (newWidth >= minWidth) {
      setColumnWidths(prev => ({
        ...prev,
        [isResizing]: newWidth
      }));
    }
  }, [isResizing, columns]);

  const handleMouseUp = useCallback(() => {
    setIsResizing(null);
  }, []);

  React.useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizing, handleMouseMove, handleMouseUp]);

  return (
    <div ref={tableRef} className="relative bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-y-auto max-h-[600px] overflow-x-auto">
        <div className="sticky top-0 z-20 bg-gray-50 border-b border-gray-200">
          <table className="w-full border-collapse bg-transparent min-w-full table-fixed">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className="px-4 py-3 text-center font-yekan-bold text-gray-900 bg-gray-50 border-l border-gray-200 last:border-l-0 text-sm relative"
                    style={{ width: `${columnWidths[column.key]}px` }}
                  >
                    <div className="flex items-center justify-between h-full">
                      <div className="flex items-center gap-2 flex-1 justify-center">
                        <span className="text-sm font-yekan-bold text-gray-900">{column.title}</span>
                        {column.key !== 'actions' && (
                          <CubeIcon className="w-3 h-3 text-gray-400" />
                        )}
                      </div>
                      {column.key !== 'actions' && (
                        <div className="flex items-center gap-1">
                          <EllipsisVerticalIcon className="w-3 h-3 text-gray-400" />
                          <FunnelIcon className="w-3 h-3 text-blue-400" />
                          <Bars3Icon className="w-3 h-3 text-blue-400" />
                        </div>
                      )}
                    </div>
                    {column.resizable !== false && (
                      <div
                        className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-blue-300 bg-transparent"
                        onMouseDown={(e) => handleMouseDown(e, column.key)}
                      />
                    )}
                  </th>
                ))}
              </tr>
            </thead>
          </table>
        </div>
        
        <table className="w-full border-collapse bg-white min-w-full table-fixed">
          <tbody>
            {data.map((row, index) => (
              <tr 
                key={index} 
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-4 py-3 text-center font-yekan text-gray-900 border-l border-gray-200 last:border-l-0 text-sm"
                    style={{ width: `${columnWidths[column.key]}px` }}
                  >
                    {column.key === 'actions' ? (
                      <div className="flex items-center justify-center gap-2">
                        {onView && (
                          <button
                            onClick={() => onView?.(row)}
                            className="p-1.5 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors duration-150"
                            title="مشاهده"
                          >
                            <EyeIcon className="w-4 h-4" />
                          </button>
                        )}
                        {onEdit && (
                          <button
                            onClick={() => onEdit?.(row)}
                            className="p-1.5 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors duration-150"
                            title="ویرایش"
                          >
                            <PencilIcon className="w-4 h-4" />
                          </button>
                        )}
                        {onDelete && (
                          <button
                            onClick={() => onDelete?.(row)}
                            className="p-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors duration-150"
                            title="حذف"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ) : (
                      <span className="text-sm font-yekan text-gray-900">{row[column.key]}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
