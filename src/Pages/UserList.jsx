import React from "react";
import { Card, CardHeader, Table, Container, Row, Col } from "reactstrap";
import { useTable, usePagination, useGlobalFilter } from "react-table";
import { useDispatch, useSelector } from "react-redux";

import { getColumns } from "../components/TableColumn/Userscolumn";
import Loading from "../components/Loading/Loading";

import { selectUser } from "../redux/User/selector";
import { fetchUsersthunkAction } from "../redux/User/action";
import Sidebar from "../components/Sidebar/Sidebar";

const UserPage = () => {
  const [usersData, setUsersData] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [index, setIndex] = React.useState(0);

  const dispatch = useDispatch();
  let { users, isLoading } = useSelector(selectUser);
  const token = localStorage.getItem("token");
  React.useEffect(() => {
    setUsersData(users);
  }, [users, users?.length]);
  const data = React.useMemo(() => usersData, [usersData]);
  const columns = React.useMemo(() => getColumns(index), [index]);
  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    usePagination
  );

  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, page } =
    tableInstance;

  const onSuccess = () => {
    setError(null);
  };

  const onError = (error) => {
    setError(error);
  };

  React.useEffect(() => {
    if (token) {
      dispatch(fetchUsersthunkAction(onSuccess, onError));
    }
  }, [token]);

  return (
    <>
      <Container className="mt--7" fluid>
        <Row>
          <div className="col-md-2">
            <Sidebar />
          </div>
          <div className="col">
            <Card className="shadow" style={{ minHeight: "50vh" }}>
              <CardHeader className="border-0">
                <Row className="d-flex justify-content-between">
                  <Col xs="12">
                    <h2 className="mb-0">Users List</h2>
                  </Col>
                </Row>
              </CardHeader>
              {isLoading ? (
                <React.Fragment>
                  <div>
                    <Loading />
                  </div>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {error ? (
                    <React.Fragment>
                      <div className="post_error_loading">{error}</div>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <Table
                        {...getTableProps()}
                        className="align-items-center table-flush"
                        responsive
                      >
                        <thead className="thead-light">
                          {headerGroups.map((headerGroup) => (
                            <tr
                              {...headerGroup.getHeaderGroupProps()}
                              key={headerGroup}
                            >
                              {headerGroup.headers.map((column) => (
                                <th
                                  className="text-left border-none"
                                  key={column.id}
                                  {...column.getHeaderProps()}
                                >
                                  {column.render("Header")}
                                </th>
                              ))}
                            </tr>
                          ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                          {page.map((row) => {
                            prepareRow(row);
                            return (
                              <tr {...row.getRowProps()} key={row.id}>
                                {row.cells.map((cell) => {
                                  return (
                                    <td key={cell.id} {...cell.getCellProps()}>
                                      {cell.render("Cell")}
                                    </td>
                                  );
                                })}
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                      {!error && usersData?.length === 0 && (
                        <h5>No users found.</h5>
                      )}
                    </React.Fragment>
                  )}
                </React.Fragment>
              )}
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default UserPage;
