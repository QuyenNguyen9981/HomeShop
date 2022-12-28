import React from 'react';
import PropTypes from 'prop-types';
import InputField from '../../../../components/form-controls/InputField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

function TodoForm(props) {
  const { onSubmit } = props;

  const schema = yup
    .object({
      title: yup.string().required('Please enter title'),
    })
    .required();

  const form = useForm({
    defaultValues: {
      title: '',
    },

    resolver: yupResolver(schema),
  });

  function handleOnSubmit(values) {
    if (!onSubmit) return;

    onSubmit(values);
    form.reset();
  }

  return (
    <form onSubmit={form.handleSubmit(handleOnSubmit)}>
      <InputField name="title" label="Todo" form={form} />
    </form>
  );
}

TodoForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default TodoForm;
