export interface TableColumn {
  id: string;
  label: string;
  field?: string;
  sortable?: boolean;
  filterable?: boolean;
  editable?: boolean;
  width?: string;
  minWidth?: string;
  align?: 'left' | 'center' | 'right';
  visible?: boolean;
  sticky?: boolean;
  render?: (value: any, row: any, rowIndex: number) => string | HTMLElement;
  children?: TableColumn[]; // For column grouping (multi-level headers)
  type?: 'text' | 'number' | 'date' | 'boolean' | 'select' | 'custom' | 'radio' | 'checkbox' | 'rating' | 'image' | 'password' | 'datetime' | 'time' | 'switch' | 'email' | 'url' | 'tel';
  selectOptions?: { label: string; value: any }[];
  radioOptions?: { label: string; value: any }[];
  format?: (value: any) => string;
  groupBy?: boolean; // Enable row grouping by this column
  groupable?: boolean; // Column can be used for grouping
  maxRating?: number; // For rating type (default 5)
  imageStyle?: { width?: string; height?: string; borderRadius?: string }; // For image type
}

export interface TableRow {
  id: string | number;
  [key: string]: any;
}

export interface TableConfig {
  columns: TableColumn[];
  data: TableRow[];
  selectable?: boolean;
  multiSelect?: boolean;
  editable?: boolean;
  stickyHeader?: boolean;
  pagination?: boolean;
  pageSize?: number;
  pageSizeOptions?: number[];
  searchable?: boolean;
  sortable?: boolean;
  filterable?: boolean;
  columnReorder?: boolean;
  columnVisibility?: boolean;
  rowHeight?: 'compact' | 'normal' | 'comfortable';
  striped?: boolean;
  hoverable?: boolean;
  bordered?: boolean;
  loading?: boolean;
  emptyMessage?: string;
  serverSide?: boolean;
  totalRows?: number;
  exportable?: boolean;
  responsive?: boolean;
  grouping?: GroupConfig;
}

export interface SortConfig {
  field: string;
  direction: 'asc' | 'desc' | null;
}

export interface FilterConfig {
  [field: string]: string | number | boolean | null;
}

export interface GroupConfig {
  field: string;
  expandByDefault?: boolean;
  showCount?: boolean;
  customLabel?: (value: any, count: number) => string;
}

export interface PaginationState {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalRows: number;
}

export interface TableState {
  selectedRows: Set<string | number>;
  sortConfig: SortConfig;
  filterConfig: FilterConfig;
  searchQuery: string;
  pagination: PaginationState;
  editingCell: { rowId: string | number; field: string } | null;
  columnOrder: string[];
  visibleColumns: Set<string>;
  columnWidths: Map<string, number>;
  expandedGroups: Set<string>;
  groupBy: string | null;
}

export interface ExportOptions {
  format: 'csv' | 'excel' | 'json';
  fileName?: string;
  selectedOnly?: boolean;
  visibleColumnsOnly?: boolean;
}
