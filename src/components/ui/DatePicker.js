import { format, parseISO } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import * as React from "react";

import { Calendar } from "@/components/ui/Calendar";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";

function DatePicker({ selectedDate, setSelectedDate }) {
  return (
    <Popover placement="bottom">
      <PopoverTrigger>
        <Button variant={"solid"} className="justify-start py-7" size="lg">
          <CalendarIcon className="h-4 w-4" />
          {selectedDate && selectedDate !== "" ? (
            format(parseISO(selectedDate), "MM/dd/yyyy")
          ) : (
            <span>Publication Date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 z-50">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

export default DatePicker;
