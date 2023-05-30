import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useRouter } from 'next/router';
import { createNotification } from 'apiSdk/notifications';
import { Error } from 'components/error';
import { notificationValidationSchema } from 'validationSchema/notifications';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { UserInterface } from 'interfaces/user';
import { RestaurantInterface } from 'interfaces/restaurant';
import { getUsers } from 'apiSdk/users';
import { getRestaurants } from 'apiSdk/restaurants';
import { NotificationInterface } from 'interfaces/notification';

function NotificationCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: NotificationInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createNotification(values);
      resetForm();
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<NotificationInterface>({
    initialValues: {
      event_type: '',
      message: '',
      created_at: new Date(new Date().toDateString()),
      user_id: (router.query.user_id as string) ?? null,
      restaurant_id: (router.query.restaurant_id as string) ?? null,
    },
    validationSchema: notificationValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Create Notification
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="event_type" mb="4" isInvalid={!!formik.errors?.event_type}>
            <FormLabel>Event Type</FormLabel>
            <Input type="text" name="event_type" value={formik.values?.event_type} onChange={formik.handleChange} />
            {formik.errors.event_type && <FormErrorMessage>{formik.errors?.event_type}</FormErrorMessage>}
          </FormControl>
          <FormControl id="message" mb="4" isInvalid={!!formik.errors?.message}>
            <FormLabel>Message</FormLabel>
            <Input type="text" name="message" value={formik.values?.message} onChange={formik.handleChange} />
            {formik.errors.message && <FormErrorMessage>{formik.errors?.message}</FormErrorMessage>}
          </FormControl>
          <FormControl id="created_at" mb="4">
            <FormLabel>Created At</FormLabel>
            <DatePicker
              dateFormat={'dd/MM/yyyy'}
              selected={formik.values?.created_at}
              onChange={(value: Date) => formik.setFieldValue('created_at', value)}
            />
          </FormControl>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record.id}
              </option>
            )}
          />
          <AsyncSelect<RestaurantInterface>
            formik={formik}
            name={'restaurant_id'}
            label={'Restaurant'}
            placeholder={'Select Restaurant'}
            fetcher={getRestaurants}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record.name}
              </option>
            )}
          />
          <Button isDisabled={!formik.isValid || formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'notification',
  operation: AccessOperationEnum.CREATE,
})(NotificationCreatePage);
