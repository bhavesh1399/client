export const getColumns = (index) => {
  return [
    {
      Header: "ID",
      accessor: "id",
      disableFilters: true,
      disableSortBy: true,
      Cell: ({ row }) => {
        return `${index + row.index + 1}`;
      },
    },
    {
      Header: "title",
      accessor: "title",
      Cell: ({ row }) => {
        return row?.original?.title;
      },
    },
    {
      Header: "Start Date",
      accessor: "startDate",
      Cell: ({ row }) => {
        return row?.original?.startDate;
      },
    },
    {
      Header: "End Date",
      accessor: "endDate",
      Cell: ({ row }) => {
        return row?.original?.endDate;
      },
    },
  ];
};
