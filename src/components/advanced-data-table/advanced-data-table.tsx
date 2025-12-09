import { Component, h, Prop, State, Event, EventEmitter, Element, Watch, Method } from '@stencil/core';
import { TableColumn, TableRow, TableConfig, SortConfig, FilterConfig, TableState, ExportOptions } from './types';

@Component({
  tag: 'ui-advanced-data-table',
  styleUrl: 'advanced-data-table.css',
  shadow: true,
})
export class AdvancedDataTable {
  @Element() el: HTMLElement;

  /**
   * Table configuration
   */
  @Prop() config: TableConfig | string = {
    columns: [],
    data: [],
    selectable: false,
    pagination: true,
    pageSize: 10,
  };

  /**
   * Columns definition
   */
  @Prop() columns: TableColumn[] | string = [];

  /**
   * Table data
   */
  @Prop() data: TableRow[] | string = [];

  /**
   * Enable row selection
   */
  @Prop() selectable: boolean = false;

  /**
   * Enable multiple row selection
   */
  @Prop() multiSelect: boolean = true;

  /**
   * Enable inline editing
   */
  @Prop() editable: boolean = false;

  /**
   * Enable sticky header
   */
  @Prop() stickyHeader: boolean = true;

  /**
   * Enable pagination
   */
  @Prop() pagination: boolean = true;

  /**
   * Page size
   */
  @Prop() pageSize: number = 10;

  /**
   * Page size options
   */
  @Prop() pageSizeOptions: number[] | string = [5, 10, 25, 50, 100];

  /**
   * Enable global search
   */
  @Prop() searchable: boolean = true;

  /**
   * Enable sorting
   */
  @Prop() sortable: boolean = true;

  /**
   * Enable filtering
   */
  @Prop() filterable: boolean = true;

  /**
   * Enable column reordering
   */
  @Prop() columnReorder: boolean = true;

  /**
   * Enable column visibility toggle
   */
  @Prop() columnVisibility: boolean = true;

  /**
   * Row height variant
   */
  @Prop() rowHeight: 'compact' | 'normal' | 'comfortable' = 'normal';

  /**
   * Enable striped rows
   */
  @Prop() striped: boolean = true;

  /**
   * Enable hover effect
   */
  @Prop() hoverable: boolean = true;

  /**
   * Enable borders
   */
  @Prop() bordered: boolean = true;

  /**
   * Loading state
   */
  @Prop() loading: boolean = false;

  /**
   * Show skeleton while loading
   */
  @Prop() showSkeleton: boolean = true;

  /**
   * Number of skeleton rows to show
   */
  @Prop() skeletonRows: number = 5;

  /**
   * Empty message
   */
  @Prop() emptyMessage: string = 'No data available';

  /**
   * Server-side mode
   */
  @Prop() serverSide: boolean = false;

  /**
   * Total rows (for server-side pagination)
   */
  @Prop() totalRows: number = 0;

  /**
   * Enable export
   */
  @Prop() exportable: boolean = true;

  /**
   * Theme mode
   */
  @Prop() theme: 'light' | 'dark' | 'auto' = 'auto';

  /**
   * Enable data grouping
   */
  @Prop() grouping: boolean = false;

  /**
   * Field to group by (for row grouping)
   */
  @Prop() groupBy: string = '';

  /**
   * Expand groups by default
   */
  @Prop() expandGroupsByDefault: boolean = true;

  /**
   * Show group count
   */
  @Prop() showGroupCount: boolean = true;

  /**
   * Enable column grouping (multi-level headers)
   */
  @Prop() columnGrouping: boolean = false;

  /**
   * Enable row grouping controls in toolbar
   */
  @Prop() showGroupingControls: boolean = true;

  /**
   * Show actions menu (3-dot menu) for each row
   */
  @Prop() showActions: boolean = false;

  /**
   * Custom actions to show in the row actions menu
   */
  @Prop() customActions?: Array<{ label: string; value: string; icon?: string }>;

  /**
   * Enable column pinning
   */
  @Prop() columnPinning: boolean = true;

  /**
   * Enable row pinning
   */
  @Prop() rowPinning: boolean = true;

  /**
   * Enable row spanning
   */
  @Prop() rowSpanning: boolean = false;

  /**
   * Enable row reordering via drag and drop
   */
  @Prop() rowReorder: boolean = false;

  /**
   * Enable multi-column filtering
   */
  @Prop() multiFilter: boolean = true;

  /**
   * Show filter panel
   */
  @Prop() showFilterPanel: boolean = false;

  /**
   * Show column panel
   */
  @Prop() showColumnPanel: boolean = false;

  /**
   * Component state
   */
  @State() state: TableState = {
    selectedRows: new Set(),
    sortConfig: { field: '', direction: null },
    filterConfig: {},
    searchQuery: '',
    pagination: {
      currentPage: 1,
      pageSize: 10,
      totalPages: 1,
      totalRows: 0,
    },
    editingCell: null,
    columnOrder: [],
    visibleColumns: new Set(),
    columnWidths: new Map(),
    expandedGroups: new Set(),
    groupBy: null,
  };

  @State() draggedColumn: string | null = null;
  @State() draggedRow: number | null = null;
  @State() showColumnSettings: boolean = false;
  @State() showExportDialog: boolean = false;
  @State() resizingColumn: string | null = null;
  @State() activeActionMenu: string | number | null = null;
  @State() pinnedColumns: { left: string[]; right: string[] } = { left: [], right: [] };
  @State() pinnedRows: { top: number[]; bottom: number[] } = { top: [], bottom: [] };
  @State() editingRow: string | number | null = null;
  @State() activeFilters: Map<string, any[]> = new Map();

  /**
   * Events
   */
  @Event() rowSelect: EventEmitter<{ selectedRows: (string | number)[] }>;
  @Event() rowDeselect: EventEmitter<{ selectedRows: (string | number)[] }>;
  @Event() cellEdit: EventEmitter<{ rowId: string | number; field: string; value: any }>;
  @Event() cellEditStart: EventEmitter<{ rowId: string | number; field: string; value: any }>;
  @Event() cellEditStop: EventEmitter<{ rowId: string | number; field: string; value: any }>;
  @Event() rowEditStart: EventEmitter<{ row: any }>;
  @Event() rowEditStop: EventEmitter<{ row: any }>;
  @Event() sortChange: EventEmitter<SortConfig>;
  @Event() filterChange: EventEmitter<FilterConfig>;
  @Event() pageChange: EventEmitter<{ page: number; pageSize: number }>;
  @Event() searchChange: EventEmitter<{ query: string }>;
  @Event() columnOrderChange: EventEmitter<{ order: string[] }>;
  @Event() columnVisibilityChange: EventEmitter<{ visible: string[] }>;
  @Event() columnPin: EventEmitter<{ columnId: string; position: 'left' | 'right' | 'none' }>;
  @Event() rowPin: EventEmitter<{ rowId: number; position: 'top' | 'bottom' | 'none' }>;
  @Event() rowReorderEvent: EventEmitter<{ fromIndex: number; toIndex: number }>;
  @Event() dataExport: EventEmitter<{ data: any[]; format: string }>;
  @Event() groupToggle: EventEmitter<{ groupKey: string; expanded: boolean }>;
  @Event() groupByChange: EventEmitter<{ field: string }>;
  @Event() rowEdit: EventEmitter<{ row: any }>;
  @Event() rowDelete: EventEmitter<{ row: any }>;
  @Event() rowAction: EventEmitter<{ row: any; action: string }>;
  private resizeObserver: ResizeObserver;
  private editInputRef: HTMLInputElement | HTMLSelectElement;
  private resizeStartX: number = 0;
  private resizeStartWidth: number = 0;
  private resizingColumnId: string = '';

