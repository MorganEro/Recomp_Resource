import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getResourceById, saveResource } from "../../modules/resourceManager";
import EnterComment from "../comment/EnterComment";
import { getAllCommentsByResourceId } from "../../modules/commentManager";

const UserResourceDetails = () => {
  const [resource, setResource] = useState({});
  const [comments, setComments] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const savedResource = {
    resourceId: 0,
  };

  const getResource = () => {
    getResourceById(id).then((resource) => setResource(resource));
  };
  const getComments = () => {
    getAllCommentsByResourceId(id).then((comments) => setComments(comments));
  };

  useEffect(() => {
    getResource();
  }, []);
  useEffect(() => {
    getComments();
  }, []);

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  const handleSaveButtonClick = () => {
    savedResource.resourceId = resource.id;
    saveResource(savedResource).then(() => {
      getResource();
    });
  };
  return (
    <div className="container d-flex justify-content-center mb-3">
      <div className="card shadow-sm" style={{ width: "80vw" }}>
        <div className="card-body">
          {/*--------------Header-------------*/}
          <p>
            <strong>{resource.title}</strong>
          </p>

          {/*-------------YouTube-------------*/}
          <div className="mb-3">
            <iframe
              width="90%"
              height="315"
              src={resource.content}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
          <table className="table table-borderless table-sm">
            <thead>
              <tr>
                <th scope="col">Category</th>
                <th
                  scope="col"
                  title="Topics are keywords that allow you to search for videos similar to your current focus"
                >
                  Topic
                </th>
                <th scope="col">Added On</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{resource.category?.goal}</td>
                <td title="List of topics are keywords that allow you to search for videos similar to your current focus">
                  {resource.topic}
                </td>
                <td>{new Date(resource.dateAdded).toDateString()}</td>
              </tr>
            </tbody>
          </table>

          {/*--------------Comment List-------------*/}
          <ul className="list-group mb-3">
            {comments.map((comment) => (
              <li className="list-group-item" key={comment.id}>
                <div className="row align-items center">
                  <div className="col">
                    <img
                      className="rounded"
                      src={comment?.user?.imageAddress}
                      alt="avatar"
                      style={{ width: "45px" }}
                    />
                  </div>
                  <div className="col">
                    <a href={`../../user/details/${comment?.userId}`}>
                      <span>{comment?.user?.displayName} </span>
                    </a>
                  </div>
                  <div className="col-7 flex-grow-1 text-start">
                    {comment.content}
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/*-------------- Enter Comment-------------*/}
          <div>
            <EnterComment resourceId={resource.id} getComments={getComments} />
          </div>
        </div>

        {/*--------------Buttons-------------*/}

        <div className="d-flex justify-content-around mb-3">
          <button
            title="Previous page"
            className="btn btn-secondary align-self-start"
            onClick={handleBackButtonClick}
          >
            <i className="fa fa-arrow-circle-left"></i>
          </button>
          {resource.saved === true ? (
            <button className="btn btn-sm btn-secondary" disabled>
              {" "}
              SAVED{" "}
            </button>
          ) : (
            <button className="btn btn-success" onClick={handleSaveButtonClick}>
              Save Resource
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default UserResourceDetails;
