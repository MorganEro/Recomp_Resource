import { useState } from "react";

import { addResource } from "../../modules/resourceManager";
import { Button, Card, CardBody, CardFooter, CardHeader, Form, FormGroup, Input, Label } from "reactstrap";

const AddResource = ({toggle}) => {


  const [resource, setResource] = useState({
    title: "",
    categoryId: 0,
    topic: "",
    content: "",
  });

  const handleSubmitButtonClick = () => {


    addResource(resource).then(() => {
      toggle(false);
      window.location.reload(false);
    });
  };

  const handleCancelButtonClick = () => {
    toggle(false);
  };

  return (
    <Card>
      <CardHeader>
      <h2> Add A Resource</h2>

      </CardHeader>
      <CardBody>
        
    <Form class="text-upper">
      <FormGroup>
        <Label htmlFor="title">Title</Label>
        <Input
          required
          autoFocus
          type="text"
          placeholder="resource title"
          value={resource.title}
          onChange={(evt) => {
            const copy = { ...resource };
            copy.title = evt.target.value;
            setResource(copy);
          }}
        />
      </FormGroup>
      <FormGroup>
        <div>
          <Label htmlFor="category">Category: </Label>
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
        </div>
      </FormGroup>
      <FormGroup>
        <Label htmlFor="topic">Topic</Label>
        <Input
          required
          autoFocus
          type="text"
          placeholder="resource topic"
          value={resource.topic}
          onChange={(evt) => {
            const copy = { ...resource };
            copy.topic = evt.target.value;
            setResource(copy);
          }}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="content">Content</Label>
        <Input
          required
          autoFocus
          type="textarea"
          placeholder="resource content"
          value={resource.content}
          onChange={(evt) => {
            const copy = { ...resource };
            copy.content = evt.target.value;
            setResource(copy);
          }}
        />
      </FormGroup>
    </Form>
      </CardBody>
    <CardFooter>

      <Button className="mx-5" onClick={handleCancelButtonClick}>Cancel</Button>
      {resource.content === "" ||
      resource.categoryId === 0 ||
      resource.topic === "" ||
      resource.title === "" ? (
        <Button disabled className="mx-5">Complete Form</Button>
      ) : (
        <Button color="success" className="mx-5" onClick={handleSubmitButtonClick}>Submit</Button>
      )}

    </CardFooter>
    </Card>
  );
};
export default AddResource;
