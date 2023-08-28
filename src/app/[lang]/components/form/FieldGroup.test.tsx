import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import FieldGroup from "./FieldGroup";

describe('Form Components - FieldGroup', () => {
  it('has children', () => {
    render(<FieldGroup>foo</FieldGroup>);
    expect(screen.getByText(/foo/)).toBeInTheDocument();
  });

  it('has heading', () => {
    render(<FieldGroup heading='Foo Group'></FieldGroup>);
    expect(screen.getByRole('heading')).toHaveTextContent(/Foo Group/);
  });

  it('has heading with level specified in `headingLevel` property', () => {
    render(<FieldGroup heading='Foo Group' headingLevel={5}></FieldGroup>);
    expect(screen.getByRole('heading', { level: 5 })).toHaveTextContent(/Foo Group/);
  });

  it('has heading with class specified in `headingClass` property', () => {
    render(<FieldGroup heading='Foo Group' headingClass='foo-class'></FieldGroup>);
    expect(screen.getByRole('heading')).toHaveClass('foo-class');
  });

  it('has heading with `id` specified in `headingId` property', () => {
    render(<FieldGroup heading='Foo Group' headingId='foo-id'></FieldGroup>);
    expect(screen.getByRole('heading')).toHaveAttribute('id', 'foo-id');
  });

  it('has container with class(es) specified in `containerClass` property', () => {
    render(<FieldGroup containerClass='foo'></FieldGroup>);
    expect(screen.getByRole('group')).toHaveClass('foo');
  });

});