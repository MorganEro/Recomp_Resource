import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Form, Button, FormGroup, Input, Label } from "reactstrap";
import { Card, CardBody, CardFooter } from "reactstrap";
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
    <Card className="container">
      <h2>Resource Edit</h2>
      <CardBody>
        <Form>
          <FormGroup>
            <Label htmlFor="title">Title </Label>
            <Input
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
          </FormGroup>
          <FormGroup>
            <Label htmlFor="category">Goal </Label>
            <Input
              required
              autoFocus
              type="select"
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
            </Input>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="topic">Topic </Label>
            <Input
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
          </FormGroup>
          <FormGroup>
            <Label htmlFor="content">Content </Label>
            <Input
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
          </FormGroup>
        </Form>
        {resource.content === "" ||
        resource.categoryId === "" ||
        resource.topic === "" ||
        resource.title === "" ? (
          <Button outline className="mx-5">
            Complete Form
          </Button>
        ) : (
          <Button color="success" className="mx-5" onClick={handleSubmitButtonClick}>
            Submit Changes
          </Button>
        )}
        <Button className="mx-5" onClick={handleCancelButtonClick}>Cancel</Button>
      </CardBody>
     
     
    </Card>
  );
};

export default ResourceEdit;
