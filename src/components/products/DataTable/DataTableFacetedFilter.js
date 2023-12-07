import {
  Button,
  Chip,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { Column } from "@tanstack/react-table";
import { PlusCircle } from "lucide-react";
import React, { useState } from "react";
/**
 * @typedef Option
 * @property {string} label
 * @property {string} value
 * @property { React.ComponentType<{ className?: string }>} [icon]
 *
 * @param {Object} props
 * @param {Column<TData, TValue>} props.column
 * @param {string} props.title
 * @param {Option[]} props.options
 * @returns
 */
const DataTableFacetedFilter = ({ column, title, options }) => {
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));

  const handleOnSelectionChange = (selectedKeys) => {
    setSelectedKeys(selectedKeys);
    const filterValues = Array.from(selectedKeys).map((item) => parseInt(item));
    column?.setFilterValue(filterValues.length ? filterValues : undefined);
  };
  return (
    <Dropdown placement="bottom-start">
      <DropdownTrigger>
        <Button variant="flat" color="secondary">
          <PlusCircle className="mr-2 h-4 w-4" />
          {title}
          {selectedKeys?.size > 0 && (
            <>
              <Divider orientation="vertical" className="mx-2 h-4" />
              <div className="hidden space-x-1 lg:flex">
                {selectedKeys.size > 2 ? (
                  <Chip variant="shadow" color="primary" radius="sm">
                    {selectedKeys.size} selected
                  </Chip>
                ) : (
                  options
                    .filter((option) => selectedKeys.has(String(option.value)))
                    .map((option) => (
                      <Chip
                        variant="shadow"
                        color="primary"
                        radius="sm"
                        key={option.value}
                      >
                        {option.label}
                      </Chip>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Multiple selection example"
        variant="flat"
        closeOnSelect={false}
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={handleOnSelectionChange}
      >
        {options.map((option) => {
          return (
            <DropdownItem key={option.value} textValue={option.label}>
              {option.icon && (
                <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
              )}
              {/* {facets?.get(option.value) && (
                <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                  {facets.get(option.value)}
                </span>
              )} */}
              <span>{option.label}</span>
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    </Dropdown>
  );
};

export default DataTableFacetedFilter;
