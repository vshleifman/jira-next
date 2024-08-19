import {Data} from "./tickets/route";

export const mockData: Data[] = [
  {
    id: 1,
    title: "ticket1",
    summary:
      "A slightly longer than the title summary1 that states what the ticket is about",
    epic: "epic1",
    status: "Backlog",
  },
  {
    id: 2,
    title: "ticket2",
    summary:
      "A slightly longer than the title summary2 that states what the ticket is about",
    epic: "epic1",
    status: "Up next",
  },
  {
    id: 3,
    title: "ticket3",
    summary:
      "A slightly longer than the title summary3 that states what the ticket is about",
    epic: "epic1",
    status: "In progress",
  },
  {
    id: 4,
    title: "ticket4",
    summary:
      "A slightly longer than the title summary4 that states what the ticket is about",
    epic: "epic1",
    status: "On hold",
  },
  {
    id: 5,
    title: "ticket5",
    summary:
      "A slightly longer than the title summary5 that states what the ticket is about",
    epic: "epic3",
    status: "In progress",
  },
  {
    id: 6,
    title: "ticket6",
    summary:
      "A slightly longer than the title summary6 that states what the ticket is about",
    epic: "epic2",
    status: "Up next",
  },
  {
    id: 7,
    title: "ticket7",
    summary:
      "A slightly longer than the title summary7 that states what the ticket is about",
    epic: "epic2",
    status: "Done",
  },
  {
    id: 8,
    title: "ticket8",
    summary:
      "A slightly longer than the title summary8 that states what the ticket is about",
    epic: "epic2",
    status: "In progress",
  },
  {
    id: 9,
    title: "ticket9",
    summary:
      "A slightly longer than the title summary9 that states what the ticket is about",
    epic: "epic2",
    status: "Done",
  },
  {
    id: 10,
    title: "ticket10",
    summary:
      "A slightly longer than the title summary10 that states what the ticket is about",
    epic: "epic3",
    status: "Up next",
  },
];

export const hiddenStatuses = ["Done"];
const unfilteredStatusList = [
  "Backlog",
  "Up next",
  "In progress",
  "On hold",
  "Done",
];

export let statusList = unfilteredStatusList.filter(
  (status) => !hiddenStatuses.includes(status)
);

export let epicsList = ["epic1", "epic2", "epic3"];

export const updateColumns = (newOrder: string[]) => {
  statusList = newOrder;
};

export const updateRows = (newOrder: string[]) => {
  epicsList = newOrder;
};
