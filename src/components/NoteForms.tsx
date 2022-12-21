/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { FormEvent, useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Stack from "react-bootstrap/esm/Stack";
import { Link } from "react-router-dom";
import CreatetableReactSelect from "react-select/creatable";
import { Tag, NoteFormProps } from "../types/types";

export default function NoteForms({ onSubmit }: NoteFormProps): JSX.Element {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  function submitHandler(event: FormEvent): void {
    event.preventDefault();

    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: [],
    });
  }

  return (
    <Form onSubmit={submitHandler}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                required
                ref={titleRef}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <CreatetableReactSelect
                value={selectedTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                onChange={(tags) =>
                  setSelectedTags(
                    tags.map((tag) => {
                      return {
                        label: tag.label,
                        id: tag.value,
                      };
                    }),
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
