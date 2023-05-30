import * as yup from 'yup';
import { notificationValidationSchema } from 'validationSchema/notifications';
import { orderValidationSchema } from 'validationSchema/orders';
import { reservationValidationSchema } from 'validationSchema/reservations';
import { restaurantValidationSchema } from 'validationSchema/restaurants';
import { staffValidationSchema } from 'validationSchema/staff';

export const userValidationSchema = yup.object().shape({
  roq_user_id: yup.string(),
  tenant_id: yup.string(),
  notification: yup.array().of(notificationValidationSchema),
  order: yup.array().of(orderValidationSchema),
  reservation: yup.array().of(reservationValidationSchema),
  restaurant: yup.array().of(restaurantValidationSchema),
  staff: yup.array().of(staffValidationSchema),
});
