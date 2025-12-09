import { Component, Prop, h, Event, EventEmitter, State } from '@stencil/core';

export type PaginationType = 'basic' | 'compact' | 'detailed' | 'minimal' | 'advanced' | 'dropdown' | 'input' | 'indicator';
export type PaginationSize = 'sm' | 'md' | 'lg';
export type PaginationVariant = 'default' | 'outlined' | 'filled';

@Component({
  tag: 'ui-pagination',
  styleUrl: 'pagination.css',
  shadow: true,
})
export class Pagination {
  /**
   * Hide navigation buttons (next, previous, first, last) in dropdown/input modes
   */
  @Prop() hideNavButtons: boolean = false;
  /**
   * Current active page (1-based)
   */
  @Prop({ mutable: true }) currentPage: number = 1;

  /**
   * Total number of items
   */
  @Prop() totalItems: number = 0;

  /**
   * Number of items per page
   */
  @Prop({ mutable: true }) itemsPerPage: number = 10;

  /**
   * Maximum number of page buttons to show
   */
  @Prop() maxVisiblePages: number = 5;

  /**
   * Type of pagination to display
   */
  @Prop() type: PaginationType = 'basic';

  /**
   * Size of the pagination component
   */
  @Prop() size: PaginationSize = 'md';

  /**
   * Visual variant of the pagination
   */
  @Prop() variant: PaginationVariant = 'default';

  /**
   * Whether to show first/last buttons
   */
  @Prop() showFirstLast: boolean = true;

  /**
   * Whether to show previous/next buttons
   */
  @Prop() showPrevNext: boolean = true;

  /**
   * Whether to show page size selector
   */
  @Prop() showPageSize: boolean = false;

  /**
   * Whether to show total count
   */
  @Prop() showTotal: boolean = false;

  /**
   * Whether to show jump to page input
   */
  @Prop() showJumpTo: boolean = false;

  /**
   * Custom text for previous button
   */
  @Prop() prevText: string = 'Previous';

  /**
   * Custom text for next button
   */
  @Prop() nextText: string = 'Next';

  /**
   * Custom text for first button
   */
  @Prop() firstText: string = 'First';

  /**
   * Custom text for last button
   */
  @Prop() lastText: string = 'Last';

  /**
   * Available page sizes for selector
   */
  @Prop() pageSizes: number[] = [10, 25, 50, 100];

  /**
   * Whether pagination is disabled
   */
  @Prop() disabled: boolean = false;

  /**
   * Whether to show only icons (no text labels)
   */
  @Prop() iconOnly: boolean = false;

  /**
   * Whether to use infinite scroll style (shows loading state)
   */
  @Prop() infinite: boolean = false;

  /**
   * Loading state for infinite scroll
   */
  @Prop() loading: boolean = false;

  /**
   * Whether to use compact mode (for dropdown and input types)
   */
  @Prop() compact: boolean = false;

  /**
   * Emitted when page changes
   */
  @Event() pageChange: EventEmitter<{ page: number; itemsPerPage: number }>;

  /**
   * Emitted when items per page changes
   */
  @Event() itemsPerPageChange: EventEmitter<number>;

  /**
   * Emitted when validation error occurs
   */
  @Event() validationError: EventEmitter<string>;

  @State() jumpToPage: number = 1;
  @State() inputError: string = '';

