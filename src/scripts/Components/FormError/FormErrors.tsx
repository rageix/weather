import { ValidationErrorItem } from 'joi';

interface Props {
  path?: string | number;
  id?: string;
  errors: ValidationErrorItem[];
}

export default function FormErrors(props: Props) {
  let errors: ValidationErrorItem[] = props.errors;

  if (props.path) {
    errors = props.errors.filter((v) => v.path.indexOf(props.path) > -1);
  }

  return (
    <>
      {errors.map((v, i) => (
        <p
          key={i}
          className="mt-2 text-sm text-red-600"
          id={props.id}
        >
          {v.message}
        </p>
      ))}
    </>
  );
}
