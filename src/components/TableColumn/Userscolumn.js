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
      Header: "name",
      accessor: "name",
      Cell: ({ row }) => {
        return row?.original?.name;
      },
    },
    {
      Header: "email",
      accessor: "email",
      Cell: ({ row }) => {
        return <div>{row?.original?.email}</div>;
      },
    },
    {
      Header: "role",
      accessor: "role",
      Cell: ({ row }) => {
        return row?.original?.role;
      },
    },
  ];
};
