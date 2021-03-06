import React from "react";
import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

export default function NotFound() {
  return (
    <Segment placeholder>
      <Header icon>
          <Icon name='search' />
          A page is not found.
      </Header>
      <Segment.Inline>
          <Button as={Link} to='/books' primary>
              Return to books page
          </Button>
      </Segment.Inline>
    </Segment>
  );
}