  private get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  private get visiblePages(): number[] {
    const totalPages = this.totalPages;
    const current = this.currentPage;
    const maxVisible = this.maxVisiblePages;

    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const half = Math.floor(maxVisible / 2);
    let start = Math.max(1, current - half);
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  private handlePageChange(page: number) {
    if (page < 1 || page > this.totalPages || page === this.currentPage || this.disabled) {
      return;
    }

    this.currentPage = page;
    this.pageChange.emit({ page, itemsPerPage: this.itemsPerPage });
  }

  private handleItemsPerPageChange(itemsPerPage: number) {
    this.itemsPerPage = itemsPerPage;
    this.currentPage = 1; // Reset to first page when changing page size
    this.itemsPerPageChange.emit(itemsPerPage);
    this.pageChange.emit({ page: 1, itemsPerPage });
  }

  private handleJumpToPage() {
    // Validate input
    if (!this.jumpToPage || isNaN(this.jumpToPage)) {
      this.inputError = 'Please enter a valid number';
      this.validationError.emit('Please enter a valid number');
      return;
    }

    if (this.jumpToPage < 1) {
      this.inputError = `Page number must be at least 1`;
      this.validationError.emit(this.inputError);
      return;
    }

    if (this.jumpToPage > this.totalPages) {
      this.inputError = `Page number cannot exceed ${this.totalPages}`;
      this.validationError.emit(this.inputError);
      return;
    }

    // Clear error and navigate
    this.inputError = '';
    const page = Math.max(1, Math.min(this.totalPages, this.jumpToPage));
    this.handlePageChange(page);
  }

  private handleInputChange(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    
    if (value === '') {
      this.jumpToPage = null as any;
      this.inputError = '';
      return;
    }

    const numValue = Number(value);
    
    if (isNaN(numValue)) {
      this.inputError = 'Please enter a valid number';
      this.validationError.emit(this.inputError);
      return;
    }

    this.jumpToPage = numValue;
    
    // Clear error if value is now valid
    if (numValue >= 1 && numValue <= this.totalPages) {
      this.inputError = '';
    }
  }

  private renderBasicPagination() {
    const { currentPage, totalPages, visiblePages, showFirstLast, showPrevNext } = this;
    const canGoPrev = currentPage > 1;
    const canGoNext = currentPage < totalPages;

    return (
      <div class="pagination-basic">
        {showFirstLast && (
          <button
            class={`pagination-btn pagination-first ${!canGoPrev ? 'disabled' : ''}`}
            onClick={() => this.handlePageChange(1)}
            disabled={!canGoPrev || this.disabled}
            title="First page"
          >
            {this.iconOnly ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M11 19l-7-7 7-7M18 19l-7-7 7-7"/>
              </svg>
            ) : this.firstText}
          </button>
        )}

        {showPrevNext && (
          <button
            class={`pagination-btn pagination-prev ${!canGoPrev ? 'disabled' : ''}`}
            onClick={() => this.handlePageChange(currentPage - 1)}
            disabled={!canGoPrev || this.disabled}
            title="Previous page"
          >
            {this.iconOnly ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M15 19l-7-7 7-7"/>
              </svg>
            ) : this.prevText}
          </button>
        )}

        <div class="pagination-pages">
          {visiblePages.map(page => (
            <button
              key={page}
              class={`pagination-btn pagination-page ${page === currentPage ? 'active' : ''}`}
              onClick={() => this.handlePageChange(page)}
              disabled={this.disabled}
            >
              {page}
            </button>
          ))}
        </div>

        {showPrevNext && (
          <button
            class={`pagination-btn pagination-next ${!canGoNext ? 'disabled' : ''}`}
            onClick={() => this.handlePageChange(currentPage + 1)}
            disabled={!canGoNext || this.disabled}
            title="Next page"
          >
            {this.iconOnly ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 5l7 7-7 7"/>
              </svg>
            ) : this.nextText}
          </button>
        )}

