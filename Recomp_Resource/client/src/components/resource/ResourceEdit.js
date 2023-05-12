import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Card, CardBody, CardFooter } from "reactstrap";
import { UpdateResource, getResourceById } from "../../modules/resourceManager";

const ResourceEdit = ({toggle}) => {
  const [resource, setResource] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getResourceById(id).then(setResource);
  }, [id]);

  const handleSubmitButtonClick = () => {
    UpdateResource(resource.id, resource).then(() => {
      toggle(false);
      navigate(`../../resource/adminDetails/${id}`);
    })
  };

  const handleCancelButtonClick = () => {
    toggle(false);
  };

  return (
    <Card className="container">
      <h2>Resource Edit</h2>
      <CardBody>
        <form>
          <fieldset>
            <div>
              <label htmlFor="title">Title: </label>
              <input
                required
                autoFocus
                type="text"
                className=" "
                value={resource.title}
                onChange={(evt) => {
                  const copy = { ...resource };
                  copy.title = evt.target.value;
                  setResource(copy);
                }}
              />
            </div>
          </fieldset>
          <fieldset>
            <div>
              <label htmlFor="category">Goal: </label>
              <select
                required
                autoFocus
                className=""
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
          </fieldset>
          <fieldset>
            <div>
              <label htmlFor="topic">Topic: </label>
              <input
                required
                autoFocus
                type="text"
                className=" "
                value={resource.topic}
                onChange={(evt) => {
                  const copy = { ...resource };
                  copy.topic = evt.target.value;
                  setResource(copy);
                }}
              />
            </div>
          </fieldset>
          <fieldset>
            <div>
              <label htmlFor="content">Content: </label>
              <input
                required
                autoFocus
                type="text"
                className=" "
                value={resource.content}
                onChange={(evt) => {
                  const copy = { ...resource };
                  copy.content = evt.target.value;
                  setResource(copy);
                }}
              />
            </div>
          </fieldset>
        </form>
      </CardBody>
      <CardFooter>
      {resource.content === "" || resource.categoryId === "" || resource.topic === "" || resource.title === "" ? (
          <button outline className="">
            Complete Form
          </button>
        ) : (
          <button onClick={handleSubmitButtonClick}>Submit Changes</button>
        )}
        <button onClick={handleCancelButtonClick}>Cancel</button>
      </CardFooter>
    </Card>
  );
};

export default ResourceEdit;
