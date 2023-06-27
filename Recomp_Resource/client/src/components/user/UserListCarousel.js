import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../modules/userManager";
import User from "./User";
import {
  Carousel,
  CarouselItem,
  CarouselIndicators,
  Button,
  Row,
  Col,
} from "reactstrap";
import { useNavigate } from "react-router-dom";

const UserListCarousel = () => {
  const [users, setUsers] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating] = useState(false);
  const navigate = useNavigate();

  const getUsers = () => {
    getAllUsers().then((data) => setUsers(data));
  };

  useEffect(() => {
    getUsers();
  }, []);
  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === users.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? users.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const backToListButton = () => {
    navigate(-1);
  };

  return (
    <>
      <h1 className="text-center"> MEMBERS</h1>
      <Button outline className="my-3" onClick={backToListButton}>
        List
      </Button>
      <Row>
        <Col>
          <Button outline size="lg" color="secondary" onClick={previous}>
            <i className="fa fa-chevron-circle-left"></i>
          </Button>
        </Col>
        <Col xs= "8">
          <Carousel activeIndex={activeIndex} next={next} previous={previous}>
            <CarouselIndicators
              items={users}
              activeIndex={activeIndex}
              onClickHandler={goToIndex}
            />
            {users.map((user) => (
              <CarouselItem>
                <User user={user} key={user.id} />
              </CarouselItem>
            ))}
          </Carousel>
        </Col>
        <Col>
          <Button outline size="lg" color="secondary" onClick={next}>
            <i className="fa fa-chevron-circle-right"></i>
          </Button>
        </Col>
      </Row>
    </>
  );
};
export default UserListCarousel;
