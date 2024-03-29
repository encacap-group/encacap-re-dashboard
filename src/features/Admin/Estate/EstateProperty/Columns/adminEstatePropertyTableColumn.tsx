import { ICategoryProperty } from "@encacap-group/common/dist/re";
import { createColumnHelper } from "@tanstack/react-table";
import { TFunction } from "i18next";

import TableRowActionSkeleton from "@components/Table/TableRowActionSkeleton";
import { ColumnDef, TableRowActionClickHandlerType } from "@interfaces/Common/elementTypes";
import { adminEstatePropertyService } from "@services/index";

import AdminEstatePropertyTableRowActions from "../Components/AdminEstatePropertyTableRowActions";

interface OnClickHandlers {
  onClickDelete: TableRowActionClickHandlerType;
  onClickEdit: TableRowActionClickHandlerType;
}

const createEstatePropertyTableColumns = (t: TFunction, { onClickDelete, onClickEdit }: OnClickHandlers) => {
  const columnHelper = createColumnHelper<ICategoryProperty>();

  const tableExampleColumns: Array<ColumnDef<ICategoryProperty>> = [
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/prefer-ts-expect-error
    // @ts-ignore: due to react-hook-form issue with self-ref interface.
    columnHelper.accessor((row) => row.id, {
      id: "id",
      header: String(t("table.column.id")),
    }),
    columnHelper.accessor((row) => row.name, {
      id: "name",
      header: String(t("table.column.name")),
    }),
    columnHelper.accessor((row) => row.category.name, {
      id: "categoryName",
      header: String(t("table.column.categoryName")),
      meta: {
        filterBy: "categoryIds",
        filterValueBy: "category.id",
        filterLabelBy: "category.name",
        filterSearchBy: "categoryName",
        getFilterOptions: adminEstatePropertyService.getAllEstateProperties,
      },
    }),
    columnHelper.display({
      id: "actions",
      cell: (props) => (
        <AdminEstatePropertyTableRowActions
          id={props.row.original.id}
          onClickDelete={onClickDelete}
          onClickEdit={onClickEdit}
        />
      ),
      meta: {
        skeleton: <TableRowActionSkeleton numberOfActions={2} />,
      },
    }),
  ];

  return tableExampleColumns;
};

export default createEstatePropertyTableColumns;
