import React from "react";
import { UnSaveResource } from "../../modules/resourceManager";

const SavedResource = ({ savedResource, getSavedResources }) => {
  const UnSaveButton = (e) => {
    e.preventDefault();

    UnSaveResource(savedResource?.id).then(() => {
      getSavedResources();
    });
  };

  return (
    <div className="card">
      <div className="card-body">
        <p>
          <a href={`../../resource/savedDetails/${savedResource?.id}`}>
            <strong>{savedResource?.resource?.title}</strong>
          </a>
        </p>
        <p>
          <strong>Focus</strong> {savedResource?.resource?.topic}
        </p>
      </div>

      <button className="btn btn-danger mx-2 mb-3" onClick={UnSaveButton}>
        UnSave
      </button>
    </div>
  );
};
export default SavedResource;
