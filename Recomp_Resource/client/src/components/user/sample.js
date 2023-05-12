<FormGroup>
  <Row>
    <Col>
    <br />
      <InputGroup>
        <InputGroupText>About Me</InputGroupText>
        <Input
                      required
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
      </InputGroup>
    </Col>
  </Row>
</FormGroup>;


import React, { useEffect, useState } from "react";
import { getAllUsers, getUserSearch } from "../../modules/userManager";
import User from "./User";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
} from "reactstrap";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchParams, setSearchParams] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

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

  const search = () => {
    getUserSearch(searchParams).then((searchResults) => {
      setUsers(searchResults);
      setSearchParams("");
    });
  };

  return (
    <>
      <div className="container m-4">
        <div className="search-wrapper">
          <label htmlFor="search-form">
            <input
              type="search"
              name="search-form"
              id="search-form"
              className="searchInput rounded"
              placeholder="DisplayName/Focus..."
              onChange={(event) => {
                setSearchParams(event.target.value);
              }}
            />
          </label>
          <button onClick={search}>Search </button>
          <button onClick={getUsers}>Reset</button>
        </div>
      </div>
      <h1 className="text-center"> MEMBERS</h1>
      <section className="container">
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
          <CarouselControl
            direction="prev"
            directionText="Previous"
            onClickHandler={previous}
          />
          <CarouselControl
            direction="next"
            directionText="Next"
            onClickHandler={next}
          />
        </Carousel>
      </section>
    </>
  );
};
