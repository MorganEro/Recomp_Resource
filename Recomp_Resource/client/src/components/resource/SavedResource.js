import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardFooter } from "reactstrap";
import { UnSaveResource } from "../../modules/resourceManager";

const SavedResource = ({ savedResource, getSavedResources }) => {
  
  
  const UnSaveButton = (e) => {
    e.preventDefault();

    UnSaveResource(savedResource?.id).then(() => {
        getSavedResources()
     });
    
  };

  return (
    <Card>
      <CardBody>
        <p>
          <Link to={`../../resource/savedDetails/${savedResource?.id}`}>
            <strong>{savedResource?.resource?.title}</strong>
          </Link>
        </p>
        <p>Current Focus: {savedResource?.resource?.topic}</p>
      </CardBody>
      <CardFooter>
        <button onClick={UnSaveButton}>UnSave</button>
      </CardFooter>
    </Card>
  );
};
export default SavedResource;
