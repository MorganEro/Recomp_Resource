import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UpdateUser, getUserById } from "../../modules/userManager";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  Col,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Row,
} from "reactstrap";

const UserEdit = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    displayName: "",
    birthday: "",
    height: "",
    weight: "",
    bfPercentage: "",
    bmr: "",
    categoryId: 0,
    imageAddress: "",
    currentFocus: "",
    bio: "",

  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getUserById(id).then(setUser);
  }, [id]);

  const handleSubmitButtonClick = (event) => {
    event.preventDefault();

    UpdateUser(user.id, user);
    navigate("../../user/myProfile");
  };

  const handleCancelButtonClick = () => {
    navigate("../../user/myProfile");
  };

  return (
    <Card>
      <br />
      <CardBody>
        <Row>
          <Col className="my-3">
            <CardTitle tag="h1"> User Edit</CardTitle>

            <CardImg
              style={{
                width: "25rem",
              }}
              src={user.imageAddress}
              alt="profile's picture"
            />
          </Col>
          <Col className="mx-3 d-flex align-items-center justify-content-center">
            <Form>
              <FormGroup>
                <Row>
                  <Col>
                    <InputGroup>
                      <InputGroupText>First Name</InputGroupText>
                      <Input
                        required
                        autoFocus
                        type="text"
                        className=" "
                        value={user.firstName}
                        onChange={(evt) => {
                          const copy = { ...user };
                          copy.firstName = evt.target.value;
                          setUser(copy);
                        }}
                      />
                    </InputGroup>
                  </Col>
                  <Col>
                    <InputGroup>
                      <InputGroupText>Last Name</InputGroupText>
                      <Input
                        required
                        autoFocus
                        type="text"
                        className=" "
                        value={user.lastName}
                        onChange={(evt) => {
                          const copy = { ...user };
                          copy.lastName = evt.target.value;
                          setUser(copy);
                        }}
                      />
                    </InputGroup>
                  </Col>
                  <Col>
                    <InputGroup>
                      <InputGroupText>Display Name</InputGroupText>
                      <Input
                        required
                        autoFocus
                        type="text"
                        className=" "
                        value={user.displayName}
                        onChange={(evt) => {
                          const copy = { ...user };
                          copy.displayName = evt.target.value;
                          setUser(copy);
                        }}
                      />
                    </InputGroup>
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col>
                    <InputGroup>
                      <InputGroupText>Birthday</InputGroupText>
                      <Input
                        required
                        autoFocus
                        type="date"
                        className=" "
                        value={user.birthday?.split("T")[0]}
                        onChange={(evt) => {
                          const copy = { ...user };
                          copy.birthday = evt.target.value;
                          setUser(copy);
                        }}
                      />
                    </InputGroup>
                  </Col>
                  <Col>
                    <InputGroup>
                      <InputGroupText>Height</InputGroupText>
                      <Input
                        autoFocus
                        type="text"
                        className=" "
                        value={user.height}
                        onChange={(evt) => {
                          const copy = { ...user };
                          copy.height = evt.target.value;
                          setUser(copy);
                        }}
                      />
                    </InputGroup>
                  </Col>
                  <Col>
                    <InputGroup>
                      <InputGroupText>Weight</InputGroupText>
                      <Input
                        autoFocus
                        type="text"
                        className="form-control"
                        value={user.weight}
                        onChange={(evt) => {
                          const copy = { ...user };
                          copy.weight = evt.target.value;
                          setUser(copy);
                        }}
                      />
                    </InputGroup>
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col>
                    <InputGroup>
                      <InputGroupText>Body Fat Percentage</InputGroupText>
                      <Input
                        autoFocus
                        type="text"
                        className=" "
                        value={user.bfPercentage}
                        onChange={(evt) => {
                          const copy = { ...user };
                          copy.bfPercentage = evt.target.value;
                          setUser(copy);
                        }}
                      />
                    </InputGroup>
                  </Col>
                  <Col>
                    <InputGroup>
                      <InputGroupText
                      title="click here to go to a BMR calculator"
                      >
                        <Link 
                        to={"https://tdeecalculator.net/"}
                        target="blank"
                        >
                        Basal Metabolic Rate
                        </Link>
                        </InputGroupText>
                      <Input
                        autoFocus
                        type="text"
                        className=" "
                        value={user.bmr}
                        onChange={(evt) => {
                          const copy = { ...user };
                          copy.bmr = evt.target.value;
                          setUser(copy);
                        }}
                      />
                    </InputGroup>
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col>
                    <InputGroup>
                      <InputGroupText>Goal</InputGroupText>
                      <Input
                        required
                        autoFocus
                        type="select"
                        value={user.categoryId}
                        onChange={(evt) => {
                          const copy = { ...user };
                          copy.categoryId = parseInt(evt.target.value);
                          setUser(copy);
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
                    </InputGroup>
                  </Col>
                  <Col>
                    <InputGroup>
                      <InputGroupText>Image Address</InputGroupText>
                      <Input
                        autoFocus
                        type="text"
                        className=" "
                        value={user.imageAddress}
                        onChange={(evt) => {
                          const copy = { ...user };
                          copy.imageAddress = evt.target.value;
                          setUser(copy);
                        }}
                      />
                    </InputGroup>
                  </Col>
                  <Col>
                    <InputGroup>
                      <InputGroupText 
                      title="current focus to reach your goal. (example: weights, running, sleep)">Current Focus</InputGroupText>
                      <Input
                        required
                        autoFocus
                        type="text"                        
                        value={user.currentFocus}
                        onChange={(evt) => {
                          const copy = { ...user };
                          copy.currentFocus = evt.target.value;
                          setUser(copy);
                        }}
                      />
                    </InputGroup>
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Label for="exampleText">About Me</Label>
                  <Input
                    autoFocus
                    type="textarea"
                    className="form-control"
                    rows={3}
                    value={user.bio}
                    onChange={(evt) => {
                      const copy = { ...user };
                      copy.bio = evt.target.value;
                      setUser(copy);
                    }}
                  />
                </Row>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </CardBody>
      <CardFooter>
        {user.currentFocus === "" ||
        user.firstName === "" ||
        user.lastName === "" ||
        user.displayName === "" ||
        user.goal === 0 ? (
          <Button outline disabled color="primary">
            Complete Changes
          </Button>
        ) : (
          <Button
            className="mx-5"
            color="success"
            onClick={handleSubmitButtonClick}
          >
            Submit Changes
          </Button>
        )}

        <Button
          className="mx-5"
          color="secondary"
          onClick={handleCancelButtonClick}
        >
          Cancel
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UserEdit;
