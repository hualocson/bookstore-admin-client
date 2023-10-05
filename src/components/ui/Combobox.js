import * as React from "react";
import {
  CheckIcon as Check,
  ChevronUpDownIcon as ChevronsUpDown,
} from "@heroicons/react/24/outline";

import { cn } from "@/utils/common-functions";
import Button from "@/components/ui/Button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/Command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { Label } from "@radix-ui/react-label";

/**
 *
 * @param {Object} props
 * @param {Array} props.data - array object with label and value (e.g. [{label: "Next.js", value: "next.js"}])
 * @param {string} [props.label="Label"] - label text
 * @param {string} [props.searchPlaceholder="Search..."] - placeholder text
 * @param {string} [props.placeholder="Select..."] - placeholder text
 * @param {string} [props.notFoundMessage="No item found."] - message to show when no item is found
 * @param {Object} props.onSelectedValueChange - callback function when selected value changes
 * @returns
 */
export function ComboboxDemo({
  data,
  label = "Label",
  searchPlaceholder = "Search...",
  placeholder = "Select...",
  notFoundMessage = "No item found.",
  onSelectedValueChange,
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="grid min-w-[200px] w-full items-center gap-1.5">
          <Label>{label}</Label>
          <Button
            variant="grayscale"
            customClass="flex flex-row-reverse items-center justify-between w-full text-grayscale-400 bg-semi-grayscale-900 hover:bg-semi-grayscale-800 focus:bg-semi-grayscale-800 focus-visible:ring-1 focus-visible:ring-primary-300"
            icon={<ChevronsUpDown className="h-4 w-4 opacity-80" />}
          >
            {value
              ? data.find((item) => {
                  return item.label.trim().toLowerCase() === value;
                })?.label
              : placeholder}
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="min-w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandEmpty>{notFoundMessage}</CommandEmpty>
          <CommandGroup>
            {data.length > 0 ? (
              data.map((item) => (
                <CommandItem
                  key={item.label.trim().toLowerCase()}
                  onSelect={(currentValue) => {
                    setValue(currentValue);
                    console.log({ currentValue });
                    const selectedValue =
                      data.find(
                        (item) =>
                          item.label.trim().toLowerCase() === currentValue
                      )?.value ?? 0;
                    onSelectedValueChange(selectedValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === item.label.trim().toLowerCase()
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))
            ) : (
              <CommandItem disabled>Empty list</CommandItem>
            )}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
