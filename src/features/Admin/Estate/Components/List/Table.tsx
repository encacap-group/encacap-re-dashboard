import { IBaseListQuery } from "@encacap-group/common/dist/base";
import { IEstate } from "@encacap-group/common/dist/re";
import { createColumnHelper } from "@tanstack/react-table";
import { isEqual } from "lodash";
import { Key, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

import { ConfirmationModal } from "@components/Modal";
import { PostDeleteConfirmationModal } from "@components/Post";
import Table from "@components/Table/Table";
import { DEFAULT_PAGE_SIZE } from "@constants/defaultValues";
import useToast from "@hooks/useToast";
import { TablePaginationType } from "@interfaces/Common/commonTypes";
import { ColumnDef, TableColumnFilterState } from "@interfaces/Common/elementTypes";
import { adminEstateService, adminLocationService } from "@services/index";
import { generateColumnFilterObject } from "@utils/helpers";

import { EstateListTabEnum } from "@admin/Estate/Constants/enums";

import PostTableBody from "../../../../Common/Components/Post/Table/TableBody";

interface AdminEstateListTableProps {
  data: IEstate[];
  isLoading: boolean;
  totalRows: number;
  onChangeQueryParams?: (queryParams: IBaseListQuery) => void;
  onMoveToTop: (estateId: Key) => Promise<void>;
  onPublish: (estateId: Key) => Promise<void>;
  onUnPublish: (estateId: Key) => Promise<void>;
}

const AdminEstateListTable = ({
  data,
  totalRows,
  isLoading,
  onChangeQueryParams,
  onUnPublish,
  onPublish,
  onMoveToTop,
}: AdminEstateListTableProps) => {
  const { t } = useTranslation("admin", {
    keyPrefix: "admin:page.estate.list",
  });
  const { t: tEstate } = useTranslation("admin", {
    keyPrefix: "admin:page.estate",
  });
  const toast = useToast();

  const [pagination, setPagination] = useState<TablePaginationType>({
    page: 1,
    limit: DEFAULT_PAGE_SIZE,
  });
  const [columnFilters, setColumnFilters] = useState<TableColumnFilterState[]>([]);
  const [queryParams, setQueryParams] = useState<IBaseListQuery>({
    ...pagination,
    tab: EstateListTabEnum.COMPLETED,
  });
  const [isShowUnPublishConfirmModal, setIsShowUnPublishConfirmModal] = useState(false);
  const [isShowPublishConfirmModal, setIsShowPublishConfirmModal] = useState(false);
  const [isShowDeleteConfirmModal, setIsShowDeleteConfirmModal] = useState(false);
  const [selectedEstateId, setSelectedEstateId] = useState<Key | null>(null);
  const [searchParams] = useSearchParams();

  const selectedTabIdParam = useMemo(
    () => searchParams.get("tab_id") ?? EstateListTabEnum.COMPLETED,
    [searchParams],
  );

  const selectedEstate = useMemo(
    () => data.find((estate) => estate.id === selectedEstateId) ?? null,
    [data, selectedEstateId],
  );

  const columnHelper = useMemo(() => createColumnHelper<IEstate>(), []);

  const columns: Array<ColumnDef<IEstate>> = useMemo(
    () => [
      // @ts-ignore: due to react-hook-form issue with self-ref interface.
      columnHelper.accessor((row) => row.ward, {
        id: "status",
        header: String(t("table.column.status")),
        meta: {
          filterBy: "statuses",
          filterValueBy: "name",
          filterSearchBy: "name",
          getFilterOptions: adminEstateService.getEstateStatuses,
          filterLabelFormatter: (value: string) => tEstate(`status.${value}`),
        },
      }),
      columnHelper.accessor((row) => row.province, {
        id: "province",
        header: String(t("table.column.province")),
        meta: {
          filterBy: "provinceCode",
          filterValueBy: "name",
          filterSearchBy: "code",
          getFilterOptions: adminLocationService.getAllProvinces,
        },
      }),
      columnHelper.accessor((row) => row.district, {
        id: "district",
        header: String(t("table.column.district")),
        meta: {
          filterBy: "districtCode",
          filterValueBy: "name",
          filterSearchBy: "code",
          getFilterOptions: adminLocationService.getAllDistricts,
        },
      }),
      columnHelper.accessor((row) => row.ward, {
        id: "ward",
        header: String(t("table.column.ward")),
        meta: {
          filterBy: "wardCode",
          filterValueBy: "name",
          filterSearchBy: "code",
          getFilterOptions: adminLocationService.getAllWards,
        },
      }),
    ],
    [columnHelper, t, tEstate],
  );

  const handleInteraction = useCallback(() => {
    onChangeQueryParams?.(queryParams);
  }, [onChangeQueryParams, queryParams]);

  const handleClickUnPublish = useCallback((id: Key) => {
    setIsShowUnPublishConfirmModal(true);
    setSelectedEstateId(id);
  }, []);

  const handleClickPublish = useCallback((id: Key) => {
    setIsShowPublishConfirmModal(true);
    setSelectedEstateId(id);
  }, []);

  const handleClickDelete = useCallback((id: Key) => {
    setIsShowDeleteConfirmModal(true);
    setSelectedEstateId(id);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsShowUnPublishConfirmModal(false);
    setIsShowPublishConfirmModal(false);
    setIsShowDeleteConfirmModal(false);
    setSelectedEstateId(null);
  }, []);

  const handleConfirmUnPublish = useCallback(async () => {
    if (!selectedEstateId) {
      return;
    }

    try {
      await onUnPublish(selectedEstateId);
      toast.success(t("notification.unPublished"));
      onChangeQueryParams?.(queryParams);
    } catch (error) {
      toast.error(t("notification.unPublishFailed"));
    } finally {
      handleCloseModal();
    }
  }, [handleCloseModal, onChangeQueryParams, onUnPublish, queryParams, selectedEstateId, t, toast]);

  const handleConfirmPublish = useCallback(async () => {
    if (!selectedEstateId) {
      return;
    }

    try {
      await onPublish(selectedEstateId);
      toast.success(t("notification.published"));
      onChangeQueryParams?.(queryParams);
    } catch (error) {
      toast.error(t("notification.publishFailed"));
    } finally {
      handleCloseModal();
    }
  }, [handleCloseModal, onChangeQueryParams, onPublish, queryParams, selectedEstateId, t, toast]);

  useEffect(() => {
    const newQueryParams: IBaseListQuery = {
      ...queryParams,
      ...generateColumnFilterObject(columnFilters),
    };

    if (isEqual(newQueryParams, queryParams)) {
      return;
    }

    setQueryParams(newQueryParams);
  }, [columnFilters, pagination, queryParams]);

  useEffect(() => {
    setQueryParams((prevQueryParams) => ({
      ...prevQueryParams,
      tab: selectedTabIdParam,
      page: 1,
    }));
  }, [selectedTabIdParam]);

  useEffect(() => {
    onChangeQueryParams?.(queryParams);
  }, [onChangeQueryParams, queryParams]);

  return (
    <>
      <Table
        columns={columns}
        data={data}
        pagination={{
          ...pagination,
          totalRows,
        }}
        onChangePagination={setPagination}
        onChangeFilters={setColumnFilters}
      >
        <PostTableBody
          data={data}
          isLoading={isLoading}
          onClickUnPublish={handleClickUnPublish}
          onClickPublish={handleClickPublish}
          onMoveToTop={onMoveToTop}
          onInteraction={handleInteraction}
          onClickDelete={handleClickDelete}
        />
      </Table>
      <ConfirmationModal
        title={t("publication.title.unPublish", {
          title: selectedEstate?.title,
        })}
        message={t("publication.message.unPublish")}
        isOpen={isShowUnPublishConfirmModal}
        status="danger"
        onClose={handleCloseModal}
        onConfirm={handleConfirmUnPublish}
      />
      <ConfirmationModal
        title={t("publication.title.publish", {
          title: selectedEstate?.title,
        })}
        message={t("publication.message.publish")}
        isOpen={isShowPublishConfirmModal}
        status="danger"
        onClose={handleCloseModal}
        onConfirm={handleConfirmPublish}
      />
      <PostDeleteConfirmationModal
        data={selectedEstate}
        isOpen={isShowDeleteConfirmModal}
        onDelete={adminEstateService.deleteEstateById}
        onDeleteDraft={adminEstateService.deleteEstateDraftById}
        onClose={handleCloseModal}
        onSuccess={handleInteraction}
      />
    </>
  );
};

export default AdminEstateListTable;
