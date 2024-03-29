import { Key, useCallback } from "react";
import { twMerge } from "tailwind-merge";

import { TableRowActionDropdownItemType } from "@interfaces/Common/elementTypes";

interface TableRowActionDropdownMenuItemProps extends TableRowActionDropdownItemType {
  id: Key;
}

const TableRowActionDropdownMenuItem = ({
  className,
  icon,
  id,
  label,
  onClick,
}: TableRowActionDropdownMenuItemProps) => {
  const handleClick = useCallback(() => {
    onClick?.(id);
  }, [id, onClick]);

  return (
    <div
      className={twMerge("flex items-center justify-start px-4 py-1.5 hover:bg-gray-100", className)}
      role="button"
      tabIndex={0}
      onClick={handleClick}
    >
      <div className="mr-3">{icon}</div>
      <div className="line-clamp-1 break-all">{label}</div>
    </div>
  );
};

export default TableRowActionDropdownMenuItem;
