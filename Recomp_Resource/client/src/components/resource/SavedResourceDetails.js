import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  UnSaveResource,
  getSavedResourceById,
} from "../../modules/resourceManager";
import EnterComment from "../comment/EnterComment";

const SavedResourceDetails = () => {
  const [savedResource, setSavedResource] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const getSavedResource = () => {
    getSavedResourceById(id).then((resource) => setSavedResource(resource));
  };

  useEffect(() => {
    getSavedResource();
  }, [id]);

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  const UnSaveButtonClick = (e) => {
    UnSaveResource(savedResource.id).then(() => {
      getSavedResource();
    });
  };

  return (
    <div className="container d-flex justify-content-center mb-3">
      <div className="card shadow-sm" style={{ width: "80vw" }}>
        <div className="card-body">
          {/*--------------Header-------------*/}
          <p>
            <strong>{savedResource?.resource?.title}</strong>
          </p>

          {/*-------------YouTube-------------*/}
          <div className="mb-3">
            <iframe
              width="90%"
              height="315"
              src={savedResource?.resource?.content}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
          <table class="table table-borderless table-sm">
            <thead>
              <tr>
                <th scope="col">Category</th>
                <th scope="col">Topic</th>
                <th scope="col">Added On</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{savedResource?.resource?.category?.goal}</td>
                <td title="List of topics are keywords that allow you to search for videos similar to your current focus">
                  {savedResource?.resource?.topic}
                </td>
                <td>
                  {new Date(savedResource?.resource?.dateAdded).toDateString()}
                </td>
              </tr>
            </tbody>
          </table>
          {/*--------------Comment List-------------*/}
          <ul className="list-group mb-3">
            {savedResource?.resource?.comments.map((comment) => (
              <li className="list-group-item" key={comment.id}>
                <div className="row align-items center">
                  <div className="col">
                    <img
                      className="rounded"
                      src={savedResource?.user?.imageAddress}
                      alt="avatar"
                      style={{ width: "45px" }}
                    />
                  </div>
                  <div class="col">
                    <a href={`../../user/details/${savedResource.userId}`}>
                      <span>{savedResource?.user?.displayName}</span>
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
            <EnterComment
              resourceId={savedResource?.resource?.id}
              getResource={getSavedResource}
            />
          </div>
        </div>
        {/*--------------Buttons-------------*/}
        <div className="d-flex justify-content-evenly mb-3">
          <button className="btn btn-secondary" onClick={handleBackButtonClick}>
            Back
          </button>
          <button
            className="btn btn-danger"
            color="danger"
            onClick={UnSaveButtonClick}
          >
            UnSave
          </button>
        </div>
      </div>
    </div>
  );
};
export default SavedResourceDetails;
