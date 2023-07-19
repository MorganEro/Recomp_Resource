import React from "react";
import { Badge } from "reactstrap";

const AdminResource = ({ resource }) => {
  resource.numberOfComments = resource.comments.length;
  return (
    <div className="card ">
      <div className="card-title text-center m-2">
        <a href={`../../resource/adminDetails/${resource.id}`}>
          <strong>{resource.title}</strong>
        </a>
      </div>
      <div className="flex card-body align-items-center">
        <ol className="list-group">
          <li className="list-group-item">
            <strong>Focus</strong> {resource.topic}
          </li>
          <li className="list-group-item">
            <strong>Comments</strong>{" "}
            <Badge pill>{resource.numberOfComments}</Badge>
          </li>
          <li className="list-group-item">
            <strong>Saves</strong> <Badge pill>{resource.numberOfSaves}</Badge>
          </li>
        </ol>
      </div>
    </div>
  );
};
export default AdminResource;
