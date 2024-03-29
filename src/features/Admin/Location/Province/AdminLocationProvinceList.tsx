import { IBaseListQuery } from "@encacap-group/common/dist/base";
import { ILocationProvince } from "@encacap-group/common/dist/re";
import { SortingState } from "@tanstack/react-table";
import { isEqual } from "lodash";
import { Key, useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import LayoutContent from "@common/Layout/Components/LayoutContent";
import Table from "@components/Table/Table";
import { DEFAULT_PAGE_SIZE } from "@constants/defaultValues";
import { TablePaginationType } from "@interfaces/Common/commonTypes";
import { TableColumnFilterState } from "@interfaces/Common/elementTypes";
import { adminLocationService } from "@services/index";
import { generateColumnFilterObject, setDocumentTitle } from "@utils/helpers";

import createLocationProvinceTableColumns from "./Columns/adminLocationProvinceTableColumn";
import AdminLocationProvinceDeleteConfirmationModal from "./Components/AdminLocationProvinceDeleteConfirmationModal";
import AdminLocationProvinceHeaderAction from "./Components/AdminLocationProvinceHeaderAction";
import AdminLocationProvinceModificationModal from "./Components/AdminLocationProvinceModificationModal";

const AdminLocationProvinceList = () => {
  const { t } = useTranslation("admin", {
    keyPrefix: "admin:page.location.province",
  });

  const [provinceData, setProvinceData] = useState<ILocationProvince[]>([]);
  const [pagination, setPagination] = useState<TablePaginationType>({
    page: 1,
    limit: DEFAULT_PAGE_SIZE,
  });
  const [columnSorting, setColumnSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<TableColumnFilterState[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [queryParams, setQueryParams] = useState<IBaseListQuery>({
    ...pagination,
  });
  const [selectedProvinceCode, setSelectedProvinceCode] = useState<string | null>(null);
  const [isShowDeleteConfirmationModal, setIsShowDeleteConfirmationModal] = useState(false);
  const [isShowModificationModal, setIsShowModificationModal] = useState(false);

  const getProvinceData = useCallback(() => {
    setIsLoading(true);

    adminLocationService
      .getProvinces(queryParams)
      .then(({ data, meta }) => {
        setProvinceData(data);
        setPagination((prev) => ({
          ...prev,
          totalPages: meta.totalPages,
          totalRows: meta.totalRows,
        }));
      })
      .catch(() => {
        setProvinceData([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [queryParams]);

  const handleClickAddButton = useCallback(() => {
    setIsShowModificationModal(true);
  }, []);

  const handleClickDeleteButton = useCallback((code: Key) => {
    setSelectedProvinceCode(code as string);
    setIsShowDeleteConfirmationModal(true);
  }, []);

  const handleCloseDeleteConfirmationModal = useCallback(() => {
    setIsShowDeleteConfirmationModal(false);
  }, []);

  const handleCloseModificationModal = useCallback(() => {
    setIsShowModificationModal(false);
  }, []);

  useEffect(() => {
    getProvinceData();
  }, [getProvinceData]);

  useEffect(() => {
    const newQueryParams: IBaseListQuery = {
      ...queryParams,
      ...generateColumnFilterObject(columnFilters),
      page: pagination.page,
      limit: pagination.limit,
    };

    if (isEqual(newQueryParams, queryParams)) {
      return;
    }

    setQueryParams(newQueryParams);
  }, [columnFilters, pagination.limit, pagination.page, queryParams]);

  useLayoutEffect(() => {
    setDocumentTitle(t("title"));
  }, [t]);

  return (
    <LayoutContent
      title={t("title")}
      action={<AdminLocationProvinceHeaderAction onClick={handleClickAddButton} />}
    >
      <Table
        data={provinceData}
        columns={createLocationProvinceTableColumns(t, {
          onClickDelete: handleClickDeleteButton,
        })}
        pagination={pagination}
        sorting={columnSorting}
        isLoading={isLoading}
        onChangePagination={setPagination}
        onChangeSorting={setColumnSorting}
        onChangeFilters={setColumnFilters}
      />
      <AdminLocationProvinceDeleteConfirmationModal
        isOpen={isShowDeleteConfirmationModal}
        code={selectedProvinceCode ?? ""}
        onClose={handleCloseDeleteConfirmationModal}
        onDeleted={getProvinceData}
      />
      <AdminLocationProvinceModificationModal
        isOpen={isShowModificationModal}
        onClose={handleCloseModificationModal}
        onCreated={getProvinceData}
      />
    </LayoutContent>
  );
};

export default AdminLocationProvinceList;
