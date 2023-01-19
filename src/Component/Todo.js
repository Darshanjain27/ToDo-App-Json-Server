import axios from "axios";
import React, { useEffect, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { AiFillEye, AiFillEdit, AiOutlineDelete } from "react-icons/ai";

const Todo = () => {
  const [list, setList] = useState([]);
  const [username, setUserName] = useState([]);
  const [id, setId] = useState("");
  const [click, setClick] = useState(true);
  const [toggle, setToggle] = useState(true);
  const [View, setView] = useState(true);

  // Add Items
  const handleAdd = async () => {
    const dataPost = await axios.post("http://localhost:4000/users", {
      username,
    });
    setUserName("");
    setClick(false);
  };
  //  Fetch json data
  useEffect(() => {
    const fetchjson = async () => {
      try {
        const res = await axios.get("http://localhost:4000/users");
        const data = await res.data;
        setList(data);
      } catch (err) {
        console.log(`Error has occurred!`);
      }
    };

    fetchjson();
  }, []);
  //  Delete data
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:4000/users/${id}`);
    setClick(false);
  };
  // Edit Data
  const handleEdit = async (id) => {
    const editdata = list.find((elem) => {
      return elem.id === id;
    });
    setUserName(editdata.username);
    setId(id);
    setToggle(false);
    setView(true);
  };
  // Update Method
  let EditCompelte = async () => {
    try {
      let editdata = await axios.put(`http://localhost:4000/users/${id}`, {
        username,
      });
      let res = await editdata.data;
      setList([res]);
    } catch (error) {
      console.log(error);
    }
    setClick(false);
    setToggle(true);
    setUserName("");
  };
  // Preview data
  const handlePreview = (id) => {
    const previewdata = list.find((elem) => {
      return elem.id === id;
    });
    setUserName(previewdata.username);
    setView(false);
  };
  const handleRemoveAll = () => {
    setList([]);
  };
  return (
    <>
      {click ? (
        <div className="container">
          <div className="row  d-flex justify-content-center mt-5">
            <div className="col-lg-12 bg-info">
              <h1 className="text-center text-primary">
                ToDo Application With Json-Server
              </h1>
              {/* Input Type */}
              <div className="d-flex justify-content-center mt-3">
                {View ? (
                  <div className="d-flex justify-content-center mt-3">
                    <input
                      type="text"
                      className="form-control w-100"
                      placeholder="Enter ToDo..."
                      value={username}
                      onChange={(e) => {
                        setUserName(e.target.value);
                      }}
                    />
                    {toggle ? (
                      <div>
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            handleAdd();
                          }}
                        >
                          Add
                        </button>
                      </div>
                    ) : (
                      <div>
                        <button
                          className="btn btn-success"
                          onClick={EditCompelte}
                        >
                          Update
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <input
                      type="text"
                      className="form-control w-100"
                      placeholder="Enter ToDo..."
                      value={username}
                    />
                  </div>
                )}
              </div>
              {/* List Section */}
              <ul className="list-group mt-5 mb-5">
                <Scrollbars style={{ height: "20rem", width: "100%" }}>
                  {list.map((elem, index) => {
                    return (
                      <>
                        <div className=" mt-3 ms-5 " key={index}>
                          <li className="list-group-item d-flex justify-content-between ">
                            <div>
                              <span className="text-danger">
                                {elem.username}
                              </span>
                            </div>
                            <div>
                              <span className="ms-3">
                                <AiFillEye
                                  className="text-success"
                                  onClick={() => {
                                    handlePreview(elem.id);
                                  }}
                                />
                              </span>
                              <span className="ms-3">
                                <AiFillEdit
                                  className="text-primary"
                                  onClick={() => {
                                    handleEdit(elem.id);
                                  }}
                                />
                              </span>
                              <span className="ms-3">
                                <AiOutlineDelete
                                  className="text-danger"
                                  onClick={() => {
                                    handleDelete(elem.id);
                                  }}
                                />
                              </span>
                            </div>
                          </li>
                        </div>
                      </>
                    );
                  })}
                </Scrollbars>
              </ul>
              {list.length < 1 ? (
                <h1 className="text-center text-danger">
                  Please Enter Something
                </h1>
              ) : (
                <div className="text-center mb-5">
                  <button
                    className="btn btn-success"
                    onClick={() => {
                      handleRemoveAll();
                    }}
                  >
                    Remove All
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <Todo />
      )}
    </>
  );
};

export default Todo;
