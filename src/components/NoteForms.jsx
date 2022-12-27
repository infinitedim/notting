/* eslint-disable no-shadow */
import { useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Stack from "react-bootstrap/esm/Stack";
import { Link, useNavigate } from "react-router-dom";
import CreatetableReactSelect from "react-select/creatable";
import { v4 as uuidV4 } from "uuid";

export default function NoteForms({
  title = "",
  markdown = "",
  tags = [],
  onSubmit,
  onAddTag,
  availableTags,
}) {
  const navigate = useNavigate();
  const titleRef = useRef(null);
  const markdownRef = useRef(null);
  const [selectedTags, setSelectedTags] = useState(tags);

  function submitHandler(event) {
    event.preventDefault();

    onSubmit({
      title: titleRef.current.value,
      markdown: markdownRef.current.value,
      tags: selectedTags,
    });

    navigate("..");
  }

  return (
    <Form onSubmit={(e) => submitHandler(e)}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                required
                ref={titleRef}
                defaultValue={title}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <CreatetableReactSelect
                onCreateOption={(label) => {
                  const newTags = { id: uuidV4(), label };
                  onAddTag(newTags);
                  setSelectedTags((prevSelectedTags) => [
                    ...prevSelectedTags,
                    newTags,
                  ]);
                }}
                value={selectedTags?.map((tag) => ({
                  label: tag.label,
                  value: tag.id,
                }))}
                options={availableTags?.map((tag) => ({
                  label: tag.label,
                  value: tag.id,
                }))}
                onChange={(tags) =>
                  setSelectedTags(
                    tags.map((tag) => ({
                      label: tag.label,
                      id: tag.value,
                    })),
                  )
                }
                isMulti
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="markdown">
          <Form.Label>Body</Form.Label>
          <Form.Control
            required
            as="textarea"
            rows={15}
            ref={markdownRef}
            defaultValue={markdown}
          />
        </Form.Group>
        <Stack
          direction="horizontal"
          className="justify-content-end"
          gap={2}
        >
          <Button
            type="submit"
            variant="primary"
          >
            Save
          </Button>
          <Link to="..">
            <Button
              type="button"
              variant="outline-secondary"
            >
              Cancel
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Form>
  );
}
