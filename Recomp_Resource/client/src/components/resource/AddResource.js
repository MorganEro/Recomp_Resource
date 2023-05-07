import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { addResource } from "../../modules/resourceManager";
import Resource from "./Resource";


const AddResource = () => {
  const navigate = useNavigate();

  const [resource, setResource] = useState({
    content: "",
  });


  const handleSubmitButtonClick = (evt) => {
    evt.preventDefault();

    addResource(resource);
    navigate("../../resource/adminList");
  };

  const handleCancelButtonClick = () => {
    navigate("../../resource/adminList");
  };

  return (
    <form>
      <h2> Add A Resource</h2>
      <fieldset>
        <label htmlFor="title">Title</label>
        <input
          required
          autoFocus
          type="text"
          placeholder="resource title"
          value={resource.title}
          onChange={(evt) => {
            const copy = { ...resource};
            copy.title = evt.target.value;
            setResource(copy)
          }}
        />
      </fieldset>
      <fieldset>
            <div>
              <label htmlFor="category">Category: </label>
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
        <label htmlFor="topic">Topic</label>
        <input
          required
          autoFocus
          type="text"
          placeholder="resource topic"
          value={resource.topic}
          onChange={(evt) => {
            const copy = { ...resource};
            copy.topic = evt.target.value;
            setResource(copy)
          }}
        />
      </fieldset>
      <fieldset>
        <label htmlFor="content">Content</label>
        <input
          required
          autoFocus
          type="textarea"
          placeholder="resource content"
          value={resource.content}
          onChange={(evt) => {
            const copy = { ...resource};
            copy.content = evt.target.value;
            setResource(copy)
          }}
        />
      </fieldset>
      {resource.content === "" || resource.categoryId === "" || resource.topic === "" || resource.title === "" ? (
          <button outline className="">
            Complete Form
          </button>
        ) : (
          <button onClick={handleSubmitButtonClick}>Submit</button>
        )}

      <button onClick={handleCancelButtonClick}>Cancel</button>
    </form>
  );
};
export default AddResource;
