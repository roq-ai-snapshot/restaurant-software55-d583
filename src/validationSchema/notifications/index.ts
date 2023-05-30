import * as yup from 'yup';

export const notificationValidationSchema = yup.object().shape({
  event_type: yup.string().required(),
  message: yup.string().required(),
  created_at: yup.date().required(),
  user_id: yup.string().nullable().required(),
  restaurant_id: yup.string().nullable().required(),
});
