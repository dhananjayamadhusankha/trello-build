import { useBoardStore } from "@/store/BoardStore";
import {
  Description,
  Field,
  Label,
  Radio,
  RadioGroup,
} from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

const types = [
  {
    id: "todo",
    name: "Todo",
    description: "A new task to be completed",
    color: "bg-red-500",
  },
  {
    id: "inprogress",
    name: "Doing",
    description: "A task that is currently being worked on",
    color: "bg-yellow-500",
  },
  {
    id: "done",
    name: "Done",
    description: "A task that has been completed",
    color: "bg-green-500",
  },
];
function TaskTypeRadioGroup() {
  const [newTaskType, setNewTaskType] = useBoardStore((state) => [
    state.newTaskType,
    state.setNewTaskType,
  ]);

  return (
    <div>
      <div>
        <RadioGroup
          value={newTaskType}
          onChange={(e) => setNewTaskType(e)}
          aria-label="Server size"
        >
          <div className="space-y-2">
            {types.map((type) => (
              <Radio
                key={type.id}
                value={type.id}
                className={({ disabled, checked }) =>
                  `${
                    disabled
                      ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300"
                      : ""
                  }${
                    checked
                      ? `${type.color} bg-opacity-75 text-white`
                      : "bg-white"
                  } relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                }
              >
                {({ checked, disabled }) => (
                  <>
                    <div className="flex justify-between items-center w-full">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <Label
                            as="p"
                            className={`font-medium ${
                              checked ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {type.name}
                          </Label>
                          <Description
                            as="span"
                            className={`inline ${
                              checked ? "text-white" : "text-gray-500"
                            }`}
                          >
                            {type.description}
                          </Description>
                        </div>
                      </div>
                      {checked && (
                        <div className="shrink-0 text-white">
                          <CheckCircleIcon className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </Radio>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
export default TaskTypeRadioGroup;