  componentWillLoad() {
    this.initializeState();
  }

  componentDidLoad() {
    this.setupResizeObserver();
    this.applyTheme();
    this.setupClickOutsideListener();
  }

  disconnectedCallback() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    // Clean up resize event listeners
    document.removeEventListener('mousemove', this.handleResizeMove);
    document.removeEventListener('mouseup', this.handleResizeEnd);
    // Clean up click outside listener
    document.removeEventListener('click', this.handleClickOutside);
  }

  @Watch('data')
  @Watch('columns')
  onDataOrColumnsChange() {
    this.initializeState();
  }

  @Watch('pageSize')
  onPageSizeChange(newSize: number) {
    this.state = {
      ...this.state,
      pagination: {
        ...this.state.pagination,
        pageSize: newSize,
        currentPage: 1,
        totalPages: this.calculateTotalPages(newSize),
      },
    };
  }

  @Watch('groupBy')
  onGroupByChange(newGroupBy: string) {
    this.handleGroupByChange(newGroupBy);
  }

  @Watch('theme')
  onThemeChange() {
    this.applyTheme();
  }

  /**
   * Public methods
   */
  @Method()
  async selectRow(rowId: string | number) {
    const newSelected = new Set(this.state.selectedRows);
    newSelected.add(rowId);
    this.updateSelectedRows(newSelected);
  }

  @Method()
  async deselectRow(rowId: string | number) {
    const newSelected = new Set(this.state.selectedRows);
    newSelected.delete(rowId);
    this.updateSelectedRows(newSelected);
  }

  @Method()
  async selectAllRows() {
    const allIds = this.getProcessedData().map(row => row.id);
    this.updateSelectedRows(new Set(allIds));
  }

  @Method()
  async deselectAllRows() {
    this.updateSelectedRows(new Set());
  }

  @Method()
  async getSelectedRows() {
    return Array.from(this.state.selectedRows);
  }

  @Method()
  async exportData(options: ExportOptions = { format: 'csv' }) {
    const data = this.prepareExportData(options);
    this.performExport(data, options);
  }

  @Method()
  async resetFilters() {
    this.state = {
      ...this.state,
      filterConfig: {},
      searchQuery: '',
      pagination: { ...this.state.pagination, currentPage: 1 },
    };
  }

  @Method()
  async resetSort() {
    this.state = {
      ...this.state,
      sortConfig: { field: '', direction: null },
    };
  }

  @Method()
  async goToPage(page: number) {
    if (page >= 1 && page <= this.state.pagination.totalPages) {
      this.state = {
        ...this.state,
        pagination: { ...this.state.pagination, currentPage: page },
      };
      this.pageChange.emit({ page, pageSize: this.state.pagination.pageSize });
    }
  }

  @Method()
  async refresh() {
    this.initializeState();
  }

  private initializeState() {
    const cols = this.parseColumns();
    const flatColumns = this.flattenColumns(cols);
    
    // Initialize column widths with smart distribution
    const columnWidths = this.calculateInitialColumnWidths(flatColumns);
    
    // Initialize grouping
    const initialGroupBy = this.groupBy || null;
    const expandedGroups = new Set<string>();
    
    if (initialGroupBy && this.expandGroupsByDefault) {
      // We'll populate this after data is available
      const data = this.parseData();
      const groups = this.groupData(data, initialGroupBy);
      groups.forEach((_, key) => expandedGroups.add(key));
    }
    
    this.state = {
      ...this.state,
      columnOrder: flatColumns.map(col => col.id),
      visibleColumns: new Set(flatColumns.filter(col => col.visible !== false).map(col => col.id)),
      columnWidths: columnWidths,
      groupBy: initialGroupBy,
      expandedGroups: expandedGroups,
      pagination: {
        currentPage: 1,
        pageSize: this.pageSize,
        totalPages: this.calculateTotalPages(this.pageSize),
        totalRows: this.getTotalRows(),
      },
    };
  }

  private parseColumns(): TableColumn[] {
    if (typeof this.columns === 'string') {
      try {
        return JSON.parse(this.columns);
      } catch {
        return [];
      }
    }
    return this.columns || [];
  }

  private parseData(): TableRow[] {
    if (typeof this.data === 'string') {
      try {
        return JSON.parse(this.data);
      } catch {
        return [];
      }
    }
    return this.data || [];
  }

  private parsePageSizeOptions(): number[] {
    if (typeof this.pageSizeOptions === 'string') {
      try {
        return JSON.parse(this.pageSizeOptions);
      } catch {
        return [5, 10, 25, 50, 100];
      }
    }
    return this.pageSizeOptions;
  }

  private flattenColumns(columns: TableColumn[]): TableColumn[] {
    const result: TableColumn[] = [];
    const flatten = (cols: TableColumn[]) => {
      cols.forEach(col => {
        if (col.children && col.children.length > 0) {
          flatten(col.children);
        } else {
          result.push(col);
        }
      });
    };
    flatten(columns);
    return result;
  }

  private getVisibleColumns(): TableColumn[] {
    const cols = this.parseColumns();
    const flatColumns = this.flattenColumns(cols);
    return this.state.columnOrder
      .map(id => flatColumns.find(col => col.id === id))
      .filter(col => col && this.state.visibleColumns.has(col.id));
  }

  private getTotalRows(): number {
    if (this.serverSide) {
      return this.totalRows;
    }
    return this.parseData().length;
  }

  private calculateTotalPages(pageSize: number): number {
    const total = this.getTotalRows();
    return Math.ceil(total / pageSize);
  }

  private getProcessedData(): TableRow[] {
    let data = this.parseData();

    // Apply search
    if (this.searchable && this.state.searchQuery) {
      data = this.applySearch(data, this.state.searchQuery);
    }

    // Apply filters
    if (this.filterable && Object.keys(this.state.filterConfig).length > 0) {
      data = this.applyFilters(data, this.state.filterConfig);
    }

    // Apply sort
    if (this.sortable && this.state.sortConfig.field && this.state.sortConfig.direction) {
      data = this.applySort(data, this.state.sortConfig);
    }

    // Update total rows after filtering
    if (!this.serverSide) {
      this.state.pagination.totalRows = data.length;
      this.state.pagination.totalPages = this.calculateTotalPages(this.state.pagination.pageSize);
    }

    // Apply pagination
    if (this.pagination && !this.serverSide) {
      data = this.applyPagination(data);
    }

    return data;
  }

  private applySearch(data: TableRow[], query: string): TableRow[] {
    const lowerQuery = query.toLowerCase();
    const columns = this.getVisibleColumns();
    
    return data.filter(row => {
      return columns.some(col => {
        const value = col.field ? row[col.field] : '';
        return String(value).toLowerCase().includes(lowerQuery);
      });
    });
  }

  private applyFilters(data: TableRow[], filters: FilterConfig): TableRow[] {
    return data.filter(row => {
      return Object.keys(filters).every(field => {
        const filterValue = filters[field];
        if (filterValue === null || filterValue === '') return true;
        
        const rowValue = row[field];
        if (typeof filterValue === 'string') {
          return String(rowValue).toLowerCase().includes(filterValue.toLowerCase());
        }
        return rowValue === filterValue;
      });
    });
  }

  private applySort(data: TableRow[], sort: SortConfig): TableRow[] {
    return [...data].sort((a, b) => {
      const aVal = a[sort.field];
      const bVal = b[sort.field];
      
      if (aVal === bVal) return 0;
      
      const comparison = aVal < bVal ? -1 : 1;
      return sort.direction === 'asc' ? comparison : -comparison;
    });
  }

  private applyPagination(data: TableRow[]): TableRow[] {
    const { currentPage, pageSize } = this.state.pagination;
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return data.slice(start, end);
  }

  private groupData(data: TableRow[], groupByField: string): Map<string, TableRow[]> {
    const groups = new Map<string, TableRow[]>();
    
    data.forEach(row => {
      const groupValue = row[groupByField] !== undefined && row[groupByField] !== null 
        ? String(row[groupByField]) 
        : '(Empty)';
      
      if (!groups.has(groupValue)) {
        groups.set(groupValue, []);
      }
      groups.get(groupValue)!.push(row);
    });
    
    return groups;
  }

  private handleGroupToggle(groupKey: string) {
    const newExpanded = new Set(this.state.expandedGroups);
    
    if (newExpanded.has(groupKey)) {
      newExpanded.delete(groupKey);
    } else {
      newExpanded.add(groupKey);
    }
    
    this.state = { ...this.state, expandedGroups: newExpanded };
    this.groupToggle.emit({ groupKey, expanded: newExpanded.has(groupKey) });
  }

  private handleGroupByChange(field: string) {
    const newGroupBy = field === this.state.groupBy ? null : field;
    
    // Initialize expanded groups based on expandGroupsByDefault prop
    const expandedGroups = new Set<string>();
    if (newGroupBy && this.expandGroupsByDefault) {
      const data = this.getProcessedData();
      const groups = this.groupData(data, newGroupBy);
      groups.forEach((_, key) => expandedGroups.add(key));
    }
    
    this.state = { 
      ...this.state, 
      groupBy: newGroupBy,
      expandedGroups: expandedGroups,
    };
    
    if (newGroupBy) {
      this.groupByChange.emit({ field: newGroupBy });
    }
  }

  private handleSort(field: string) {
    if (!this.sortable) return;

    const currentSort = this.state.sortConfig;
    let newDirection: 'asc' | 'desc' | null = 'asc';

    if (currentSort.field === field) {
      if (currentSort.direction === 'asc') {
        newDirection = 'desc';
      } else if (currentSort.direction === 'desc') {
        newDirection = null;
      }
    }

    const newSort: SortConfig = {
      field: newDirection ? field : '',
      direction: newDirection,
    };

    this.state = { ...this.state, sortConfig: newSort };
    this.sortChange.emit(newSort);
  }

  private handleSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.state = {
      ...this.state,
      searchQuery: input.value,
      pagination: { ...this.state.pagination, currentPage: 1 },
    };
    this.searchChange.emit({ query: input.value });
  }

  private handleFilter(field: string, value: string) {
    const newFilters = { ...this.state.filterConfig };
    if (value === '') {
      delete newFilters[field];
    } else {
      newFilters[field] = value;
    }

    this.state = {
      ...this.state,
      filterConfig: newFilters,
      pagination: { ...this.state.pagination, currentPage: 1 },
    };
    this.filterChange.emit(newFilters);
  }

  private handleRowSelect(rowId: string | number, event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const newSelected = new Set(this.state.selectedRows);

    if (checkbox.checked) {
      if (this.multiSelect) {
        newSelected.add(rowId);
      } else {
        newSelected.clear();
        newSelected.add(rowId);
      }
    } else {
      newSelected.delete(rowId);
    }

    this.updateSelectedRows(newSelected);
  }

  private handleSelectAll(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      const allIds = this.getProcessedData().map(row => row.id);
      this.updateSelectedRows(new Set(allIds));
    } else {
      this.updateSelectedRows(new Set());
    }
  }

  private updateSelectedRows(selected: Set<string | number>) {
    this.state = { ...this.state, selectedRows: selected };
    const selectedArray = Array.from(selected);
    if (selected.size > 0) {
      this.rowSelect.emit({ selectedRows: selectedArray });
    } else {
      this.rowDeselect.emit({ selectedRows: selectedArray });
    }
  }

  private handleCellEdit(rowId: string | number, field: string, value: any) {
    // Emit stop event before edit
    this.cellEditStop.emit({ rowId, field, value });
    
    // Emit main edit event
    this.cellEdit.emit({ rowId, field, value });
    
    // Clear editing state
    this.state = { ...this.state, editingCell: null };
    
    // Check if row editing should stop
    if (this.editingRow === rowId && !this.editable) {
      this.stopRowEdit(rowId);
    }
  }

  private startCellEdit(rowId: string | number, field: string) {
    if (!this.editable) return;
    
    const row = Array.isArray(this.data) ? this.data.find(r => r.id === rowId) : null;
    const currentValue = row ? row[field] : null;
    
    // Emit start event
    this.cellEditStart.emit({ rowId, field, value: currentValue });
    
    // Start row editing if not already started
    if (this.editingRow !== rowId) {
      this.startRowEdit(rowId);
    }
    
    this.state = { ...this.state, editingCell: { rowId, field } };
    
    setTimeout(() => {
      if (this.editInputRef) {
        this.editInputRef.focus();
        if (this.editInputRef instanceof HTMLInputElement) {
          this.editInputRef.select();
        }
      }
    }, 0);
  }

  private startRowEdit(rowId: string | number) {
    const row = Array.isArray(this.data) ? this.data.find(r => r.id === rowId) : null;
    if (row) {
      this.editingRow = rowId;
      this.rowEditStart.emit({ row });
    }
  }

  private stopRowEdit(rowId: string | number) {
    const row = Array.isArray(this.data) ? this.data.find(r => r.id === rowId) : null;
    if (row) {
      this.editingRow = null;
      this.rowEditStop.emit({ row });
    }
  }

  private handlePageChange(page: number) {
    this.state = {
      ...this.state,
      pagination: { ...this.state.pagination, currentPage: page },
    };
    this.pageChange.emit({ page, pageSize: this.state.pagination.pageSize });
  }

  private handlePageSizeChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    const newPageSize = parseInt(select.value, 10);
    
    this.state = {
      ...this.state,
      pagination: {
        ...this.state.pagination,
        pageSize: newPageSize,
        currentPage: 1,
        totalPages: this.calculateTotalPages(newPageSize),
      },
    };
    
    this.pageChange.emit({ page: 1, pageSize: newPageSize });
  }

  private toggleColumnVisibility(columnId: string) {
    const newVisible = new Set(this.state.visibleColumns);
    if (newVisible.has(columnId)) {
      newVisible.delete(columnId);
    } else {
      newVisible.add(columnId);
    }
    this.state = { ...this.state, visibleColumns: newVisible };
    this.columnVisibilityChange.emit({ visible: Array.from(newVisible) });
  }

  private handleColumnDragStart(columnId: string, event: DragEvent) {
    this.draggedColumn = columnId;
    event.dataTransfer.effectAllowed = 'move';
  }

  private handleColumnDragOver(event: DragEvent) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }

  private handleColumnDrop(targetColumnId: string, event: DragEvent) {
    event.preventDefault();
    
    if (!this.draggedColumn || this.draggedColumn === targetColumnId) return;

    const newOrder = [...this.state.columnOrder];
    const draggedIndex = newOrder.indexOf(this.draggedColumn);
    const targetIndex = newOrder.indexOf(targetColumnId);

    newOrder.splice(draggedIndex, 1);
    newOrder.splice(targetIndex, 0, this.draggedColumn);

    this.state = { ...this.state, columnOrder: newOrder };
    this.columnOrderChange.emit({ order: newOrder });
    this.draggedColumn = null;
  }

  /**
   * Pin/Unpin column
   */
  public handleColumnPin(columnId: string, position: 'left' | 'right' | 'none') {
    const newPinned = { ...this.pinnedColumns };
    
    // Remove from both sides first
    newPinned.left = newPinned.left.filter(id => id !== columnId);
    newPinned.right = newPinned.right.filter(id => id !== columnId);
    
    // Add to new position
    if (position === 'left') {
      newPinned.left.push(columnId);
    } else if (position === 'right') {
      newPinned.right.push(columnId);
    }
    
    this.pinnedColumns = newPinned;
    this.columnPin.emit({ columnId, position });
  }

  /**
   * Pin/Unpin row
   */
  public handleRowPin(rowId: number, position: 'top' | 'bottom' | 'none') {
    const newPinned = { ...this.pinnedRows };
    
    // Remove from both positions first
    newPinned.top = newPinned.top.filter(id => id !== rowId);
    newPinned.bottom = newPinned.bottom.filter(id => id !== rowId);
    
    // Add to new position
    if (position === 'top') {
      newPinned.top.push(rowId);
    } else if (position === 'bottom') {
      newPinned.bottom.push(rowId);
    }
    
    this.pinnedRows = newPinned;
    this.rowPin.emit({ rowId, position });
  }

  /**
   * Row reordering handlers
   */
  public handleRowDragStart(rowIndex: number, event: DragEvent) {
    if (!this.rowReorder) return;
    this.draggedRow = rowIndex;
    event.dataTransfer.effectAllowed = 'move';
  }

  public handleRowDragOver(event: DragEvent) {
    if (!this.rowReorder) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }

  public handleRowDrop(targetRowIndex: number, event: DragEvent) {
    event.preventDefault();
    
    if (this.draggedRow === null || this.draggedRow === targetRowIndex) return;

    this.rowReorderEvent.emit({ fromIndex: this.draggedRow, toIndex: targetRowIndex });
    this.draggedRow = null;
  }

  /**
   * Multi-filter management
   */
  public addFilter(field: string, operator: string, value: any) {
    const fieldFilters = this.activeFilters.get(field) || [];
    fieldFilters.push({ operator, value });
    this.activeFilters.set(field, fieldFilters);
    
    // Update filter config
    const newFilters: any = { ...this.state.filterConfig };
    newFilters[field] = fieldFilters;
    this.state = { ...this.state, filterConfig: newFilters };
    this.filterChange.emit(newFilters);
  }

  public removeFilter(field: string, index: number) {
    const fieldFilters = this.activeFilters.get(field) || [];
    fieldFilters.splice(index, 1);
    
    if (fieldFilters.length === 0) {
      this.activeFilters.delete(field);
    } else {
      this.activeFilters.set(field, fieldFilters);
    }
    
    // Update filter config
    const newFilters: any = { ...this.state.filterConfig };
    if (fieldFilters.length === 0) {
      delete newFilters[field];
    } else {
      newFilters[field] = fieldFilters;
    }
    this.state = { ...this.state, filterConfig: newFilters };
    this.filterChange.emit(newFilters);
  }

  public clearAllFilters() {
    this.activeFilters.clear();
    this.state = { ...this.state, filterConfig: {} };
    this.filterChange.emit({});
  }

  private handleResizeStart = (columnId: string, event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    this.resizingColumnId = columnId;
    this.resizeStartX = event.clientX;
    this.resizeStartWidth = this.state.columnWidths.get(columnId) || 150;
    this.resizingColumn = columnId;
    
    document.addEventListener('mousemove', this.handleResizeMove);
    document.addEventListener('mouseup', this.handleResizeEnd);
    
    // Prevent text selection during resize
    document.body.style.userSelect = 'none';
  }

  private handleResizeMove = (event: MouseEvent) => {
    if (!this.resizingColumnId) return;
    
    const diff = event.clientX - this.resizeStartX;
    const newWidth = Math.max(50, this.resizeStartWidth + diff); // Minimum width of 50px
    
    const newWidths = new Map(this.state.columnWidths);
    newWidths.set(this.resizingColumnId, newWidth);
    
    this.state = {
      ...this.state,
      columnWidths: newWidths,
    };
  }

  private handleResizeEnd = () => {
    this.resizingColumnId = '';
    this.resizingColumn = null;
    document.body.style.userSelect = '';
    
    document.removeEventListener('mousemove', this.handleResizeMove);
    document.removeEventListener('mouseup', this.handleResizeEnd);
  }

  private calculateInitialColumnWidths(columns: TableColumn[]): Map<string, number> {
    const widths = new Map<string, number>();
    const visibleColumns = columns.filter(col => col.visible !== false);
    const columnCount = visibleColumns.length;
    
    // Base width calculation with non-linear scaling for many columns
    let baseWidth: number;
    if (columnCount <= 3) {
      baseWidth = 250;
    } else if (columnCount <= 6) {
      baseWidth = 200;
    } else if (columnCount <= 10) {
      baseWidth = 150;
    } else if (columnCount <= 15) {
      baseWidth = 120;
    } else {
      baseWidth = 100;
    }
    
    visibleColumns.forEach(col => {
      // Use specified width if available, otherwise use calculated base width
      if (col.width) {
        // Parse width (e.g., "200px" -> 200)
        const parsed = parseInt(col.width);
        widths.set(col.id, isNaN(parsed) ? baseWidth : parsed);
      } else {
        widths.set(col.id, baseWidth);
      }
    });
    
    return widths;
  }

  private prepareExportData(options: ExportOptions): any[] {
    let data = options.selectedOnly 
      ? this.parseData().filter(row => this.state.selectedRows.has(row.id))
      : this.getProcessedData();

    const columns = options.visibleColumnsOnly 
      ? this.getVisibleColumns()
      : this.flattenColumns(this.parseColumns());

    return data.map(row => {
      const exportRow: any = {};
      columns.forEach(col => {
        if (col.field) {
          exportRow[col.label] = col.format 
            ? col.format(row[col.field])
            : row[col.field];
        }
      });
      return exportRow;
    });
  }

  private performExport(data: any[], options: ExportOptions) {
    if (options.format === 'csv') {
      this.exportToCSV(data, options.fileName || 'export.csv');
    } else if (options.format === 'json') {
      this.exportToJSON(data, options.fileName || 'export.json');
    }
    
    this.dataExport.emit({ data, format: options.format });
    this.showExportDialog = false;
  }

  private exportToCSV(data: any[], fileName: string) {
    if (data.length === 0) return;

    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header];
          return typeof value === 'string' && value.includes(',') 
            ? `"${value}"` 
            : value;
        }).join(',')
      )
    ].join('\n');

    this.downloadFile(csvContent, fileName, 'text/csv');
  }

  private exportToJSON(data: any[], fileName: string) {
    const jsonContent = JSON.stringify(data, null, 2);
    this.downloadFile(jsonContent, fileName, 'application/json');
  }

  private downloadFile(content: string, fileName: string, mimeType: string) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
  }

  private setupResizeObserver() {
    this.resizeObserver = new ResizeObserver(() => {
      this.el.shadowRoot.host.dispatchEvent(new CustomEvent('tableResize'));
    });
    this.resizeObserver.observe(this.el);
  }

  private applyTheme() {
    const root = this.el.shadowRoot.querySelector('.data-table-container') as HTMLElement;
    if (!root) return;

    if (this.theme === 'auto') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.toggle('dark-mode', prefersDark);
    } else {
      root.classList.toggle('dark-mode', this.theme === 'dark');
    }
  }

  private setupClickOutsideListener = () => {
    document.addEventListener('click', this.handleClickOutside);
  }

  private handleClickOutside = (e: MouseEvent) => {
    // Close actions menu if clicking outside
    if (this.activeActionMenu !== null) {
      const target = e.target as HTMLElement;
      const actionsContainer = target.closest('.row-actions-container');
      
      // If click is outside any actions container, close the menu
      if (!actionsContainer) {
        this.activeActionMenu = null;
      }
    }
  }

  private renderSkeletonRows(columns: TableColumn[]): any {
    return Array.from({ length: this.skeletonRows }, (_, rowIndex) => (
      <tr key={`skeleton-${rowIndex}`} class="skeleton-row">
        {this.selectable && (
          <td class="skeleton-cell">
            <div class="skeleton-checkbox"></div>
          </td>
        )}
        {columns.map(col => (
          <td key={`skeleton-${rowIndex}-${col.id}`} class="skeleton-cell">
            <div class="skeleton-content"></div>
          </td>
        ))}
      </tr>
    ));
  }

  private renderColumnHeader(column: TableColumn): any {
    if (column.children && column.children.length > 0) {
      return (
        <th
          class="column-group"
          colSpan={column.children.length}
          style={{ textAlign: column.align || 'left' }}
        >
          <div class="column-header-content">
            <span>{column.label}</span>
          </div>
        </th>
      );
    }

    const isSorted = this.state.sortConfig.field === column.field;
    const sortDirection = isSorted ? this.state.sortConfig.direction : null;
    const columnWidth = this.state.columnWidths.get(column.id);

    return (
      <th
        class={{
          'sortable': this.sortable && column.sortable !== false,
          'sorted': isSorted,
          'sticky-column': column.sticky,
          'resizing': this.resizingColumn === column.id,
        }}
        style={{
          width: columnWidth ? `${columnWidth}px` : (column.width || 'auto'),
          minWidth: column.minWidth,
          textAlign: column.align || 'left',
          position: 'relative',
        }}
      >
        <div class="column-header-content">
          {this.columnReorder && (
            <span 
              class="drag-handle"
              draggable={true}
              onDragStart={(e) => this.handleColumnDragStart(column.id, e)}
              onDragOver={(e) => this.handleColumnDragOver(e)}
              onDrop={(e) => this.handleColumnDrop(column.id, e)}
              title="Drag to reorder"
            >
              ⋮⋮
            </span>
          )}
          <span
            class="column-label"
            onClick={() => column.sortable !== false && this.handleSort(column.field || column.id)}
          >
            {column.label}
          </span>
          {this.sortable && column.sortable !== false && (
            <span class="sort-icon">
              {!isSorted && '⇅'}
              {isSorted && sortDirection === 'asc' && '↑'}
              {isSorted && sortDirection === 'desc' && '↓'}
            </span>
          )}
        </div>
        {this.filterable && column.filterable !== false && (
          <div class="column-filter">
            <input
              type="text"
              placeholder={`Filter ${column.label}...`}
              value={this.state.filterConfig[column.field || column.id] as string || ''}
              onInput={(e) => this.handleFilter(column.field || column.id, (e.target as HTMLInputElement).value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
        <div
          class="resize-handle"
          onMouseDown={(e) => this.handleResizeStart(column.id, e)}
          onClick={(e) => e.stopPropagation()}
        ></div>
      </th>
    );
  }

  private renderTableHeaders(): any {
    const columns = this.parseColumns();
    const hasMultiLevel = columns.some(col => col.children && col.children.length > 0);

    if (!hasMultiLevel) {
      return (
        <tr>
          {this.selectable && (
            <th class="select-column">
              {this.multiSelect && (
                <input
                  type="checkbox"
                  checked={this.state.selectedRows.size === this.getProcessedData().length}
                  onInput={(e) => this.handleSelectAll(e)}
                  aria-label="Select all rows"
                />
              )}
            </th>
          )}
          {this.getVisibleColumns().map(col => this.renderColumnHeader(col))}
          {this.showActions && (
            <th class="actions-column">
              Actions
            </th>
          )}
        </tr>
      );
    }

    // Multi-level headers
    const headerRows: any[] = [];
    const maxDepth = this.getMaxColumnDepth(columns);

    for (let depth = 0; depth < maxDepth; depth++) {
      headerRows.push(
        <tr>
          {depth === 0 && this.selectable && (
            <th class="select-column" rowSpan={maxDepth}>
              {this.multiSelect && (
                <input
                  type="checkbox"
                  checked={this.state.selectedRows.size === this.getProcessedData().length}
                  onInput={(e) => this.handleSelectAll(e)}
                  aria-label="Select all rows"
                />
              )}
            </th>
          )}
          {this.renderHeaderLevel(columns, depth)}
          {depth === 0 && this.showActions && (
            <th class="actions-column" rowSpan={maxDepth}>
              Actions
            </th>
          )}
        </tr>
      );
    }

    return headerRows;
  }

  private getMaxColumnDepth(columns: TableColumn[]): number {
    let maxDepth = 1;
    const checkDepth = (cols: TableColumn[], currentDepth: number) => {
      cols.forEach(col => {
        if (col.children && col.children.length > 0) {
          maxDepth = Math.max(maxDepth, currentDepth + 1);
          checkDepth(col.children, currentDepth + 1);
        }
      });
    };
    checkDepth(columns, 1);
    return maxDepth;
  }

  private renderHeaderLevel(columns: TableColumn[], targetDepth: number, currentDepth: number = 0): any[] {
    const result: any[] = [];

    columns.forEach(col => {
      if (!this.state.visibleColumns.has(col.id) && !col.children) return;

      if (currentDepth === targetDepth) {
        result.push(this.renderColumnHeader(col));
      } else if (col.children && col.children.length > 0) {
        result.push(...this.renderHeaderLevel(col.children, targetDepth, currentDepth + 1));
      }
    });

    return result;
  }

  private renderCell(row: TableRow, column: TableColumn): any {
    const isEditing = this.state.editingCell?.rowId === row.id && 
                     this.state.editingCell?.field === column.field;
    const value = column.field ? row[column.field] : '';

    // If table is in editable mode and column is editable, show input field
    if (this.editable && column.editable !== false) {
      return this.renderEditableCell(row, column, value);
    }

    // Individual cell editing mode (double-click)
    if (isEditing && column.editable !== false) {
      return this.renderEditableCell(row, column, value);
    }

    // Display mode - handle different cell types
    return this.renderDisplayCell(row, column, value);
  }

  private renderEditableCell(row: TableRow, column: TableColumn, value: any): any {
    // Only clear editing state on blur if table is not in global editable mode
    const handleBlur = () => {
      if (!this.editable) {
        this.state = { ...this.state, editingCell: null };
      }
    };
    
    const handleKeyDown = (e: KeyboardEvent, inputEl: HTMLInputElement | HTMLSelectElement) => {
      if (e.key === 'Enter') {
        this.handleCellEdit(row.id, column.field, inputEl.value);
      } else if (e.key === 'Escape') {
        if (!this.editable) {
          handleBlur();
        }
      }
    };

    switch (column.type) {
      case 'select':
        return (
          <select
            ref={(el) => {
              if (el) {
                this.editInputRef = el as any;
                el.value = value;
              }
            }}
            onChange={(e) => this.handleCellEdit(row.id, column.field, (e.target as HTMLSelectElement).value)}
            onBlur={handleBlur}
            class="cell-select"
          >
            {column.selectOptions?.map(opt => (
              <option value={opt.value} selected={opt.value === value}>{opt.label}</option>
            ))}
          </select>
        );

      case 'radio':
        return (
          <div class="cell-radio-group">
            {column.radioOptions?.map(opt => (
              <label class="radio-label">
                <input
                  type="radio"
                  name={`${row.id}-${column.field}`}
                  value={opt.value}
                  checked={opt.value === value}
                  onChange={(e) => this.handleCellEdit(row.id, column.field, (e.target as HTMLInputElement).value)}
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        );

      case 'checkbox':
        return (
          <input
            type="checkbox"
            ref={(el) => (this.editInputRef = el)}
            checked={value === true || value === 'true'}
            onChange={(e) => this.handleCellEdit(row.id, column.field, (e.target as HTMLInputElement).checked)}
            onBlur={handleBlur}
            class="cell-checkbox"
          />
        );

      case 'switch':
        return (
          <label class="cell-switch">
            <input
              type="checkbox"
              checked={value === true || value === 'true'}
              onChange={(e) => this.handleCellEdit(row.id, column.field, (e.target as HTMLInputElement).checked)}
            />
            <span class="switch-slider"></span>
          </label>
        );

      case 'rating':
        const maxRating = column.maxRating || 5;
        const currentRating = Number(value) || 0;
        return (
          <div class="cell-rating">
            {Array.from({ length: maxRating }, (_, i) => i + 1).map(star => (
              <span
                class={{ 'star': true, 'filled': star <= currentRating }}
                onClick={() => this.handleCellEdit(row.id, column.field, star)}
              >
                ★
              </span>
            ))}
          </div>
        );

      case 'date':
        return (
          <input
            ref={(el) => (this.editInputRef = el)}
            type="date"
            value={value}
            onChange={(e) => this.handleCellEdit(row.id, column.field, (e.target as HTMLInputElement).value)}
            onBlur={handleBlur}
            onKeyDown={(e) => handleKeyDown(e, e.target as HTMLInputElement)}
            class="cell-input"
          />
        );

      case 'time':
        return (
          <input
            ref={(el) => (this.editInputRef = el)}
            type="time"
            value={value}
            onChange={(e) => this.handleCellEdit(row.id, column.field, (e.target as HTMLInputElement).value)}
            onBlur={handleBlur}
            onKeyDown={(e) => handleKeyDown(e, e.target as HTMLInputElement)}
            class="cell-input"
          />
        );

      case 'datetime':
        return (
          <input
            ref={(el) => (this.editInputRef = el)}
            type="datetime-local"
            value={value}
            onChange={(e) => this.handleCellEdit(row.id, column.field, (e.target as HTMLInputElement).value)}
            onBlur={handleBlur}
            onKeyDown={(e) => handleKeyDown(e, e.target as HTMLInputElement)}
            class="cell-input"
          />
        );

      case 'password':
        return (
          <input
            ref={(el) => (this.editInputRef = el)}
            type="password"
            value={value}
            onChange={(e) => this.handleCellEdit(row.id, column.field, (e.target as HTMLInputElement).value)}
            onBlur={handleBlur}
            onKeyDown={(e) => handleKeyDown(e, e.target as HTMLInputElement)}
            class="cell-input"
          />
        );

      case 'email':
        return (
          <input
            ref={(el) => (this.editInputRef = el)}
            type="email"
            value={value}
            onChange={(e) => this.handleCellEdit(row.id, column.field, (e.target as HTMLInputElement).value)}
            onBlur={handleBlur}
            onKeyDown={(e) => handleKeyDown(e, e.target as HTMLInputElement)}
            class="cell-input"
          />
        );

      case 'url':
        return (
          <input
            ref={(el) => (this.editInputRef = el)}
            type="url"
            value={value}
            onChange={(e) => this.handleCellEdit(row.id, column.field, (e.target as HTMLInputElement).value)}
            onBlur={handleBlur}
            onKeyDown={(e) => handleKeyDown(e, e.target as HTMLInputElement)}
            class="cell-input"
          />
        );

      case 'tel':
        return (
          <input
            ref={(el) => (this.editInputRef = el)}
            type="tel"
            value={value}
            onChange={(e) => this.handleCellEdit(row.id, column.field, (e.target as HTMLInputElement).value)}
            onBlur={handleBlur}
            onKeyDown={(e) => handleKeyDown(e, e.target as HTMLInputElement)}
            class="cell-input"
          />
        );

      case 'number':
        return (
          <input
            ref={(el) => (this.editInputRef = el)}
            type="number"
            value={value}
            onChange={(e) => this.handleCellEdit(row.id, column.field, (e.target as HTMLInputElement).value)}
            onBlur={handleBlur}
            onKeyDown={(e) => handleKeyDown(e, e.target as HTMLInputElement)}
            class="cell-input"
          />
        );

      default:
        return (
          <input
            ref={(el) => (this.editInputRef = el)}
            type="text"
            value={value}
            onChange={(e) => this.handleCellEdit(row.id, column.field, (e.target as HTMLInputElement).value)}
            onBlur={handleBlur}
            onKeyDown={(e) => handleKeyDown(e, e.target as HTMLInputElement)}
            class="cell-input"
          />
        );
    }
  }

  private renderDisplayCell(row: TableRow, column: TableColumn, value: any): any {
    // Handle custom render function
    if (column.render) {
      return (
        <span
          class={{ 'editable-cell': this.editable && column.editable !== false }}
          onDblClick={() => this.editable && column.editable !== false && this.startCellEdit(row.id, column.field)}
        >
          {column.render(value, row, 0)}
        </span>
      );
    }

    // Handle different display types
    let displayContent: any;

    switch (column.type) {
      case 'checkbox':
      case 'boolean':
        displayContent = (
          <span class="cell-boolean">{value ? '✓' : '✗'}</span>
        );
        break;

      case 'switch':
        displayContent = (
          <span class="cell-switch-display">
            <span class={{ 'switch-indicator': true, 'active': value }}>
              {value ? 'ON' : 'OFF'}
            </span>
          </span>
        );
        break;

      case 'rating':
        const maxRating = column.maxRating || 5;
        const currentRating = Number(value) || 0;
        displayContent = (
          <div class="cell-rating-display">
            {Array.from({ length: maxRating }, (_, i) => i + 1).map(star => (
              <span class={{ 'star': true, 'filled': star <= currentRating }}>★</span>
            ))}
          </div>
        );
        break;

      case 'image':
        const imageStyle = column.imageStyle || {};
        displayContent = value ? (
          <img
            src={value}
            alt="Cell image"
            class="cell-image"
            style={{
              width: imageStyle.width || '40px',
              height: imageStyle.height || '40px',
              borderRadius: imageStyle.borderRadius || '4px',
            }}
          />
        ) : null;
        break;

      case 'password':
        displayContent = <span class="cell-password">{'•'.repeat(value?.length || 8)}</span>;
        break;

      case 'date':
        displayContent = value ? new Date(value).toLocaleDateString() : '';
        break;

      case 'datetime':
        displayContent = value ? new Date(value).toLocaleString() : '';
        break;

      case 'time':
        displayContent = value;
        break;

      case 'email':
        displayContent = <a href={`mailto:${value}`} class="cell-link">{value}</a>;
        break;

      case 'url':
        displayContent = <a href={value} target="_blank" rel="noopener noreferrer" class="cell-link">{value}</a>;
        break;

      case 'tel':
        displayContent = <a href={`tel:${value}`} class="cell-link">{value}</a>;
        break;

      default:
        displayContent = column.format ? column.format(value) : value;
    }

    return (
      <span
        class={{ 'editable-cell': this.editable && column.editable !== false }}
        onDblClick={() => this.editable && column.editable !== false && this.startCellEdit(row.id, column.field)}
      >
        {displayContent}
      </span>
    );
  }

  /**
   * Render row actions menu (3-dot menu)
   */
  private renderRowActions(row: TableRow): any {
    const isOpen = this.activeActionMenu === row.id;
    const defaultActions = [
      { label: 'Edit', value: 'edit', icon: '✏️' },
      { label: 'Delete', value: 'delete', icon: '🗑️' },
    ];
    
    const actions = this.customActions || defaultActions;

    return (
      <div class="row-actions-container">
        <button
          class="row-actions-trigger"
          onClick={(e) => {
            e.stopPropagation();
            this.activeActionMenu = isOpen ? null : row.id;
          }}
          aria-label="Row actions"
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          <span class="action-dots">⋮</span>
        </button>
        
        {isOpen && (
          <div class="row-actions-menu">
            {actions.map(action => (
              <button
                key={action.value}
                class="row-action-item"
                onClick={(e) => {
                  e.stopPropagation();
                  this.handleRowAction(row, action.value);
                }}
              >
                {action.icon && <span class="action-icon">{action.icon}</span>}
                <span class="action-label">{action.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  /**
   * Handle row action
   */
  private handleRowAction(row: TableRow, action: string) {
    this.activeActionMenu = null; // Close menu
    
    if (action === 'edit') {
      this.rowEdit.emit({ row });
    } else if (action === 'delete') {
      this.rowDelete.emit({ row });
    } else {
      this.rowAction.emit({ row, action });
    }
  }

  private renderGroupedRows(data: TableRow[], columns: TableColumn[]): any {
    const groups = this.groupData(data, this.state.groupBy!);
    const rows: any[] = [];
    
    groups.forEach((groupRows, groupKey) => {
      const isExpanded = this.state.expandedGroups.has(groupKey);
      const groupCount = groupRows.length;
      
      // Render group header row
      rows.push(
        <tr 
          class="group-header-row" 
          key={`group-${groupKey}`}
          role="row"
          aria-expanded={isExpanded}
        >
          <td 
            colSpan={columns.length + (this.selectable ? 1 : 0) + (this.showActions ? 1 : 0)}
            class="group-header-cell"
            onClick={() => this.handleGroupToggle(groupKey)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.handleGroupToggle(groupKey);
              }
            }}
            aria-label={`${isExpanded ? 'Collapse' : 'Expand'} group ${groupKey}`}
          >
            <div class="group-header-content">
              <span class="group-expand-icon">
                {isExpanded ? '▼' : '▶'}
              </span>
              <span class="group-label">
                {groupKey}
              </span>
              {this.showGroupCount && (
                <span class="group-count">
                  ({groupCount} {groupCount === 1 ? 'item' : 'items'})
                </span>
              )}
            </div>
          </td>
        </tr>
      );
      
      // Only render group rows when expanded - rows are completely hidden when collapsed
      if (isExpanded) {
        groupRows.forEach((row, rowIndex) => {
          rows.push(
            <tr
              class={{
                'group-data-row': true,
                'selected': this.state.selectedRows.has(row.id),
              }}
              key={row.id}
              role="row"
              data-group={groupKey}
              aria-label={`Row ${rowIndex + 1} in group ${groupKey}`}
            >
              {this.selectable && (
                <td class="select-column" role="cell">
                  <input
                    type="checkbox"
                    checked={this.state.selectedRows.has(row.id)}
                    onInput={(e) => this.handleRowSelect(row.id, e)}
                    aria-label={`Select row ${rowIndex + 1}`}
                  />
                </td>
              )}
              {columns.map(col => (
                <td
                  key={col.id}
                  class={{ 'sticky-column': col.sticky }}
                  style={{ textAlign: col.align || 'left' }}
                  role="cell"
                >
                  {this.renderCell(row, col)}
                </td>
              ))}
              {this.showActions && (
                <td class="actions-column" role="cell">
                  {this.renderRowActions(row)}
                </td>
              )}
            </tr>
          );
        });
      }
    });
    
    return rows;
  }

  private renderPagination(): any {
    if (!this.pagination) return null;

    const { currentPage, totalPages, pageSize, totalRows } = this.state.pagination;
    const startRow = (currentPage - 1) * pageSize + 1;
    const endRow = Math.min(currentPage * pageSize, totalRows);

    const pageNumbers: any[] = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          class={{ 'page-btn': true, 'active': i === currentPage }}
          onClick={() => this.handlePageChange(i)}
          aria-label={`Go to page ${i}`}
          aria-current={i === currentPage ? 'page' : undefined}
        >
          {i}
        </button>
      );
    }

    return (
      <div class="pagination-container">
        <div class="pagination-info">
          Showing {startRow} to {endRow} of {totalRows} entries
        </div>
        
        <div class="pagination-controls">
          <button
            class="page-btn"
            disabled={currentPage === 1}
            onClick={() => this.handlePageChange(1)}
            aria-label="First page"
          >
            «
          </button>
          <button
            class="page-btn"
            disabled={currentPage === 1}
            onClick={() => this.handlePageChange(currentPage - 1)}
            aria-label="Previous page"
          >
            ‹
          </button>
          
          {pageNumbers}
          
          <button
            class="page-btn"
            disabled={currentPage === totalPages}
            onClick={() => this.handlePageChange(currentPage + 1)}
            aria-label="Next page"
          >
            ›
          </button>
          <button
            class="page-btn"
            disabled={currentPage === totalPages}
            onClick={() => this.handlePageChange(totalPages)}
            aria-label="Last page"
          >
            »
          </button>
        </div>

        <div class="page-size-selector">
          <label>
            Rows per page:
            <select onChange={(e) => this.handlePageSizeChange(e)}>
              {this.parsePageSizeOptions().map(size => (
                <option value={size} selected={size === pageSize}>{size}</option>
              ))}
            </select>
          </label>
        </div>
      </div>
    );
  }

  private renderToolbar(): any {
    return (
      <div class="table-toolbar">
        <div class="toolbar-left">
          {this.searchable && (
            <div class="search-box">
              <input
                type="text"
                placeholder="Search..."
                value={this.state.searchQuery}
                onInput={(e) => this.handleSearch(e)}
                aria-label="Search table"
              />
              <span class="search-icon">🔍</span>
            </div>
          )}
          
          {this.grouping && this.renderGroupingSelector()}
        </div>

        <div class="toolbar-right">
          {this.columnVisibility && (
            <button
              class="toolbar-btn"
              onClick={() => this.showColumnSettings = !this.showColumnSettings}
              aria-label="Column settings"
              aria-expanded={this.showColumnSettings}
            >
              ⚙️ Columns
            </button>
          )}
          
          {this.exportable && (
            <button
              class="toolbar-btn"
              onClick={() => this.showExportDialog = !this.showExportDialog}
              aria-label="Export data"
            >
              📥 Export
            </button>
          )}

          <button
            class="toolbar-btn"
            onClick={() => this.refresh()}
            aria-label="Refresh table"
          >
            🔄 Refresh
          </button>
        </div>
      </div>
    );
  }

  private renderGroupingSelector(): any {
    const groupableColumns = this.getVisibleColumns().filter(col => col.groupBy !== false);
    
    if (groupableColumns.length === 0) return null;
    
    return (
      <div class="grouping-selector">
        <label htmlFor="group-by-select">Group by:</label>
        <select
          id="group-by-select"
          onInput={(e) => this.handleGroupByChange((e.target as HTMLSelectElement).value)}
          aria-label="Group table by column"
        >
          <option value="" selected={!this.state.groupBy}>None</option>
          {groupableColumns.map(col => (
            <option value={col.field || col.id} key={col.id} selected={this.state.groupBy === (col.field || col.id)}>
              {col.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  private renderColumnSettings(): any {
    if (!this.showColumnSettings) return null;

    const flatColumns = this.flattenColumns(this.parseColumns());

    return (
      <div class="column-settings-dialog">
        <div class="dialog-overlay" onClick={() => this.showColumnSettings = false}></div>
        <div class="dialog-content">
          <div class="dialog-header">
            <h3>Column Settings</h3>
            <button class="close-btn" onClick={() => this.showColumnSettings = false}>×</button>
          </div>
          <div class="dialog-body">
            <div class="column-list">
              {flatColumns.map(col => (
                <label class="column-item">
                  <input
                    type="checkbox"
                    checked={this.state.visibleColumns.has(col.id)}
                    onChange={() => this.toggleColumnVisibility(col.id)}
                  />
                  <span>{col.label}</span>
                </label>
              ))}
            </div>
          </div>
          <div class="dialog-footer">
            <button onClick={() => this.showColumnSettings = false}>Done</button>
          </div>
        </div>
      </div>
    );
  }

  private renderExportDialog(): any {
    if (!this.showExportDialog) return null;

    return (
      <div class="export-dialog">
        <div class="dialog-overlay" onClick={() => this.showExportDialog = false}></div>
        <div class="dialog-content">
          <div class="dialog-header">
            <h3>Export Data</h3>
            <button class="close-btn" onClick={() => this.showExportDialog = false}>×</button>
          </div>
          <div class="dialog-body">
            <div class="export-options">
              <button
                class="export-btn"
                onClick={() => this.exportData({ format: 'csv', visibleColumnsOnly: true })}
              >
                📄 Export as CSV
              </button>
              <button
                class="export-btn"
                onClick={() => this.exportData({ format: 'json', visibleColumnsOnly: true })}
              >
                📋 Export as JSON
              </button>
              {this.state.selectedRows.size > 0 && (
                <button
                  class="export-btn"
                  onClick={() => this.exportData({ format: 'csv', selectedOnly: true })}
                >
                  ✓ Export Selected Only ({this.state.selectedRows.size} rows)
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const data = this.getProcessedData();
    const columns = this.getVisibleColumns();

    return (
      <div class={`data-table-container ${this.rowHeight}`}>
        {this.renderToolbar()}
        
        <div class="table-wrapper">
          <table
            class={{
              'data-table': true,
              'sticky-header': this.stickyHeader,
              'striped': this.striped,
              'hoverable': this.hoverable,
              'bordered': this.bordered,
            }}
            role="table"
            aria-label="Data table"
          >
            <thead>
              {this.renderTableHeaders()}
            </thead>
            <tbody>
              {this.loading && this.showSkeleton && this.renderSkeletonRows(columns)}
              
              {this.loading && !this.showSkeleton && (
                <tr>
                  <td colSpan={columns.length + (this.selectable ? 1 : 0) + (this.showActions ? 1 : 0)} class="loading-cell">
                    <div class="loading-spinner"></div>
                    <span>Loading...</span>
                  </td>
                </tr>
              )}
              
              {!this.loading && data.length === 0 && (
                <tr>
                  <td colSpan={columns.length + (this.selectable ? 1 : 0) + (this.showActions ? 1 : 0)} class="empty-cell">
                    {this.emptyMessage}
                  </td>
                </tr>
              )}

              {!this.loading && data.length > 0 && this.state.groupBy && this.renderGroupedRows(data, columns)}
              
              {!this.loading && data.length > 0 && !this.state.groupBy && data.map((row, rowIndex) => (
                <tr
                  class={{
                    'selected': this.state.selectedRows.has(row.id),
                  }}
                  key={row.id}
                  role="row"
                >
                  {this.selectable && (
                    <td class="select-column" role="cell">
                      <input
                        type="checkbox"
                        checked={this.state.selectedRows.has(row.id)}
                        onInput={(e) => this.handleRowSelect(row.id, e)}
                        aria-label={`Select row ${rowIndex + 1}`}
                      />
                    </td>
                  )}
                  {columns.map(col => (
                    <td
                      key={col.id}
                      class={{ 'sticky-column': col.sticky }}
                      style={{ textAlign: col.align || 'left' }}
                      role="cell"
                    >
                      {this.renderCell(row, col)}
                    </td>
                  ))}
                  {this.showActions && (
                    <td class="actions-column" role="cell">
                      {this.renderRowActions(row)}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {this.renderPagination()}
        {this.renderColumnSettings()}
        {this.renderExportDialog()}
      </div>
    );
  }
}