        {showFirstLast && (
          <button
            class={`pagination-btn pagination-last ${!canGoNext ? 'disabled' : ''}`}
            onClick={() => this.handlePageChange(totalPages)}
            disabled={!canGoNext || this.disabled}
            title="Last page"
          >
            {this.iconOnly ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M13 5l7 7-7 7M6 5l7 7-7 7"/>
              </svg>
            ) : this.lastText}
          </button>
        )}
      </div>
    );
  }

  private renderCompactPagination() {
    const { currentPage, totalPages } = this;
    const canGoPrev = currentPage > 1;
    const canGoNext = currentPage < totalPages;

    return (
      <div class="pagination-compact">
        <button
          class={`pagination-btn pagination-prev ${!canGoPrev ? 'disabled' : ''}`}
          onClick={() => this.handlePageChange(currentPage - 1)}
          disabled={!canGoPrev || this.disabled}
        >
          ‹
        </button>

        <span class="pagination-info">
          {currentPage} of {totalPages}
        </span>

        <button
          class={`pagination-btn pagination-next ${!canGoNext ? 'disabled' : ''}`}
          onClick={() => this.handlePageChange(currentPage + 1)}
          disabled={!canGoNext || this.disabled}
        >
          ›
        </button>
      </div>
    );
  }

  private renderDetailedPagination() {
    const startItem = (this.currentPage - 1) * this.itemsPerPage + 1;
    const endItem = Math.min(this.currentPage * this.itemsPerPage, this.totalItems);

    return (
      <div class="pagination-detailed">
        {this.renderBasicPagination()}

        <div class="pagination-details">
          {this.showTotal && (
            <span class="pagination-total">
              Showing {startItem}-{endItem} of {this.totalItems} items
            </span>
          )}

          {this.showPageSize && (
            <div class="pagination-size-selector">
              <label>Items per page:</label>
              <select
                onChange={(e) => this.handleItemsPerPageChange(Number((e.target as HTMLSelectElement).value))}
                disabled={this.disabled}
              >
                {this.pageSizes.map(size => (
                  <option key={size} value={size} selected={size === this.itemsPerPage}>{size}</option>
                ))}
              </select>
            </div>
          )}

          {this.showJumpTo && (
            <div class="pagination-jump">
              <label>Go to page:</label>
              <input
                type="number"
                min="1"
                max={this.totalPages}
                value={this.jumpToPage}
                onChange={(e) => this.jumpToPage = Number((e.target as HTMLInputElement).value)}
                onKeyPress={(e) => e.key === 'Enter' && this.handleJumpToPage()}
                disabled={this.disabled}
              />
              <button
                class="pagination-btn pagination-jump-btn"
                onClick={() => this.handleJumpToPage()}
                disabled={this.disabled}
              >
                Go
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  private renderMinimalPagination() {
    const { currentPage, totalPages } = this;
    const canGoPrev = currentPage > 1;
    const canGoNext = currentPage < totalPages;

    return (
      <div class="pagination-minimal">
        <button
          class={`pagination-btn pagination-prev ${!canGoPrev ? 'disabled' : ''}`}
          onClick={() => this.handlePageChange(currentPage - 1)}
          disabled={!canGoPrev || this.disabled}
        >
          ‹‹
        </button>

        <div class="pagination-input-group">
          <input
            type="number"
            min="1"
            max={totalPages}
            value={currentPage}
            onChange={(e) => this.currentPage = Number((e.target as HTMLInputElement).value)}
            onBlur={() => this.handlePageChange(this.currentPage)}
            onKeyPress={(e) => e.key === 'Enter' && this.handlePageChange(this.currentPage)}
            disabled={this.disabled}
            class="pagination-page-input"
          />
          <span class="pagination-separator">of</span>
          <span class="pagination-total-pages">{totalPages}</span>
        </div>

        <button
          class={`pagination-btn pagination-next ${!canGoNext ? 'disabled' : ''}`}
          onClick={() => this.handlePageChange(currentPage + 1)}
          disabled={!canGoNext || this.disabled}
        >
          ››
        </button>
      </div>
    );
  }

  private renderAdvancedPagination() {
    return (
      <div class="pagination-advanced">
        <div class="pagination-controls">
          {this.showPageSize && (
            <div class="pagination-size-selector">
              <label>Show:</label>
              <select
                onChange={(e) => this.handleItemsPerPageChange(Number((e.target as HTMLSelectElement).value))}
                disabled={this.disabled}
              >
                {this.pageSizes.map(size => (
                  <option key={size} value={size} selected={size === this.itemsPerPage}>{size}</option>
                ))}
              </select>
              <span>entries</span>
            </div>
          )}

          {this.showTotal && (
            <div class="pagination-summary">
              Showing {((this.currentPage - 1) * this.itemsPerPage) + 1} to {Math.min(this.currentPage * this.itemsPerPage, this.totalItems)} of {this.totalItems} entries
            </div>
          )}
        </div>

        {this.renderBasicPagination()}

        {this.showJumpTo && (
          <div class="pagination-jump-section">
            <label>Jump to page:</label>
            <input
              type="number"
              min="1"
              max={this.totalPages}
              value={this.jumpToPage}
              onChange={(e) => this.jumpToPage = Number((e.target as HTMLInputElement).value)}
              onKeyPress={(e) => e.key === 'Enter' && this.handleJumpToPage()}
              disabled={this.disabled}
            />
            <button
              class="pagination-btn"
              onClick={() => this.handleJumpToPage()}
              disabled={this.disabled}
            >
              Go
            </button>
          </div>
        )}
      </div>
    );
  }

  private renderInfinitePagination() {
    return (
      <div class="pagination-infinite">
        <div class="pagination-loading">
          {this.loading ? (
            <div class="pagination-spinner"></div>
          ) : (
            <button
              class="pagination-btn pagination-load-more"
              onClick={() => this.handlePageChange(this.currentPage + 1)}
              disabled={this.currentPage >= this.totalPages || this.disabled}
            >
              Load More
            </button>
          )}
        </div>

        {this.showTotal && (
          <div class="pagination-infinite-info">
            Showing {this.currentPage * this.itemsPerPage} of {this.totalItems} items
          </div>
        )}
      </div>
    );
  }

  private renderDropdownPagination() {
    const pageOptions = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pageOptions.push(i);
    }

    if (this.compact || this.hideNavButtons) {
      // Compact version or hideNavButtons: only dropdown, no buttons or total
      return (
        <div class="pagination-dropdown-container pagination-dropdown-compact">
          <div class="pagination-dropdown-wrapper">
            <select
              class="pagination-dropdown"
              onChange={(e) => this.handlePageChange(parseInt((e.target as HTMLSelectElement).value))}
              disabled={this.disabled}
            >
              {pageOptions.map(page => (
                <option value={page} selected={page === this.currentPage}>
                  {page} / {this.totalPages}
                </option>
              ))}
            </select>
          </div>
        </div>
      );
    }

    return (
      <div class="pagination-dropdown-container">
        {!this.hideNavButtons && (
          <button
            class="pagination-btn pagination-prev"
            onClick={() => this.handlePageChange(this.currentPage - 1)}
            disabled={this.currentPage === 1 || this.disabled}
            title="Previous page"
          >
            {this.iconOnly ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M15 19l-7-7 7-7"/>
              </svg>
            ) : (
              this.prevText
            )}
          </button>
        )}

        <div class="pagination-dropdown-wrapper">
          <select
            class="pagination-dropdown"
            onChange={(e) => this.handlePageChange(parseInt((e.target as HTMLSelectElement).value))}
            disabled={this.disabled}
          >
            {pageOptions.map(page => (
              <option value={page} selected={page === this.currentPage}>
                Page {page} of {this.totalPages}
              </option>
            ))}
          </select>
        </div>

        {!this.hideNavButtons && (
          <button
            class="pagination-btn pagination-next"
            onClick={() => this.handlePageChange(this.currentPage + 1)}
            disabled={this.currentPage === this.totalPages || this.disabled}
            title="Next page"
          >
            {this.iconOnly ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 5l7 7-7 7"/>
              </svg>
            ) : (
              this.nextText
            )}
          </button>
        )}

        {this.showTotal && (
          <div class="pagination-total">
            Total {this.totalItems} items
          </div>
        )}
      </div>
    );
  }

  private renderInputPagination() {
    if (this.compact || this.hideNavButtons) {
      // Compact version or hideNavButtons: only input and go button
      return (
        <div class="pagination-input-container pagination-input-compact">
          <div class="pagination-input-wrapper">
            <input
              type="number"
              class={`pagination-page-input ${this.inputError ? 'has-error' : ''}`}
              min="1"
              max={this.totalPages}
              value={this.jumpToPage || this.currentPage}
              onChange={(e) => this.handleInputChange(e)}
              onKeyPress={(e) => e.key === 'Enter' && this.handleJumpToPage()}
              onFocus={() => this.inputError = ''}
              disabled={this.disabled}
              placeholder={`1-${this.totalPages}`}
            />
            <button
              class="pagination-btn pagination-go-btn"
              onClick={() => this.handleJumpToPage()}
              disabled={this.disabled}
              title="Go to page"
            >
              Go
            </button>
          </div>
          {this.inputError && (
            <div class="pagination-error-message">
              {this.inputError}
            </div>
          )}
        </div>
      );
    }

    return (
      <div class="pagination-input-container">
        {!this.hideNavButtons && (
          <button
            class="pagination-btn pagination-first"
            onClick={() => this.handlePageChange(1)}
            disabled={this.currentPage === 1 || this.disabled}
            title="First page"
          >
            {this.iconOnly ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M11 19l-7-7 7-7M18 19l-7-7 7-7"/>
              </svg>
            ) : (
              this.firstText
            )}
          </button>
        )}

        {!this.hideNavButtons && (
          <button
            class="pagination-btn pagination-prev"
            onClick={() => this.handlePageChange(this.currentPage - 1)}
            disabled={this.currentPage === 1 || this.disabled}
            title="Previous page"
          >
            {this.iconOnly ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M15 19l-7-7 7-7"/>
              </svg>
            ) : (
              this.prevText
            )}
          </button>
        )}

        <div class="pagination-input-wrapper">
          <span class="pagination-input-label">Page</span>
          <input
            type="number"
            class={`pagination-page-input ${this.inputError ? 'has-error' : ''}`}
            min="1"
            max={this.totalPages}
            value={this.jumpToPage || this.currentPage}
            onChange={(e) => this.handleInputChange(e)}
            onKeyPress={(e) => e.key === 'Enter' && this.handleJumpToPage()}
            onFocus={() => this.inputError = ''}
            disabled={this.disabled}
          />
          <span class="pagination-input-label">of {this.totalPages}</span>
          <button
            class="pagination-btn pagination-go-btn"
            onClick={() => this.handleJumpToPage()}
            disabled={this.disabled}
            title="Go to page"
          >
            Go
          </button>
        </div>

        {this.inputError && (
          <div class="pagination-error-message">
            {this.inputError}
          </div>
        )}

        {!this.hideNavButtons && (
          <button
            class="pagination-btn pagination-next"
            onClick={() => this.handlePageChange(this.currentPage + 1)}
            disabled={this.currentPage === this.totalPages || this.disabled}
            title="Next page"
          >
            {this.iconOnly ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 5l7 7-7 7"/>
              </svg>
            ) : (
              this.nextText
            )}
          </button>
        )}

        {!this.hideNavButtons && (
          <button
            class="pagination-btn pagination-last"
            onClick={() => this.handlePageChange(this.totalPages)}
            disabled={this.currentPage === this.totalPages || this.disabled}
            title="Last page"
          >
            {this.iconOnly ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M13 5l7 7-7 7M6 5l7 7-7 7"/>
              </svg>
            ) : (
              this.lastText
            )}
          </button>
        )}

        {this.showTotal && (
          <div class="pagination-total">
            Total {this.totalItems} items
          </div>
        )}
      </div>
    );
  }

  private renderIndicatorPagination() {
    const pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);

    return (
      <div class="pagination-indicator-container">
        {this.showPrevNext && (
          <button
            class="pagination-nav-btn"
            onClick={() => this.handlePageChange(this.currentPage - 1)}
            disabled={this.currentPage === 1 || this.disabled}
            title="Previous page"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
        )}

        <div class="pagination-indicators">
          {pages.map(page => (
            <div
              class={{
                'pagination-indicator': true,
                'pagination-indicator-active': page === this.currentPage
              }}
              onClick={() => !this.disabled && this.handlePageChange(page)}
              role="button"
              tabindex={this.disabled ? -1 : 0}
              aria-label={`Go to page ${page}`}
              aria-current={page === this.currentPage ? 'page' : undefined}
            >
              <div class="pagination-indicator-dot"></div>
              {page === this.currentPage && (
                <div class="pagination-indicator-label">{page}</div>
              )}
            </div>
          ))}
        </div>

        {this.showPrevNext && (
          <button
            class="pagination-nav-btn"
            onClick={() => this.handlePageChange(this.currentPage + 1)}
            disabled={this.currentPage === this.totalPages || this.disabled}
            title="Next page"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        )}

        {this.showTotal && (
          <div class="pagination-total">
            {this.currentPage} / {this.totalPages}
          </div>
        )}
      </div>
    );
  }

  render() {
    if (this.totalPages <= 1 && !this.infinite) {
      return null;
    }

    const classes = {
      'ui-pagination': true,
      [`pagination-${this.type}`]: true,
      [`pagination-${this.size}`]: true,
      [`pagination-${this.variant}`]: true,
      'pagination-disabled': this.disabled,
    };

    return (
      <div class={classes}>
        {this.infinite ? this.renderInfinitePagination() :
         this.type === 'basic' ? this.renderBasicPagination() :
         this.type === 'compact' ? this.renderCompactPagination() :
         this.type === 'detailed' ? this.renderDetailedPagination() :
         this.type === 'minimal' ? this.renderMinimalPagination() :
         this.type === 'advanced' ? this.renderAdvancedPagination() :
         this.type === 'dropdown' ? this.renderDropdownPagination() :
         this.type === 'input' ? this.renderInputPagination() :
         this.type === 'indicator' ? this.renderIndicatorPagination() :
         this.renderBasicPagination()}
      </div>
    );
  }
}
