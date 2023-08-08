import React from "react";
import {
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Col,
  Button,
  Modal,
} from "reactstrap";
import { useTable, usePagination } from "react-table";
import axios from "axios";
import { getColumns } from "../components/TableColumn/subscriptionColumn";
import Loading from "../components/Loading/Loading";

import Sidebar from "../components/Sidebar/Sidebar";
import CreateSubscription from "./CreateSubscription";
const SubscriptionPage = () => {
  const baseURL =
    "http://localhost:5000/api/subscription/get-subscription-list";
  let [postData, setPostData] = React.useState([]);
  const token = localStorage.getItem("token");
  const [error, setError] = React.useState(null);
  const [index, setIndex] = React.useState(0);
  const [modal, setModal] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };
  const role = localStorage.getItem("role");
  const getList = () => {
    axios.get(baseURL).then((response) => {
      setLoading(true);
      setPostData(response?.data?.data?.subscriptionList);
      setLoading(false);
    });
  };
  React.useEffect(() => {
    getList();
  }, [token]);
  React.useEffect(() => {
    getList();
  }, [modal]);

  const data = React.useMemo(() => postData, [postData]);
  const columns = React.useMemo(() => getColumns(index), [index]);
  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: {
        sortBy: [],
      },
    },
    usePagination
  );

  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, page } =
    tableInstance;

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
                  <Col xs="12" className="d-flex justify-content-between px-5">
                    <h2 className="mb-0">Subscription List</h2>
                    {role === "admin" && (
                      <Button color="info" onClick={toggleModal}>
                        Add Subscription
                      </Button>
                    )}
                  </Col>
                </Row>
              </CardHeader>
              {isLoading ? (
                <React.Fragment>
                  <div className="post_error_loading">
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
                      {postData?.length === 0 && (
                        <h5>No Subscription found.</h5>
                      )}
                    </React.Fragment>
                  )}
                </React.Fragment>
              )}
            </Card>
          </div>
        </Row>
        <CreateSubscription isOpen={modal} toggleModal={toggleModal} />
      </Container>
    </>
  );
};

export default SubscriptionPage;
