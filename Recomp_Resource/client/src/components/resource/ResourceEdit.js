import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UpdateResource, getResourceById } from "../../modules/resourceManager";

const ResourceEdit = ({ toggle }) => {
  const [resource, setResource] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getResourceById(id).then(setResource);
  }, [id]);

  const handleSubmitButtonClick = () => {
    UpdateResource(resource.id, resource).then(() => {
      toggle(false);
      window.location.reload(false);
    });
  };

  const handleCancelButtonClick = () => {
    toggle(false);
  };

  return (
    <div className="card p-2">
      <h2 className="card-title text-center">Resource Edit</h2>
      <div className="card-body">
        <div className="form">
          <div className="mb-2">
            <label className="form-label" htmlFor="title">
              Title{" "}
            </label>
            <input
              required
              autoFocus
              type="text"
              className="form-control "
              value={resource.title}
              onChange={(evt) => {
                const copy = { ...resource };
                copy.title = evt.target.value;
                setResource(copy);
              }}
            />
          </div>
          <div className="mb-2">
            <label className="form-label" htmlFor="goal">
              Goal
            </label>
            <select
              required
              autoFocus
              className="form-select"
              aria-label="select goal"
              value={resource.categoryId}
              onChange={(evt) => {
                const copy = { ...resource };
                copy.categoryId = parseInt(evt.target.value);
                setResource(copy);
              }}
            >
              <option id="0" value="0">
                --Choose a Category--
              </option>
              <option id="1" value="1">
                Fat Loss
              </option>
              <option id="2" value="2">
                Weight Gain
              </option>
            </select>
          </div>
          <div className="mb-2">
            <label className="form-label" htmlFor="topic">
              Topic
            </label>
            <input
              required
              autoFocus
              type="text"
              className="form-control "
              value={resource.topic}
              onChange={(evt) => {
                const copy = { ...resource };
                copy.topic = evt.target.value;
                setResource(copy);
              }}
            />
          </div>
          <div className="mb-2">
            <label className="form-label" htmlFor="content">
              Content
            </label>
            <textarea
              required
              autoFocus
              rows="3"
              className="form-control "
              value={resource.content}
              onChange={(evt) => {
                const copy = { ...resource };
                copy.content = evt.target.value;
                setResource(copy);
              }}
            />
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-evenly mb-2">
        {resource.content === "" ||
        resource.categoryId === "" ||
        resource.topic === "" ||
        resource.title === "" ? (
          <button className="btn btn-secondary mx-5" disabled>
            Complete
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-success mx-5"
            onClick={handleSubmitButtonClick}
          >
            Submit
          </button>
        )}

        <button
          type="button"
          className="btn btn-outline-danger mx-5"
          onClick={handleCancelButtonClick}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ResourceEdit;
