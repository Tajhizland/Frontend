"use client";

import React, { useMemo } from "react";
import { usePathname } from "next/navigation";
import Spinner from "@/shared/Loading/Spinner";
import AdminPagination from "@/shared/Pagination/AdminPagination";
import SelectPagination from "@/shared/Pagination/SelectPagination";
import { RowHelpers, TableFetcher, TableProps } from "@/shared/Table/types";
import { tableFetcher } from "@/shared/Table/fetcher";
import { useTableData } from "@/shared/Table/hooks/useTableData";
import { useVisibleColumns } from "@/shared/Table/hooks/useVisibleColumns";
import { useRowEditor } from "@/shared/Table/hooks/useRowEditor";
import { useRowDelete } from "@/shared/Table/hooks/useRowDelete";
import { useRowHighlight } from "@/shared/Table/hooks/useRowHighlight";
import TableToolbar from "@/shared/Table/parts/TableToolbar";
import TableHead from "@/shared/Table/parts/TableHead";
import EditorCell from "@/shared/Table/parts/EditorCell";
import RowActions from "@/shared/Table/parts/RowActions";
import DeleteConfirm from "@/shared/Table/parts/DeleteConfirm";

function Table<T extends { id: number | string }>({
    columns,
    url,
    fetcher,
    queryKey,
    actions = [],
    renderActions,
    renderRow,
    onEdit,
    onDelete,
    defaultSort,
    initialFilters,
    debounce = 350,
    reloadOnEdit = true,
    deleteMessage = "آیا از حذف این آیتم اطمینان دارید ؟",
    emptyText = "موردی یافت نشد",
    highlightRow = true,
}: TableProps<T>) {
    const pathname = usePathname();

    const fetchFn: TableFetcher<T> = useMemo(() => fetcher ?? tableFetcher<T>(url ?? ""), [fetcher, url]);
    const baseKey = useMemo(() => queryKey ?? ["table", url ?? pathname], [queryKey, url, pathname]);
    const allKeys = useMemo(() => columns.map((col) => col.key as string), [columns]);

    const table = useTableData<T>({
        fetchFn,
        baseKey,
        initialFilters: initialFilters as Record<string, any> | undefined,
        defaultSort: defaultSort && { key: defaultSort.key as string, direction: defaultSort.direction },
        debounce,
    });

    const { isVisible, toggle } = useVisibleColumns(`table-hidden-${pathname}`, allKeys);
    const editor = useRowEditor<T>({ onEdit, reloadOnEdit, invalidate: table.invalidate });
    const remover = useRowDelete<T>({ onDelete, invalidate: table.invalidate });
    const highlight = useRowHighlight<T["id"]>(highlightRow);

    const shownColumns = columns.filter((col) => isVisible(col.key as string));
    const hasOpsColumn = !!onEdit || !!onDelete || actions.length > 0 || !!renderActions;
    const colSpan = shownColumns.length + (hasOpsColumn ? 1 : 0);

    const helpersFor = (row: T): RowHelpers => ({
        edit: () => editor.begin(row),
        refresh: () => table.invalidate(),
        mark: () => highlight.mark(row.id),
    });

    return (
        <>
            <DeleteConfirm
                open={!!remover.pending}
                message={deleteMessage}
                loading={remover.deleting}
                onDismiss={remover.dismiss}
                onConfirm={remover.confirm}
            />

            <TableToolbar
                columns={columns}
                total={table.meta.total}
                hasActiveFilters={table.hasActiveFilters}
                onResetFilters={table.resetFilters}
                isVisible={isVisible}
                onToggleColumn={toggle}
            />

            <div className="relative overflow-x-scroll shadow-md sm:rounded-lg w-full min-h-96">
                {table.isLoading && !!table.rows.length && (
                    <div className="absolute inset-0 z-10 bg-white/50 flex items-start justify-center pt-24">
                        <Spinner />
                    </div>
                )}
                <table className="w-full text-sm rtl:text-right text-slate-900 text-center border">
                    <TableHead
                        columns={shownColumns}
                        hasOpsColumn={hasOpsColumn}
                        sort={table.sort}
                        onSort={table.toggleSort}
                        filters={table.filters}
                        onFilter={table.setFilter}
                        filterEpoch={table.filterEpoch}
                    />
                    <tbody>
                        {table.isLoading && !table.rows.length ? (
                            <tr>
                                <td colSpan={colSpan} className="text-center p-3">
                                    <Spinner />
                                </td>
                            </tr>
                        ) : !table.rows.length ? (
                            <tr>
                                <td colSpan={colSpan} className="text-center p-10 text-slate-400">
                                    {emptyText}
                                </td>
                            </tr>
                        ) : (
                            table.rows.map((row) => {
                                const helpers = helpersFor(row);
                                const editing = editor.isEditing(row);
                                let firstEditable = true;

                                return (
                                    <tr key={String(row.id)} className={highlight.rowClass(row.id)}>
                                        {renderRow
                                            ? renderRow(row, helpers)
                                            : shownColumns.map((col) => {
                                                  const editable = editing && col.editable && editor.draft;
                                                  const autoFocus = editable ? firstEditable : false;
                                                  if (editable) firstEditable = false;

                                                  return (
                                                      <td
                                                          key={col.key as string}
                                                          className="text-center p-3 text-nowrap whitespace-nowrap border-b"
                                                      >
                                                          {editable ? (
                                                              <EditorCell
                                                                  column={col}
                                                                  autoFocus={autoFocus}
                                                                  value={editor.draft?.[col.key]}
                                                                  onChange={(value, editorType) =>
                                                                      editor.setField(col.key, value, editorType)
                                                                  }
                                                                  onSave={editor.save}
                                                                  onCancel={editor.cancel}
                                                              />
                                                          ) : col.render ? (
                                                              col.render(row, helpers)
                                                          ) : (
                                                              (row[col.key] as React.ReactNode)
                                                          )}
                                                      </td>
                                                  );
                                              })}

                                        {hasOpsColumn && (
                                            <td className="p-3 border-b">
                                                <RowActions
                                                    row={row}
                                                    helpers={helpers}
                                                    actions={actions}
                                                    renderActions={renderActions}
                                                    editing={editing}
                                                    saving={editor.saving}
                                                    canEdit={!!onEdit}
                                                    canDelete={!!onDelete}
                                                    onBeginEdit={() => editor.begin(row)}
                                                    onSave={editor.save}
                                                    onCancel={editor.cancel}
                                                    onRequestDelete={() => remover.request(row)}
                                                />
                                            </td>
                                        )}
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {table.totalPages > 1 && (
                <div className="mt-5 mx-auto flex items-center gap-5">
                    <SelectPagination
                        currentPage={table.meta.current_page ?? 1}
                        totalPages={table.totalPages}
                        onPageChange={table.setPage}
                    />
                    <AdminPagination
                        currentPage={table.meta.current_page ?? 1}
                        totalPages={table.totalPages}
                        onPageChange={table.setPage}
                    />
                </div>
            )}
        </>
    );
}

export default Table;
